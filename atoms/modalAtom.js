import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const menuSizeState = atom({
  key: 'menuSizeState',
  default: false,
});

export const mediaItemState = atom({
  key: 'mediaItemState',
  default: false,
});

export const homeMovieState = atom({
  key: 'homeMovieState',
  default: false,
});

export const homeTvState = atom({
  key: 'homeTvState',
  default: false,
});

export const mediaValueState = atom({
  key: 'mediaValueState',
  default: {},
});
