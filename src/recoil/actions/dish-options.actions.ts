import { useSetRecoilState } from 'recoil';
import {
  caloriesAtom,
  cookingMethodsAtom,
  cuisinesAtom,
  dietaryPreferencesAtom,
  seasonalitiesAtom, difficultiesAtom,
  mealTypesAtom, servingSizesAtom, costsAtom, allergiesAtom, mainIngrediantsAtom,
} from '../state/dish-options.atom';
import {
  getAllergies,
  getCalories,
  getCookingMethods, getCosts,
  getCuisines,
  getDietaryPreferences, getDifficulties, getIngredients,
  getMealTypes,
  getSeasonalities, getServingSizes,
} from '../../api/dish-options.api';

export function useDishOptionActions() {
  const setCuisines = useSetRecoilState(cuisinesAtom);
  const setMealTypes = useSetRecoilState(mealTypesAtom);
  const setCookingMethods = useSetRecoilState(cookingMethodsAtom);
  const setDietaryPreferences = useSetRecoilState(dietaryPreferencesAtom);
  const setSeasonalitiesAtom = useSetRecoilState(seasonalitiesAtom);
  const setDifficaltiesAtom = useSetRecoilState(difficultiesAtom);
  const setCaloriesAtom = useSetRecoilState(caloriesAtom);
  const setServingSizesAtom = useSetRecoilState(servingSizesAtom);
  const setCostsAtom = useSetRecoilState(costsAtom);
  const setAllergiesAtom = useSetRecoilState(allergiesAtom);
  const setMainIngrediantsAtom = useSetRecoilState(mainIngrediantsAtom);

  async function fetchCuisines() {
    const cuisines = await getCuisines();
    setCuisines(cuisines);
  }

  async function fetchMealTypes() {
    const mealTypes = await getMealTypes();
    setMealTypes(mealTypes);
  }

  async function fetchCookingMethods() {
    const cookingMethods = await getCookingMethods();
    setCookingMethods(cookingMethods);
  }

  async function fetchDietaryPreferences() {
    const dietaryPreferences = await getDietaryPreferences();
    setDietaryPreferences(dietaryPreferences);
  }

  async function fetchSeasonalities() {
    const seasonalities = await getSeasonalities();
    setSeasonalitiesAtom(seasonalities);
  }

  async function fetchDifficulties() {
    const difficulties = await getDifficulties();
    setDifficaltiesAtom(difficulties);
  }

  async function fetchCalories() {
    const calories = await getCalories();
    setCaloriesAtom(calories);
  }

  async function fetchServingSizes() {
    const servingSizes = await getServingSizes();
    setServingSizesAtom(servingSizes);
  }

  async function fetchCosts() {
    const costs = await getCosts();
    setCostsAtom(costs);
  }

  async function fetchAllergies() {
    const allergies = await getAllergies();
    setAllergiesAtom(allergies);
  }

  async function fetchMainIngredients() {
    const ingredients = await getIngredients({ isMain: true });
    setMainIngrediantsAtom(ingredients);
  }

  return {
    fetchCuisines,
    fetchMealTypes,
    fetchCookingMethods,
    fetchDietaryPreferences,
    fetchSeasonalities,
    fetchDifficulties,
    fetchCalories,
    fetchServingSizes,
    fetchCosts,
    fetchAllergies,
    fetchMainIngredients,
  }
}

