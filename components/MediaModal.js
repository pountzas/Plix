import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

function MediaModal() {
  const [open, setOpen] = useRecoilState(modalState);

  return <div className='bg-black text-3xl text-white'>MediaModal</div>;
}

export default MediaModal;
