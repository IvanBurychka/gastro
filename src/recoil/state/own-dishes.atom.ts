import { atomFamily, selector, selectorFamily } from 'recoil';
import { getUserDishes } from '../../api/dishes.api';
import { userAtom } from './user.atom';

// const ownDishesFamily = selectorFamily({
//   key: 'ownDishesFamily',
//   get: (userId: number) => async ({ get }) => {
//     const authUser = get(userAtom);
//     if (!authUser) {
//       return [];
//     }
//     return await getUserDishes(userId);
//   }
// })

const ownDishesSelector = selector({
  key: 'ownDishesSelector',
  get: async ({ get }) => {
    const authUser = get(userAtom);
    if (!authUser) {
      return [];
    }
    return await getUserDishes(authUser.id);
  }
})

// const ownDishesAtom = atomFamily({
//     key: 'ownDish',
//     default: ownDishesFamily
// });

export {
  // ownDishesFamily,
  // ownDishesAtom,
  ownDishesSelector
};




