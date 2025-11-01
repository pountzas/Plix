import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useUiStore } from '../stores/uiStore'
import ApiKeyErrorModal from '../components/ApiKeyErrorModal'
import RateLimitErrorModal from '../components/RateLimitErrorModal'
import { useApiErrorHandler } from '../hooks/useApiErrorHandler'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps & { pageProps: { session?: any } }) {
  const apiKeyErrorModal = useUiStore((state) => state.apiKeyErrorModal)
  const setApiKeyErrorModal = useUiStore((state) => state.setApiKeyErrorModal)
  const rateLimitErrorModal = useUiStore((state) => state.rateLimitErrorModal)
  const setRateLimitErrorModal = useUiStore((state) => state.setRateLimitErrorModal)

  // Initialize global error handler
  useApiErrorHandler()

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ApiKeyErrorModal
        isOpen={apiKeyErrorModal}
        onClose={() => setApiKeyErrorModal(false)}
      />
      <RateLimitErrorModal
        isOpen={rateLimitErrorModal}
        onClose={() => setRateLimitErrorModal(false)}
      />
    </SessionProvider>
  )
}

export default MyApp
