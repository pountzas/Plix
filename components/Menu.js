import { CgHome } from 'react-icons/cg';
import { BsFilm } from 'react-icons/bs';
import { MdMonitor } from 'react-icons/md';
import { AiFillFolderAdd } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { modalState, menuSizeState } from '../atoms/modalAtom';

function Menu() {
  const [open, setOpen] = useRecoilState(modalState);
  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);

  return (
    <section
      className={`space-y-4 mb-3 mx-3 rounded-md p-3 min-h-[90vh] ${
        !menuSize && 'bg-[#232B35] pr-48'
      }  `}
    >
      <div className='flex flex-nowrap cursor-pointer items-center space-x-4 text-gray-300 text-xl'>
        <CgHome className='text-2xl' />
        {!menuSize && <p>Home</p>}
      </div>

      <div className='flex flex-nowrap cursor-pointer items-center space-x-4 pl-[2px] text-gray-300 text-xl'>
        <BsFilm />
        {!menuSize && <p>Movies</p>}
      </div>
      <div className='flex flex-nowrap cursor-pointer items-center space-x-4 text-gray-300 text-xl'>
        <MdMonitor className='text-2xl' />
        {!menuSize && <p>TV Shows</p>}
      </div>

      <div
        onClick={() => setOpen(true)}
        className='flex flex-nowrap cursor-pointer items-center space-x-4 text-gray-300 text-xl'
      >
        <AiFillFolderAdd />
        {!menuSize && <p>Add Media</p>}
      </div>
    </section>
  );
}

export default Menu;
