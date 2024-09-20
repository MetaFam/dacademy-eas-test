import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { optimismSepolia } from 'wagmi/chains'

export const projectId = import.meta.env.VITE_REOWN_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Quest Chains EAS Test',
  description: 'Testing creating attestations for Quest Chains.',
  url: 'https://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [optimismSepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: true,
    socials: ["google", "x", "github", "discord", "apple"],
    showWallets: true,
    walletFeatures: true
  },
  ssr: false,
  storage: createStorage({
    storage: cookieStorage
  }),
})