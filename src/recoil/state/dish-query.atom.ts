import { atom } from 'recoil';

const defaultDishQuery = {
  search: null,
  cuisines: [],
  preparationTime: null,
  rate: null,
  mealType: [],
  dietaryPreference: [],
  cookingMethod:  [],
  seasonality: [],
  allergies: [],
  difficulty: [],
  calorie: [],
  servingSize: [],
  cost: [],
  ingredients: [],
}

const dishQueryAtom = atom({
    key: 'dishQueryAtom',
    default: defaultDishQuery
});

export {
    dishQueryAtom
}
