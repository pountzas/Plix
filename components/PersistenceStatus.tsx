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

  // State to control notification visibility with auto-dismiss
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  // Auto-dismiss logic for success notifications (3 seconds)
  useEffect(() => {
    if (lastSynced && !isLoading && !isSaving && !persistenceError) {
      setShowSuccess(true)
      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 3000) // 3 seconds

      return () => clearTimeout(timer)
    } else {
      setShowSuccess(false)
    }
  }, [lastSynced, isLoading, isSaving, persistenceError])

  // Auto-dismiss logic for error notifications (10 seconds)
  useEffect(() => {
    if (persistenceError) {
      setShowError(true)
      const timer = setTimeout(() => {
        setShowError(false)
        clearPersistenceError() // Also clear the error state
      }, 10000) // 10 seconds

      return () => clearTimeout(timer)
    } else {
      setShowError(false)
    }
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
                  setShowError(false)
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
