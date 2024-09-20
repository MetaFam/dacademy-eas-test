import React, { ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { config, projectId } from './config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'
import './index.css'

const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: 'dark'
})

const Web3ModalProvider = (
  { children, initialState }: { children: ReactNode; initialState?: State }
) => (
  <WagmiProvider {...{ config, initialState }}>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </WagmiProvider>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Web3ModalProvider initialState={undefined}>
      <App />
    </Web3ModalProvider>
  </StrictMode>,
)
