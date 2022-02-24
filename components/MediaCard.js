import Image from 'next/image';
import { GrCirclePlay } from 'react-icons/gr';
import { GoPlay } from 'react-icons/go';

function MediaCard() {
  return (
    <div className='pb-12'>
      <div className='pb-2'>
        <GrCirclePlay className='relative top-28 left-12 z-10 text-4xl text-gray-600' />
        <Image
          className='absolute opacity-90 rounded-md'
          src='https://www.themoviedb.org/t/p/w220_and_h330_face/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg'
          alt=''
          width='130px'
          height='195px'
        />
      </div>
      <h2>Movie Title</h2>
    </div>
  );
}

export default MediaCard;
