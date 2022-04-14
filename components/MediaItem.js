import Image from 'next/image';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import { mediaItemState, menuSizeState, castState } from '../atoms/modalAtom';

import MediaItemProps from './props/MediaItemProps';
import MediaCredits from './props/MediaCredits';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaBackward } from 'react-icons/fa';

function MediaItem() {
  const Directors = [];
  const Writers = [];

  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);
  const [cast, setCast] = useRecoilState(castState);

  const getMediaDetails = async () => {
    const mediaDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${MediaItemProps.tmdbId}/credits?api_key=120f1a60fbfcc0d0f3e9775e7816cde3`
    );
    const mediaData = await mediaDetails.json();
    mediaData.cast.map((cast) => {
      MediaCredits.push({
        key: cast.order,
        name: cast.name,
        character: cast.character,
        profile_path: cast.profile_path,
        dep: cast.known_for_department,
      });
    });
    mediaData.crew.map((crew) => {
      if (crew.job === 'Director') {
        Directors.push({
          key: crew.id,
          name: crew.name,
          profile_path: crew.profile_path,
        });
      }
      if (crew.job === 'Writer') {
        Writers.push({
          key: crew.id,
          name: crew.name,
          profile_path: crew.profile_path,
        });
      }
      // if (crew.job === 'Production') {
      //   actors.push({
      //     key: crew.id,
      //     name: crew.name,
      //     profile_path: crew.profile_path,
      //   });
      // }
    });
  };
  console.log(Directors);
  console.log(Writers);
  getMediaDetails();

  console.log(MediaCredits);
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
