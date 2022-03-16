import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';

function MediaModal() {
  const [open, setOpen] = useRecoilState(modalState);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className='flex flex-col justify-between fixed z-10 inset-52 overflow-y-auto bg-gray-900 text-white border-gray-900 border-4 max-w-[80vw] rounded-xl'>
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
          <div className='flex gap-5 p-2'>
            {/* modal menu */}
            <div className='space-y-6 min-w-[15vw] min-h-[40vh] p-4'>
              <p>Select type</p>
              <p>Add folders</p>
              <p>Advanced</p>
            </div>
            {/* modal menu options */}
            <div className=''>
              <p>test</p>
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
