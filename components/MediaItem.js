import { useRecoilState } from 'recoil';
import { mediaItemState } from '../atoms/modalAtom';
import MediaItemProps from './props/MediaItemProps';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaBackward } from 'react-icons/fa';
import ReactPlayer from 'react-player';

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
        <ReactPlayer
          // className='rounded'
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                volume: 1,
                controls: true,
                color: '#fff',
              },
            },
          }}
          url={MediaItemProps.objurl}
          controls
          pip={true}
          width='640px'
          height='400px'
        />
        <div className='max-w-[40vw] space-y-4'>
          <div className='text-gray-200'>{MediaItemProps.tmdbTitle}</div>
          <div className='flex items-center space-x-4'>
            <div className='text-gray-200'>
              {MediaItemProps.tmdbReleaseDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaItem;
