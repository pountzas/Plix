import Image from 'next/image';
import { VscMenu } from 'react-icons/vsc';
import { FiActivity, FiTool, FiCast, FiSearch } from 'react-icons/fi';

function Header() {
  return (
    <header>
      <div className='bg-[#232B35] my-3 mx-2 rounded-md p-3 text-white font-semibold flex items-center justify-between'>
        <div className='flex justify-start items-center'>
          <VscMenu className='inline-block mr-8 text-2xl text-gray-400' />
          <Image
            src='/../public/plix-logo-w.png'
            alt='logo'
            height={20}
            width={60}
          />
          <div className='flex items-center'>
            <div className='bg-[#333A44] px-2 ml-8 py-2 rounded-l-2xl'>
              <FiSearch className='ml-2 text-2xl text-gray-500' />
            </div>
            <input
              className='bg-[#333A44] rounded-r-2xl py-2 border-none mr-8 text-white font-semibold outline-none flex-grow'
              type='text'
              name='search'
              id=''
            />
          </div>
        </div>
        <div className='flex justify-start items-center space-x-4'>
          <button className='hidden lg:inline-block bg-[#CC7B19] rounded-md py-1 px-4 font-bold text-orange-200 text-xl'>
            GO PREMIUM
          </button>
          <div>
            <FiActivity className='mr-4 text-3xl text-gray-400' />
          </div>
          <div>
            <FiTool className='mr-4 text-3xl text-gray-400' />
          </div>
          <div>
            <FiCast className='mr-4 text-3xl text-gray-400' />
          </div>
          <div>
            <p className='px-2 py-1 rounded-full text-xl bg-red-800'>N</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
