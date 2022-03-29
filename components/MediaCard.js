import Image from 'next/image';

import { BsPlayCircleFill, BsPlayCircle } from 'react-icons/bs';

function MediaCard({
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
    <div key={tmdbId} className='pb-12 min-w-max'>
      <div className='pb-2 group-hover:opacity-100'>
        <div className=' text-5xl text-gray-400 hover:group-even:hidden hover:group-last:inline-block'>
          <BsPlayCircle className='relative top-32 left-10 z-10' />
          <BsPlayCircleFill className='relative hidden hover:inline-block top-32 left-10 z-10' />
        </div>
        <Image
          className='absolute hover:opacity-50 rounded-md'
          src='https://www.themoviedb.org/t/p/w220_and_h330_face/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg'
          alt=''
          width='130px'
          height='195px'
        />
      </div>
      <h3 className='text-sm'>Movie Title</h3>
    </div>
  );
}

export default MediaCard;
