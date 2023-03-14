import Feed from './Feed';
import Menu from './Menu';
import MediaItem from './MediaItem';
import { useRecoilState } from 'recoil';
import { mediaItemState } from '../atoms/modalAtom';

function Dashboard() {
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  return (
    <div className='flex w-full'>
      <Menu />
      {!mediaItem ? <Feed /> : <MediaItem />}
    </div>
  );
}

export default Dashboard;
