import { MdViewComfy } from 'react-icons/md';

function Feed() {
  return (
    <section className='border p-3 mb-3 rounded-md text-gray-300'>
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
      <h3>Latest TV Shows</h3>
    </section>
  );
}

export default Feed;
