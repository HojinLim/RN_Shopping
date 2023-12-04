import { atom } from 'recoil';

export const currentPushedLike = atom<Boolean | null>({
  key: 'currentPushedLike',
  default: null
});
