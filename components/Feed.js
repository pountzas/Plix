import { MdViewComfy } from 'react-icons/md';
import MediaCard from './MediaCard';

function Feed() {
  return (
    <section className='border p-3 mb-3 rounded-md text-2xl text-gray-300'>
      <div>
        <div className='flex justify-between items-center'>
          <h2>Home</h2>
          <div className='flex items-center space-x-2 object-contain'>
            <p>bar</p>
            <MdViewComfy className='text-3xl' />
          </div>
        </div>
      </div>
      <h3>Latest Movies</h3>
      <MediaCard />
      <h3>Latest TV Shows</h3>
      <MediaCard />
    </section>
  );
}

export default Feed;
