import Image from 'next/image';
import { VscMenu } from 'react-icons/vsc';

function Header() {
  return (
    <header>
      <h1 className='bg-[#232B35] my-3 mx-2 rounded-md p-3 text-white font-semibold font'>
        <div className='flex justify-start items-center'>
          <VscMenu className='inline-block mr-8 text-2xl' />
          <Image
            src='/../public/plix-logo-w.png'
            alt='logo'
            height={25}
            width={60}
          />
        </div>
      </h1>
    </header>
  );
}

export default Header;
