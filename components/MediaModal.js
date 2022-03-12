import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function MediaModal() {
  const [open, setOpen] = useRecoilState(modalState);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className='fixed z-10 inset-16 overflow-y-auto bg-black text-white max-h-[80vh] max-w-[80vw] rounded-xl '>
          <div className='flex items-center justify-between pt-4 px-4 text-gray-300'>
            <h2>Add Media</h2>
            <button className='' onClick={handleClose}>
              <AiOutlineCloseCircle className='text-2xl' />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MediaModal;
