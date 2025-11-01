import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdTimer } from 'react-icons/md'

interface RateLimitErrorModalProps {
  isOpen: boolean
  onClose: () => void
}

function RateLimitErrorModal({ isOpen, onClose }: RateLimitErrorModalProps) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto text-center justify-items-center backdrop-blur-md'>
      <div className='flex flex-col justify-self-center justify-between bg-[#2D3742] text-white border-yellow-500 border-2 min-w-[500px] max-w-[600px] rounded-lg shadow-2xl'>
        {/* modal header */}
        <div className='flex items-center justify-between px-4 pt-4 pb-3 text-yellow-400 bg-yellow-900/20'>
          <div className='flex items-center space-x-2'>
            <MdTimer className='text-2xl' />
            <h2 className='text-xl font-bold'>Rate Limit Exceeded</h2>
          </div>
          <button className='' onClick={onClose}>
            <AiOutlineCloseCircle className='text-2xl hover:text-yellow-300' />
          </button>
        </div>

        {/* modal content */}
        <div className='px-6 py-6 space-y-4'>
          <div className='text-center'>
            <MdTimer className='mx-auto text-6xl text-yellow-500 mb-4' />
            <h3 className='text-lg font-semibold text-yellow-300 mb-2'>
              TMDB API Rate Limit Reached
            </h3>
            <p className='text-gray-300 leading-relaxed'>
              The TMDB API has temporarily limited requests due to high usage.
              This is a temporary restriction that will be lifted automatically.
            </p>
          </div>

          <div className='bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4'>
            <h4 className='font-semibold text-yellow-300 mb-2'>What to do:</h4>
            <ul className='text-gray-200 space-y-1 text-left'>
              <li>• <strong>Wait 1-2 minutes</strong> before trying again</li>
              <li>• <strong>Load fewer files at once</strong> (try 5-10 files instead of many)</li>
              <li>• <strong>Try again later</strong> if the problem persists</li>
            </ul>
          </div>

          <div className='text-sm text-gray-400'>
            <p>
              TMDB limits API requests to prevent abuse. Our app includes automatic rate limiting,
              but selecting many files at once can still trigger this limit.
            </p>
          </div>
        </div>

        {/* modal footer */}
        <div className='flex items-center justify-end py-3 px-4 bg-gray-800/50'>
          <button
            className='px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md font-medium transition-colors'
            onClick={onClose}
          >
            Try Again
          </button>
        </div>
      </div>
      <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
        &#8203;
      </span>
    </div>
  )
}

export default RateLimitErrorModal
