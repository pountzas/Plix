import { useRecoilState } from 'recoil';
import { mediaItemState } from '../atoms/modalAtom';
import MediaItemProps from './props/MediaItemProps';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaBackward } from 'react-icons/fa';

function MediaItem() {
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const handleClose = () => {
    setMediaItem(false);
  };

  return (
    <div>
      <button className='pt-3' onClick={handleClose}>
        <FaBackward className='text-gray-500 text-2xl' />
      </button>
      <div></div>
    </div>
  );
}

export default MediaItem;
