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
              <div className=' flex items-center space-x-3 text-gray-400 cursor-pointer focus:text-[#CC7B19]'>
                <VscListSelection className='text-2xl' />
                <p>Select type</p>
              </div>
              <div className=' flex items-center space-x-3 text-gray-400 cursor-pointer focus:text-[#CC7B19]'>
                <FaFolderOpen className='text-2xl' />
                <p>Add folders</p>
              </div>
              <div className=' flex items-center space-x-3 text-gray-400 cursor-pointer !focus:text-[#CC7B19]'>
                <BsGearFill className='text-2xl' />
                <p>Advanced</p>
              </div>
            </div>
            {/* modal menu options */}
            <div>
              <p className='text-gray-400 font-semibold'>Select library type</p>
              <div className='flex py-4 space-y-8 space-x-16 text-gray-400'>
                <div className='flex flex-col items-center justify-end space-y-2 '>
                  <BsFilm className='text-5xl' />
                  <p>Movies</p>
                </div>
                <div className='flex flex-col items-center justify-center space-y-2 '>
                  <MdMonitor className='text-5xl' />
                  <p>TV Shows</p>
                </div>
                <div className='flex flex-col items-center justify-center space-y-2 '>
                  <HiOutlineMusicNote className='text-5xl' />
                  <p>Music</p>
                </div>
              </div>
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
