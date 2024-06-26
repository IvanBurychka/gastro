import { atom } from 'recoil';
import { Cuisine } from '../../models/Cuisine';
import { MealType } from '../../models/MealType';
import { CookingMethod } from '../../models/CookingMethods';
import { DietaryPreference } from '../../models/DietaryPreferences';
import { Seasonality } from '../../models/Seasonality';
import { Difficulty } from '../../models/Difficulty';
import { Calories } from '../../models/Calories';
import { ServingSizes } from '../../models/ServingSizes';
import { Cost } from '../../models/Cost';
import { Allergy } from '../../models/Allergy';

const cuisinesAtom = atom<Cuisine[]>({
  key: 'cuisinesAtom',
  default: []
});

const mealTypesAtom = atom<MealType[]>({
  key: 'mealTypesAtom',
  default: []
});

const cookingMethodsAtom = atom<CookingMethod[]>({
  key: 'cookingMethodsAtom',
  default: []
});

const dietaryPreferencesAtom = atom<DietaryPreference[]>({
  key: 'dietaryPreferencesAtom',
  default: []
});

const seasonalitiesAtom = atom<Seasonality[]>({
  key: 'seasonalitiesAtom',
  default: []
});

const difficultiesAtom = atom<Difficulty[]>({
  key: 'difficultiesAtom',
  default: []
});

const caloriesAtom = atom<Calories[]>({
  key: 'caloriesAtom',
  default: []
});

const servingSizesAtom = atom<ServingSizes[]>({
  key: 'servingSizesAtom',
  default: []
});

const costsAtom = atom<Cost[]>({
  key: 'costsAtom',
  default: []
});

const allergiesAtom = atom<Allergy[]>({
  key: 'allergiesAtom',
  default: []
});

const mainIngrediantsAtom = atom<Allergy[]>({
  key: 'mainIngrediantsAtom',
  default: []
});

export {
  cuisinesAtom,
  mealTypesAtom,
  cookingMethodsAtom,
  dietaryPreferencesAtom,
  seasonalitiesAtom,
  difficultiesAtom,
  caloriesAtom,
  servingSizesAtom,
  costsAtom,
  allergiesAtom,
  mainIngrediantsAtom,
};

