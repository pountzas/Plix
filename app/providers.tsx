'use client'

import { SessionProvider } from 'next-auth/react'
import { useUiStore } from '../stores/uiStore'
import ApiKeyErrorModal from '../components/ApiKeyErrorModal'
import RateLimitErrorModal from '../components/RateLimitErrorModal'
import { PersistenceStatus } from '../components/PersistenceStatus'
import { useApiErrorHandler } from '../hooks/useApiErrorHandler'
import { useMediaDataLoader } from '../hooks/useMediaDataLoader'

// Client component wrapper for Zustand hooks and global components
function ClientProviders({ children }: { children: React.ReactNode }) {
  const apiKeyErrorModal = useUiStore((state) => state.apiKeyErrorModal)
  const setApiKeyErrorModal = useUiStore((state) => state.setApiKeyErrorModal)
  const rateLimitErrorModal = useUiStore((state) => state.rateLimitErrorModal)
  const setRateLimitErrorModal = useUiStore((state) => state.setRateLimitErrorModal)

  // Initialize global error handler
  useApiErrorHandler()

  // Initialize global media data loader (runs once)
  useMediaDataLoader()

  return (
    <>
      {children}
      <ApiKeyErrorModal
        isOpen={apiKeyErrorModal}
        onClose={() => setApiKeyErrorModal(false)}
      />
      <RateLimitErrorModal
        isOpen={rateLimitErrorModal}
        onClose={() => setRateLimitErrorModal(false)}
      />
      <PersistenceStatus />
    </>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClientProviders>
        {children}
      </ClientProviders>
    </SessionProvider>
  )
}
