import { Activity } from 'react'
import { useMediaPersistence } from '../hooks/useMediaPersistence'
import { AiOutlineWarning, AiOutlineSync, AiOutlineCheckCircle } from 'react-icons/ai'
import { useEffect, useState } from 'react'

/**
 * Component that displays the current persistence status and errors
 * Shows loading states, errors, and last sync time
 */
export function PersistenceStatus() {
  const {
    isLoading,
    isSaving,
    persistenceError,
    lastSynced,
    isAuthenticated,
    clearPersistenceError
  } = useMediaPersistence()

  const [dismissedSuccessAt, setDismissedSuccessAt] = useState<number | null>(null)
  const [dismissedError, setDismissedError] = useState<string | null>(null)

  const successActive = Boolean(
    lastSynced && !isLoading && !isSaving && !persistenceError
  )
  const successAt = lastSynced?.getTime() ?? null
  if (!successActive && dismissedSuccessAt != null) {
    setDismissedSuccessAt(null)
  }
  if (persistenceError == null && dismissedError != null) {
    setDismissedError(null)
  }

  const showSuccess = successActive && successAt !== dismissedSuccessAt
  const showError = Boolean(persistenceError) && persistenceError !== dismissedError

  useEffect(() => {
    if (!successActive || successAt == null) return
    const timer = setTimeout(() => setDismissedSuccessAt(successAt), 3000)
    return () => clearTimeout(timer)
  }, [successActive, successAt])

  useEffect(() => {
    if (!persistenceError) return
    const timer = setTimeout(() => {
      setDismissedError(persistenceError)
      clearPersistenceError()
    }, 10000)
    return () => clearTimeout(timer)
  }, [persistenceError, clearPersistenceError])

  // Don't show anything if user is not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {/* Loading/Saving Status */}
      <Activity mode={(isLoading || isSaving) ? "visible" : "hidden"}>
        <div className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
          <AiOutlineSync className="animate-spin h-5 w-5" />
          <div>
            <div className="font-medium">
              {isSaving ? 'Saving to collection...' : 'Loading collection...'}
            </div>
            <div className="text-sm opacity-90">
              {isSaving ? 'Your media is being saved' : 'Syncing your media collection'}
            </div>
          </div>
        </div>
      </Activity>

      {/* Error Status */}
      <Activity mode={showError ? "visible" : "hidden"}>
        <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg mt-2">
          <div className="flex items-start space-x-3">
            <AiOutlineWarning className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium">Sync Error</div>
              <div className="text-sm opacity-90 mt-1">
                {persistenceError}
              </div>
              <button
                onClick={() => {
                  if (persistenceError) setDismissedError(persistenceError)
                  clearPersistenceError()
                }}
                className="text-xs underline hover:no-underline mt-2 opacity-75 hover:opacity-100"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </Activity>

      {/* Last Synced Status */}
      <Activity mode={showSuccess ? "visible" : "hidden"}>
        <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
          <AiOutlineCheckCircle className="h-5 w-5" />
          <div>
            <div className="font-medium">Collection Synced</div>
            <div className="text-sm opacity-90">
              Last updated {lastSynced?.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </Activity>
    </div>
  )
}
