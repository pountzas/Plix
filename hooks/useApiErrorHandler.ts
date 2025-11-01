import { useEffect } from 'react'
import { useUiStore } from '../stores/uiStore'
import { ApiKeyError } from '../utils/tmdbApi'

/**
 * Hook to handle API errors and show appropriate modals
 */
export function useApiErrorHandler() {
  const setApiKeyErrorModal = useUiStore((state) => state.setApiKeyErrorModal)
  const setRateLimitErrorModal = useUiStore((state) => state.setRateLimitErrorModal)

  const handleApiError = (error: any) => {
    if (error instanceof ApiKeyError) {
      // Show API key error modal
      setApiKeyErrorModal(true)
      return true // Error was handled
    }

    // Check for rate limit errors
    if (error?.message?.includes('rate limit') || error?.message?.includes('429')) {
      setRateLimitErrorModal(true)
      return true // Error was handled
    }

    // For other errors, just log them
    console.error('API Error:', error)
    return false // Error was not handled by this handler
  }

  // Global error handler for uncaught API errors
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      if (event.error instanceof ApiKeyError) {
        setApiKeyErrorModal(true)
        event.preventDefault() // Prevent default error handling
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason instanceof ApiKeyError) {
        setApiKeyErrorModal(true)
        event.preventDefault() // Prevent default error handling
      } else if (event.reason?.message?.includes('rate limit') || event.reason?.message?.includes('429')) {
        setRateLimitErrorModal(true)
        event.preventDefault() // Prevent default error handling
      }
    }

    window.addEventListener('error', handleGlobalError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleGlobalError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [setApiKeyErrorModal, setRateLimitErrorModal])

  return { handleApiError }
}
