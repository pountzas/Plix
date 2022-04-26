import { CgHome } from 'react-icons/cg';
import { BsFilm } from 'react-icons/bs';
import { MdMonitor } from 'react-icons/md';
import { AiFillFolderAdd } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import {
  modalState,
  menuSizeState,
  homeMovieState,
  homeTvState,
  homeMenuState,
  movieMenuState,
  tvMenuState,
  imageState,
} from '../atoms/modalAtom';

function Menu() {
  const [open, setOpen] = useRecoilState(modalState);
  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);
  const [latestMovie, setLatestMovie] = useRecoilState(homeMovieState);
  const [latestTv, setLatestTv] = useRecoilState(homeTvState);
  const [homeMenu, setHomeMenu] = useRecoilState(homeMenuState);
  const [movieMenu, setMovieMenu] = useRecoilState(movieMenuState);
  const [tvMenu, setTvMenu] = useRecoilState(tvMenuState);
  const [image, setImage] = useRecoilState(imageState);

  const menuHome = () => {
    setHomeMenu(true);
    setMovieMenu(false);
    setTvMenu(false);
  };

  const menuMovie = () => {
    setHomeMenu(false);
    setMovieMenu(true);
    setTvMenu(false);
  };

  return (
    <section
      className={`space-y-5 mb-3 mx-3 rounded-md p-3 min-h-[90vh] transition-all ease-in-out delay-200 ${
        image && 'opacity-80'
      } ${!menuSize && 'bg-[#232B35] !space-y-3 min-w-[180px]'}  `}
    >
      <div
        onClick={menuHome}
        className='flex flex-nowrap cursor-pointer items-center text-gray-300 text-xl'
      >
        <CgHome className={`text-2xl mr-4 ${!menuSize && 'mr-8'}`} />
        {!menuSize && <p>Home</p>}
      </div>
      {latestMovie && (
        <div
          onClick={menuMovie}
          className='flex flex-nowrap cursor-pointer items-center pl-[2px] text-gray-300 text-xl'
        >
          <BsFilm className={` mr-4 ${!menuSize && 'mr-8'}`} />
          {!menuSize && <p>Movies</p>}
        </div>
      )}
      {latestTv && (
        <div className='flex flex-nowrap cursor-pointer items-center text-gray-300 text-xl'>
          <MdMonitor className={`text-2xl mr-4 ${!menuSize && 'mr-8'}`} />
          {!menuSize && <p>TV Shows</p>}
        </div>
      )}

      <div
        onClick={() => setOpen(true)}
        className='flex flex-nowrap cursor-pointer items-center text-gray-300 text-xl'
      >
        <AiFillFolderAdd className={` mr-4 ${!menuSize && 'mr-8'}`} />
        {!menuSize && <p>Add Media</p>}
      </div>
    </section>
  );
}

export default Menu;
