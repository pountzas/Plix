import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { useRecoilState } from 'recoil';
import { sliderState } from '../atoms/modalAtom';
import { MdViewComfy } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';

function SliderComp({ defaultValue, step, onChange, min, max }) {
  return (
    <div>
      <div className='flex items-center space-x-2 object-contain'>
        <div className='w-[100px] m-[25px] text-gray-500'>
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
        ) : (
          <AiFillEye className='text-3xl' />
        )}
      </div>
    </div>
  );
}

export default SliderComp;
