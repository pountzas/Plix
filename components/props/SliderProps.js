const SliderProps = {
  0: {
    height: '195px',
    width: '130px',
    title: 'w-[130px]',
    play: 'top-32 inset-10 '
  },
  25: {
    height: `${Math.round(195 * 1.25)}px`,
    width: `${Math.round(130 * 1.25)}px`,
    title: 'w-[130px]',
    play: 'top-36 inset-[52px] text-6xl '
  },
  50: {
    height: `${Math.round(195 * 1.5)}px`,
    width: `${Math.round(130 * 1.5)}px`,
    title: 'w-[195px]',
    play: 'top-44 inset-[64px] text-7xl '
  },
  75: {
    height: `${Math.round(195 * 1.75)}px`,
    width: `${Math.round(130 * 1.75)}px`,
    title: 'w-[195px]',
    play: 'top-52 inset-[80px] text-7xl '
  },
  100: {
    height: `${195 * 2}px`,
    width: `${130 * 2}px`,
    title: 'w-[260px]',
    play: 'top-64 inset-[96px] text-7xl '
  }
};

export default SliderProps;
