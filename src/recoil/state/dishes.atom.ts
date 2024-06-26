import { atom, selector, selectorFamily } from 'recoil';
import { getDishes } from '../../api/dishes.api';
import { Dish } from '../../models/dish';

const dishesSelector = selector({
  key: 'dishesSelector',
  get: async ({ get }) => {
    return await getDishes();
  }
});

const dishesAtom = atom({
  key: 'dishes',
  // default: dishesSelector
  default: [] as Dish[]
});

export {
  dishesSelector,
  dishesAtom
};
