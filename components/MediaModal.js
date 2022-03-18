import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { VscListSelection } from 'react-icons/vsc';
import { FaFolderOpen } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';
import { BsFilm } from 'react-icons/bs';
import { MdMonitor } from 'react-icons/md';
import { HiOutlineMusicNote } from 'react-icons/hi';

function MediaModal() {
  const [open, setOpen] = useRecoilState(modalState);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className='flex flex-col justify-between fixed z-10 inset-52 overflow-y-auto bg-[#2D3742] text-white border-gray-900 border-2 max-w-[80vw] rounded-lg'>
          {/* modal header  */}
          <div className='flex items-center bg-gray-800 justify-between pt-4 px-4 text-gray-400 pb-3'>
            <div className='flex space-x-2 items-center'>
              <AiOutlinePlus />
              <h2>Add Library</h2>
            </div>
            <button className='' onClick={handleClose}>
              <AiOutlineCloseCircle className='text-2xl' />
            </button>
          </div>
          <div className='flex gap-5 pr-2'>
            {/* modal menu */}
            <div className='space-y-6 min-w-[15vw] min-h-[46vh] p-4'>
              <button className=' flex items-center space-x-3 text-gray-400 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                <VscListSelection className='text-2xl' />
                <p>Select type</p>
              </button>
              <button className=' flex items-center space-x-3 text-gray-400 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                <FaFolderOpen className='text-2xl' />
                <p>Add folders</p>
              </button>
              <button className=' flex items-center space-x-3 text-gray-400 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                <BsGearFill className='text-2xl' />
                <p>Advanced</p>
              </button>
            </div>
            {/* modal menu options */}
            <div>
              {/* select library type section */}
              <div>
                <p className='text-gray-400 pt-4 font-semibold'>
                  Select library type
                </p>
                <div className='flex py-4 space-y-8 space-x-16 text-gray-400'>
                  <button className='flex flex-col items-center justify-end space-y-2 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                    <BsFilm className='text-5xl' />
                    <p>Movies</p>
                  </button>
                  <button className='flex flex-col items-center justify-center space-y-2 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                    <MdMonitor className='text-5xl' />
                    <p>TV Shows</p>
                  </button>
                  <button className='flex flex-col items-center justify-center space-y-2 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                    <HiOutlineMusicNote className='text-5xl' />
                    <p>Music</p>
                  </button>
                </div>
              </div>
              {/* add folders section */}
              <div></div>
              {/* advanced section */}
              <div></div>
            </div>
          </div>
          <div className='flex items-center justify-end space-x-2 bg-gray-800 py-2 pr-2'>
            {/* modal buttons */}
            <button
              className='bg-gray-700 p-2 rounded-md'
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className='bg-gray-900 p-2 rounded-md'>Next</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MediaModal;
