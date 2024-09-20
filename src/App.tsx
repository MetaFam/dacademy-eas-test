import { useState } from 'react'
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"
import { BrowserProvider } from 'ethers'
import type { WalletClient } from 'viem'
import { useWalletClient, useAccount } from 'wagmi'
import './App.css'


export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient

  if(!chain) throw new Error('Chain is not defined!')
  if(!account) throw new Error('Account is not defined!')

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };
  const provider = new BrowserProvider(transport, network);
  const signer = provider.getSigner(account.address);

  return signer;
}

const easContractAddress = '0x4200000000000000000000000000000000000021'
const schemaUID = {
  chain: '0x0f9f60db15ce60233df8bf985bc5796e79e354b06db5224104afc27c824417c8',
  quest: '0x46f59b4641989de0dfe7c6bfdf4426e7b3d630e261d9e27fa8b77fafce6e75ec',
}


function App() {
  const { isConnected } = useAccount()
  const { data: client } = useWalletClient()
  const [statuses, addStatuses] = useState<Array<string>>([])

  const addStatus = (status: string) => {
    addStatuses((statuses) => ([...statuses, status]))
  }

  const attest = async () => {
    try {
      if(!client) throw new Error('Client doesn’t exist!')

      addStatus('Beginning Attestation Process')

      const signer = await walletClientToSigner(client)

      addStatus(`Connecting to EAS Contract: ${easContractAddress}`)

      const eas = new EAS(easContractAddress)
      eas.connect(signer)

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
      console.error({ err })
      addStatus(`Error: ${(err as Error).message}`)
    }
  }

  return (
    <section>
      <header>
        <w3m-button/>
      </header>
      <main>
        <h1>Create A EAS Playbook Completion</h1>
        {isConnected && (
          <button onClick={attest}>Start Attestations</button>
        )}
        <ol>
          {statuses.map((status, index) => (
            <li key={index}>{status}</li>
          ))}
        </ol>
      </main>
    </section>
  )
}

export default App
