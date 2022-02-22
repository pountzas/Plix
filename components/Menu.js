import { CgHome } from 'react-icons/cg';

function Menu() {
  return (
    <section className='bg-[#232B35] my-3 mx-2 rounded-md p-3 max-w-xs'>
      <div className='flex items-center space-x-4 text-gray-300 text-xl'>
        <CgHome className='text-2xl' />
        <p>Home</p>
      </div>
    </section>
  );
}

export default Menu;
