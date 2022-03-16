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
        <div className='fixed z-10 inset-52 overflow-y-auto bg-black text-white border-gray-900 border-4 max-h-[80vh] max-w-[80vw] rounded-xl'>
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
          </div>
          <div>{/* modal buttons */}</div>
        </div>
      )}
    </>
  );
}

export default MediaModal;
