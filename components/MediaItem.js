import Image from 'next/image';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import { mediaItemState, menuSizeState, castState } from '../atoms/modalAtom';

import MediaItemProps from './props/MediaItemProps';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaBackward } from 'react-icons/fa';

function MediaItem() {
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);
  const [cast, setCast] = useRecoilState(castState);

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
            <div className='text-gray-200'>TODO movie length</div>
          </div>
          <div className='text-gray-200'>{MediaItemProps.tmdbOverview}</div>
          {/* movie info */}
          <div className='flex space-x-4'>
            <div className='text-gray-400 font-semibold'>
              <p>DIRECTED BY</p>
              <p>WRITTEN BY</p>
              <p>STUDIO</p>
              <p>GENRE</p>
            </div>
            <div className='text-gray-200'>
              <div>
                {Directors.map((director) => {
                  return (
                    <div key={director.key}>
                      <p>{director.name}TODO</p>
                    </div>
                  );
                })}
              </div>
              <div>
                {Writers.map((writer) => {
                  return (
                    <div key={writer.key}>
                      <p>{writer.name}TODO</p>
                    </div>
                  );
                })}
              </div>
              <p>{MediaItemProps.tmdbProduction} TODO</p>
              <p>{MediaItemProps.tmdbGenre} TODO</p>
            </div>
          </div>
        <div className='pt-8'>
          <div className='text-gray-200'>Cast</div>
          <div className='flex overflow-hidden overflow-x-scroll scrollbar-hide object-contain space-x-10 pt-4 max-w-[80vw]'>
          </div>
        </div>
    </div>
  );
}

export default MediaItem;
