import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdError } from 'react-icons/md'

interface ApiKeyErrorModalProps {
  isOpen: boolean
  onClose: () => void
}

function ApiKeyErrorModal({ isOpen, onClose }: ApiKeyErrorModalProps) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto text-center justify-items-center backdrop-blur-md'>
      <div className='flex flex-col justify-self-center justify-between bg-[#2D3742] text-white border-red-500 border-2 min-w-[500px] max-w-[600px] rounded-lg shadow-2xl'>
        {/* modal header */}
        <div className='flex items-center justify-between px-4 pt-4 pb-3 text-red-400 bg-red-900/20'>
          <div className='flex items-center space-x-2'>
            <MdError className='text-2xl' />
            <h2 className='text-xl font-bold'>API Key Error</h2>
          </div>
          <button className='' onClick={onClose}>
            <AiOutlineCloseCircle className='text-2xl hover:text-red-300' />
          </button>
        </div>

        {/* modal content */}
        <div className='px-6 py-6 space-y-4'>
          <div className='text-center'>
            <MdError className='mx-auto text-6xl text-red-500 mb-4' />
            <h3 className='text-lg font-semibold text-red-300 mb-2'>
              TMDB API Access Issue
            </h3>
            <p className='text-gray-300 leading-relaxed'>
              The TMDB API key is invalid or expired. This prevents the app from loading movie and TV show information.
            </p>
          </div>

          <div className='bg-red-900/20 border border-red-500/50 rounded-lg p-4'>
            <h4 className='font-semibold text-red-300 mb-2'>What to do:</h4>
            <p className='text-gray-200'>
              Please contact the administrator at{' '}
              <a
                href='mailto:nikos@pountzas.gr'
                className='text-blue-400 hover:text-blue-300 underline font-medium'
              >
                nikos@pountzas.gr
              </a>{' '}
              to resolve the API key issue.
            </p>
          </div>

          <div className='text-sm text-gray-400'>
            <p>This error occurs when the TMDB API key is not valid or has expired.</p>
          </div>
        </div>

        {/* modal footer */}
        <div className='flex items-center justify-end py-3 px-4 bg-gray-800/50'>
          <button
            className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
        &#8203;
      </span>
    </div>
  )
}

export default ApiKeyErrorModal
