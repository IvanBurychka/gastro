import axios from '../axios';
import { Cuisine } from '../models/Cuisine';
import { MealType } from '../models/MealType';
import { CookingMethod } from '../models/CookingMethods';
import { DietaryPreference } from '../models/DietaryPreferences';
import { Seasonality } from '../models/Seasonality';
import { Difficulty } from '../models/Difficulty';
import { Calories } from '../models/Calories';
import { ServingSizes } from '../models/ServingSizes';
import { Cost } from '../models/Cost';
import { Allergy } from '../models/Allergy';
import { Ingredient } from '../models/Ingredient';

async function getCuisines(): Promise<Cuisine[]>{
  const { data } = await axios.get<Cuisine[]>('/dish-options/cuisines');

  return data;
}

async function getMealTypes(): Promise<MealType[]>{
  const { data } = await axios.get<MealType[]>('/dish-options/meal-types');

  return data;
}

async function getCookingMethods(): Promise<CookingMethod[]>{
  const { data } = await axios.get<CookingMethod[]>('/dish-options/cooking-methods');

  return data;
}

async function getDietaryPreferences(): Promise<DietaryPreference[]>{
  const { data } = await axios.get<DietaryPreference[]>('/dish-options/dietary-preferences');

  return data;
}

async function getSeasonalities(): Promise<Seasonality[]>{
  const { data } = await axios.get<Seasonality[]>('/dish-options/seasonality');

  return data;
}

async function getDifficulties(): Promise<Difficulty[]>{
  const { data } = await axios.get<Difficulty[]>('/dish-options/difficulty');

  return data;
}

async function getCalories(): Promise<Calories[]>{
  const { data } = await axios.get<Calories[]>('/dish-options/calories');

  return data;
}

async function getServingSizes(): Promise<ServingSizes[]>{
  const { data } = await axios.get<ServingSizes[]>('/dish-options/serving-sizes');

  return data;
}

async function getCosts(): Promise<Cost[]>{
  const { data } = await axios.get<Cost[]>('/dish-options/costs');

  return data;
}

async function getAllergies(): Promise<Allergy[]>{
  const { data } = await axios.get<Allergy[]>('/dish-options/allergies');

  return data;
}

interface IngredientQuery {
  search?: string;
  isMain?: boolean;
}

async function getIngredients(query?: IngredientQuery): Promise<Ingredient[]>{
  const { data } = await axios.get<Ingredient[]>('/ingredients', {
    params: query
  });

  return data;
}

export {
  getCuisines,
  getMealTypes,
  getCookingMethods,
  getDietaryPreferences,
  getSeasonalities,
  getDifficulties,
  getCalories,
  getServingSizes,
  getCosts,
  getAllergies,
  getIngredients,
}
