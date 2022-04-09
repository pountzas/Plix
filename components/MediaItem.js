import { useRecoilState } from 'recoil';
import MediaItemProps from './props/MediaItemProps';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function MediaItem() {
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const handleClose = () => {
    setMediaItem(false);
  };

  return (
    <div>
      <button className='' onClick={handleClose}>
        <AiOutlineCloseCircle className='text-2xl' />
      </button>
      <div></div>
    </div>
  );
}

export default MediaItem;
