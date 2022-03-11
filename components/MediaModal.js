import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

function MediaModal() {
  const [open, setOpen] = useRecoilState(modalState);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className='fixed z-10 inset-0 overflow-y-auto bg-black text-3xl text-white'>
          <div className='flex items-center justify-between min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center '>
            <h2>Add Media</h2>
            <button className='bg-gray-600' onClick={handleClose}>
              close
            </button>
          </div>
          MediaModal
        </div>
      )}
    </>
  );
}

export default MediaModal;
