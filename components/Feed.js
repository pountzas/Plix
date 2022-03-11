import { MdViewComfy } from 'react-icons/md';
import MediaCard from './MediaCard';
import { useRecoilState } from 'recoil';
import { modalState, menuSizeState } from '../atoms/modalAtom';

function Feed() {
  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);

  return (
    <section className='p-3 mb-3 mr-3 rounded-md text-2xl text-gray-300'>
      <div className='flex justify-between items-center'>
        <h2>Home</h2>
        <div className='flex items-center space-x-2 object-contain'>
          <p>bar</p>
          <MdViewComfy className='text-3xl' />
        </div>
      </div>
      <div
        className={`${
          menuSize
            ? 'md:max-w-[75vw] lg:max-w-[86vw] xl:max-w-[89vw] 2xl:max-w-[94vw]'
            : 'md:max-w-[50vw] lg:max-w-[65vw] xl:max-w-[72vw] 2xl:max-w-[81vw]'
        } `}
      >
        <div>
          <h3>Latest Movies</h3>
          <div className='pl-3 flex space-x-7 overflow-x-scroll scrollbar-hide'>
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
          </div>
        </div>
        <div className='pt-9'>
          <h3>Latest TV Shows</h3>
          <div className='pl-3 flex space-x-7 overflow-x-scroll scrollbar-hide'>
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feed;
