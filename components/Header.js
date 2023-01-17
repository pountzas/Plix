import Image from 'next/image';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { useRecoilState } from 'recoil';
import { menuSizeState, imageState, mediaItemState } from '../atoms/modalAtom';

import MovieFiles from './props/MovieFiles';
import SearchResults from './props/SearchResults';

import { VscMenu } from 'react-icons/vsc';
import { FiActivity, FiTool, FiCast, FiSearch } from 'react-icons/fi';
import { BsPersonCircle } from 'react-icons/bs';
import MediaItemProps from './props/MediaItemProps';

function Header() {
  const { data: session } = useSession();

  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const [image, setImage] = useRecoilState(imageState);

  const [searchValue, setSearchValue] = useState('');

  const handleMenuSize = () => {
    setMenuSize(!menuSize);
  };

  const openMedia = (mediaId) => {
    const media = SearchResults.filter((movie) => {
      return movie.id === mediaId;
    });
    setMediaItem(true);
    MediaItemProps = media[0];
    // console.log('a', media);
    setSearchValue('');
    SearchResults = [];
    setImage(true);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value.length > 0 ? event.target.value : null);
    const results = MovieFiles.filter((movie) => {
      return movie.name.toLowerCase().includes(searchValue?.toLowerCase());
    });
    SearchResults = results.slice(0, 10);
  };



  return (
    <header className='px-3 pt-3 w-full'>
      <div
        className={`bg-[#232B35] rounded-md h-16 p-3 text-white font-semibold flex items-center justify-between
            ${!session && 'w-[97vw]'} ${image && 'opacity-75'}`}
      >
        <div className='flex items-center justify-start'>
          <VscMenu
            onClick={handleMenuSize}
            className='inline-block mr-8 text-2xl text-gray-400'
          />
          <Image
            src='https://res.cloudinary.com/dcwuuolk8/image/upload/v1650308268/Plix/plix-logo-w_yrxkmt.png'
            alt='logo'
            height={20}
            width={60}
          />
          <div className='relative flex items-center'>
            <div className='bg-[#333A44] px-2 ml-8 py-2 rounded-l-2xl'>
              <FiSearch className='ml-2 text-2xl text-gray-500' />
            </div>
            <input
              onChange={handleSearch}
              className='bg-[#333A44] rounded-r-2xl py-2 border-none mr-8 text-white font-semibold outline-none flex-grow'
              type='text'
              name='search'
              id=''
            />
            <ul className='absolute z-30 w-full mt-2 border border-gray-800 rounded top-8 left-20'>
              {SearchResults.map((result) => (
                <li onClick={() => openMedia(result.id)} key={result.id} className='cursor-pointer flex items-center space-x-4 hover:bg-[#232B35] bg-[#333A44] rounded py-1 px-4 font-semibold text-gray-200'>
                  <Image
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face${result.tmdbPoster}`}
                    alt={result.tmdbTitle} height={50} width={32} />

                  <div>
                    {result.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex items-center justify-start space-x-4'>
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
            <FiActivity className='hidden mr-4 text-3xl text-gray-400 md:inline-block' />
          </div>
          <div>
            <FiTool className='hidden mr-4 text-3xl text-gray-400 md:inline-block' />
          </div>
          <div>
            <FiCast className='hidden mr-4 text-3xl text-gray-400 md:inline-block' />
          </div>
          {session ? (
            <Image
              onClick={signOut}
              className='mr-4 rounded-full'
              src={session.user.image}
              alt='logo'
              height={30}
              width={30}
            />
          ) : (
            <BsPersonCircle className='mr-4 text-3xl text-gray-200' />
          )}
        </div>
      </div>
    </header>
  );
}



export default Header;
