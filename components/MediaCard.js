import Image from 'next/image';

import { BsPlayCircleFill, BsPlayCircle } from 'react-icons/bs';

function MediaCard({
  id,
  name,
  tmdbId,
  tmdbPoster,
  tmdbTitle,
  tmdbOverview,
  tmdbReleaseDate,
  tmdbRating,
  tmdbGenre,
  fileName,
  ObjUrl,
  folderPath,
  folderPath2,
  rootPath,
}) {
  return (
    <div key={id} className='pb-12 min-w-max'>
      <div className='pb-2 group-hover:opacity-100'>
        <div className=' text-5xl text-gray-400 hover:group-even:hidden hover:group-last:inline-block'>
          <BsPlayCircle className='relative top-32 left-10 z-10' />
          <BsPlayCircleFill className='relative hidden hover:inline-block top-32 left-10 z-10' />
        </div>
        <Image
          className='absolute hover:opacity-50 rounded-md'
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${tmdbPoster}`}
          alt=''
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
