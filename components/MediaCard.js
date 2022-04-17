import Image from 'next/image';
import MediaItemProps from './props/MediaItemProps';
import { useRecoilState } from 'recoil';
import { mediaItemState } from '../atoms/modalAtom';

import { BsPlayCircleFill, BsPlayCircle } from 'react-icons/bs';

function MediaCard({
  id,
  name,
  tmdbId,
  adult,
  backdrop_path,
  lang,
  popularity,
  voteAverage,
  voteCount,
  tmdbPoster,
  tmdbTitle,
  tmdbOverview,
  tmdbReleaseDate,
  tmdbRating,
  tmdbGenre,
  fileName,
  objurl,
  folderPath,
  folderPath2,
  rootPath,
}) {
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const handlePlayer = () => {};

  const sendMediaValue = () => {
    MediaItemProps = {
      id,
      name,
      tmdbId,
      adult,
      backdrop_path,
      lang,
      popularity,
      voteAverage,
      voteCount,
      tmdbPoster,
      tmdbTitle,
      tmdbOverview,
      tmdbReleaseDate,
      tmdbRating,
      tmdbGenre,
      fileName,
      objurl,
      folderPath,
      folderPath2,
      rootPath,
    };
  };

  const handleMediaCardClick = () => {
    setMediaItem(true);
    sendMediaValue();
  };

  return (
    <div onClick={handleMediaCardClick} className='pb-12 min-w-max'>
      <div className='pb-2 group-hover:opacity-100'>
        <div className=' text-5xl text-gray-400 hover:group-even:hidden hover:group-last:inline-block'>
          <div onClick={handlePlayer}>
            <BsPlayCircleFill className='relative top-32 left-10 z-10 p-1 hover:text-left hover:bg-[#CC7B19] rounded-full' />
          </div>

          {/* <BsPlayCircle className='relative hidden top-32 left-10 z-10 hover:bg-[#CC7B19] rounded-full' /> */}
        </div>
        <Image
          className='absolute hover:opacity-50 rounded-md'
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${tmdbPoster}`}
          alt=''
          loading='lazy'
          width='130px'
          height='195px'
        />
      </div>
      <h3 className='font-semibold text-sm w-[130px] overflow-hidden whitespace-nowrap text-ellipsis '>
        {tmdbTitle}
      </h3>
      <h3 className='text-sm text-gray-400 font-semibold'>{tmdbReleaseDate}</h3>
    </div>
  );
}

export default MediaCard;
