import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
// import 'rc-tooltip/assets/bootstrap.css';
import { useRecoilState } from 'recoil';
import { imageState } from '../atoms/modalAtom';
import { MdViewComfy } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function SliderComp({ defaultValue, step, onClick, onChange, min, max }) {
  const [image, setImage] = useRecoilState(imageState);

  return (
    <div>
      <div className='flex items-center object-contain space-x-2'>
        <div className='w-[100px] m-[15px] text-gray-500'>
          <Slider
            min={min}
            max={max}
            defaultValue={defaultValue}
            step={step}
            onChange={onChange}
          />
        </div>
        {step === 25 ? (
          <MdViewComfy className='text-3xl' />
        ) : image && onClick !== undefined ? (
          <AiFillEye onClick={onClick} className='text-3xl' />
        ) : (
          <AiFillEyeInvisible onClick={onClick} className='text-3xl' />
        )}
      </div>
    </div>
  );
}

export default SliderComp;
