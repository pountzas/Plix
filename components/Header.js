import Image from 'next/image';
import { VscMenu } from 'react-icons/vsc';
import { FiActivity, FiTool, FiCast, FiSearch } from 'react-icons/fi';
import { BsPersonCircle } from 'react-icons/bs';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { menuSizeState } from '../atoms/modalAtom';

function Header() {
  const { data: session } = useSession();
  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);

  const handleMenuSize = () => {
    setMenuSize(!menuSize);
  };

  return (
    <header>
      <div className='bg-[#232B35] my-3 mx-3 rounded-md p-3 text-white font-semibold flex items-center justify-between'>
        <div className='flex justify-start items-center'>
          <VscMenu
            onClick={handleMenuSize}
            className='inline-block mr-8 text-2xl text-gray-400'
          />
          {/* <Link href='/' passHref> */}
          <Image
            src='/../public/plix-logo-w.png'
            alt='logo'
            height={20}
            width={60}
          />
          {/* </Link> */}
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
          {session ? (
            <button className='cursor-pointer hidden lg:inline-block bg-[#CC7B19] rounded-md py-1 px-4 font-bold text-orange-200 text-xl'>
              GO PREMIUM
            </button>
          ) : (
            <button
              onClick={signIn}
              className='cursor-pointer hidden lg:inline-block bg-[#CC7B19] rounded-md py-1 px-4 font-bold text-orange-200 text-xl'
            >
              Sign in
            </button>
          )}
          <div>
            <FiActivity className='mr-4 text-3xl text-gray-400 hidden md:inline-block' />
          </div>
          <div>
            <FiTool className='mr-4 text-3xl text-gray-400 hidden md:inline-block' />
          </div>
          <div>
            <FiCast className='mr-4 text-3xl text-gray-400 hidden md:inline-block' />
          </div>
          {session ? (
            // <Link href='/' passHref>
            <Image
              onClick={signOut}
              className='rounded-full mr-4'
              src={session.user.image}
              alt='logo'
              height={30}
              width={30}
            />
          ) : (
            // </Link>
            <BsPersonCircle className='mr-4 text-3xl text-gray-200' />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
