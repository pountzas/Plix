import { CgHome } from 'react-icons/cg';
import { BsFilm } from 'react-icons/bs';
import { MdMonitor } from 'react-icons/md';

function Menu() {
  return (
    <section className='bg-[#232B35] space-y-3 mb-3 mx-3 rounded-md p-3 max-w-xs min-h-[90vh]'>
      <div className='flex items-center space-x-4 text-gray-300 text-xl'>
        <CgHome className='text-2xl' />
        <p>Home</p>
      </div>
      <div className='flex items-center space-x-4 pl-[2px] text-gray-300 text-xl'>
        <BsFilm />
        <p>Movies</p>
      </div>
      <div className='flex items-center space-x-4 text-gray-300 text-xl'>
        <MdMonitor className='text-2xl' />
        <p>TV Shows</p>
      </div>
    </section>
  );
}

export default Menu;