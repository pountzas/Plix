interface SliderProp {
  height: string;
  width: string;
  title: string;
  play: string;
  options: string;
  edit: string;
  later: string;
}

const SliderProps: Record<number, SliderProp> = {
  0: {
    height: "195px",
    width: "130px",
    title: "w-[130px]",
    play: "top-32 inset-10",
    options: "top-56 left-[65px] text-sm",
    edit: "top-56 right-[58px] text-sm",
    later: "top-[52px] right-[72px] text-sm",
  },
  25: {
    height: `${Math.round(195 * 1.25)}px`,
    width: `${Math.round(130 * 1.25)}px`,
    title: "w-[130px]",
    play: "top-36 inset-[52px] text-6xl",
    options: "top-[285px] left-[84px] text-sm",
    edit: "top-[285px] right-[65px] text-sm",
    later: "top-[64px] right-[80px] text-sm",
  },
  50: {
    height: `${Math.round(195 * 1.5)}px`,
    width: `${Math.round(130 * 1.5)}px`,
    title: "w-[195px]",
    play: "top-44 inset-[64px] text-7xl",
    options: "top-[340px] left-[105px] text-base",
    edit: "top-[340px] right-[80px] text-base",
    later: "top-[78px] right-[97px] text-base",
  },
  75: {
    height: `${Math.round(195 * 1.75)}px`,
    width: `${Math.round(130 * 1.75)}px`,
    title: "w-[195px]",
    play: "top-52 inset-[80px] text-7xl",
    options: "top-[390px] left-[138px] text-base",
    edit: "top-[390px] right-[80px] text-base",
    later: "top-[78px] right-[97px] text-base",
  },
  100: {
    height: `${195 * 2}px`,
    width: `${130 * 2}px`,
    title: "w-[260px]",
    play: "top-64 inset-[96px] text-7xl",
    options: "top-[435px] left-[165px] text-lg",
    edit: "top-[435px] right-[80px] text-lg",
    later: "top-[78px] right-[100px] text-lg",
  },
};

export default SliderProps;
