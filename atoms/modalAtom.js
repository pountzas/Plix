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

export const homeMusicState = atom({
  key: 'homeMusicState',
  default: false,
});

export const castState = atom({
  key: 'castState',
  default: false,
});

export const homeMenuState = atom({
  key: 'homeMenuState',
  default: true,
});

export const mediaValueState = atom({
  key: 'mediaValueState',
  default: {},
});
