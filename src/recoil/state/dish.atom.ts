import { atom } from 'recoil';
import { Dish } from '../../models/dish';

const dishAtom = atom<Dish | null>({
  key: 'dishAtom',
  default: null
});

export {
  dishAtom
}