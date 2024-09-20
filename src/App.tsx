import { useState } from 'react'
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import { Core } from '@walletconnect/core'
import { WalletKit, WalletKitTypes } from '@reown/walletkit'
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils'
import './App.css'

const easContractAddress = '0x4200000000000000000000000000000000000021'
const schemaUID = {
  chain: '0x0f9f60db15ce60233df8bf985bc5796e79e354b06db5224104afc27c824417c8',
  quest: '0x46f59b4641989de0dfe7c6bfdf4426e7b3d630e261d9e27fa8b77fafce6e75ec',
}

function App() {
  const [statuses, addStatuses] = useState<Array<string>>([])

  const addStatus = (status: string) => {
    addStatuses((statuses) => ([...statuses, status]))
  }

  const connect = async () => {
    const core = new Core({
      projectId: import.meta.env.VITE_REOWN_PROJECT_ID
    })

    const walletKit = await WalletKit.init({
      core,
      metadata: {
        name: 'Quest Chains EAS Test',
        description: 'Testing creating attestations for Quest Chains.',
        url: 'https://localhost:5173',
        icons: []
      }
    })

    const onSessionProposal = async (
      { id, params }: WalletKitTypes.SessionProposal
    ) => {
      try {
        const approvedNamespaces = buildApprovedNamespaces({
          proposal: params,
          supportedNamespaces: {
            eip155: {
              chains: ['eip155:11155420'],
              methods: ['eth_sendTransaction', 'personal_sign'],
              events: ['accountsChanged', 'chainChanged'],
              accounts: [
                'eip155:11155420:0xeb4e3e9fa819e69e5df4ea35b9c7973062c96de9',
              ],
            },
          },
        })
        // ------- end namespaces builder util ------------ //
    
        const session = await walletKit.approveSession({
          id, namespaces: approvedNamespaces,
        })
      } catch(error) {
        addStatus(`Error: ${(error as Error).message}`)

        await walletKit.rejectSession({
          id, reason: getSdkError('USER_REJECTED'),
        })
      }
    }

    walletKit.on('session_proposal', onSessionProposal)
  }


walletKit.on('session_proposal', onSessionProposal)
  }

  const attest = async () => {
    try {
      addStatus('Beginning Attestation Process')

      const provider = ethers.getDefaultProvider('optimism-sepolia')

      addStatus(`Connecting to EAS Contract: ${easContractAddress}`)

      const eas = new EAS(easContractAddress)
      eas.connect(provider)

      addStatus('Encoding Data')

      const schemaEncoder = {
        chain: new SchemaEncoder('uint256 chainId'),
        quest: new SchemaEncoder('uint256 questId'),
      }
      const values = {
        chain: Math.round(Number.MAX_SAFE_INTEGER * Math.random()),
        quest: Math.round(Number.MAX_SAFE_INTEGER * Math.random()),
      }
      const data = {
        chain: schemaEncoder.chain.encodeData([{
          name: 'chainId',
          value: values.chain,
          type: 'uint256',
        }]),
        quest: schemaEncoder.quest.encodeData([{
          name: 'questId',
          value: values.quest,
          type: 'uint256',
        }]),
      }

      addStatus(`Encoded: chainId:${values.chain}, questId:${values.quest}`)

      addStatus('Submitting Chain Attestation')

      const chainTx = await eas.attest({
        schema: schemaUID.chain,
        data: {
          recipient: '0xEb4E3e9fA819E69e5Df4ea35b9C7973062C96de9',
          expirationTime: 0n,
          revocable: true,
          data: data.chain,
        },
      });

      addStatus('Submitted Chain Attestation')

      const chainAttestationUID = await chainTx.wait()

      addStatus(`Chain Attestation UID: ${chainAttestationUID}`)

      addStatus('Submitting Quest Attestation')

      const questTx = await eas.attest({
        schema: schemaUID.quest,
        data: {
          recipient: '0xEb4E3e9fA819E69e5Df4ea35b9C7973062C96de9',
          expirationTime: 0n,
          revocable: true,
          data: data.chain,
          refUID: chainAttestationUID,
        },
      });

      addStatus('Submitted Quest Attestation')

      const questAttestationUID = await questTx.wait()

      addStatus(`Quest Attestation UID: ${questAttestationUID}`)
    } catch(err) {
      addStatus(`Error: ${(err as Error).message}`)
    }
  }

  return (
    <main>
      <h1>Create A EAS Playbook Completion</h1>
      <button onClick={attest}>Start Attestations</button>
      <ol>
        {statuses.map((status, index) => (
          <li key={index}>{status}</li>
        ))}
      </ol>
    </main>
  )
}

export default App
