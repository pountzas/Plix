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
          {/* modal header  */}
            <h2>Add Media</h2>
            <button className='' onClick={handleClose}>
              <AiOutlineCloseCircle className='text-2xl' />
            </button>
          </div>
          <div>
            {/* modal menu */}
            {/* modal menu options */}
          </div>
          <div>{/* modal buttons */}</div>
        </div>
      )}
    </>
  );
}

export default MediaModal;
