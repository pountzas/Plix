import Image from 'next/image';
import { VscMenu } from 'react-icons/vsc';

function Header() {
  return (
    <header>
      <div className='bg-[#232B35] my-3 mx-2 rounded-md p-3 text-white font-semibold flex items-center justify-between'>
        <div className='flex justify-start items-center'>
          <VscMenu className='inline-block mr-8 text-2xl' />
          <Image
            src='/../public/plix-logo-w.png'
            alt='logo'
            height={20}
            width={60}
          />
          <input
            className='bg-[#333A44] focus:bg-gray-300 rounded-2xl py-1 px-20 mx-8 text-white font-semibold text-center'
            placeholder='Search'
            type='text'
            name='search'
            id=''
          />
        </div>
        <div>
          <button className='bg-[#e5a00d] rounded-md py-1 px-4 font-bold text-orange-200 text-xl'>
            GO PREMIUM
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
