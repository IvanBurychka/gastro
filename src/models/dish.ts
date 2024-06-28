import { User } from './User';
import { Calories } from './Calories';
import { CookingMethod } from './CookingMethods';
import { Cost } from './Cost';
import { Cuisine } from './Cuisine';
import { DietaryPreference } from './DietaryPreferences';
import { Difficulty } from './Difficulty';
import { MealType } from './MealType';
import { Seasonality } from './Seasonality';
import { ServingSizes } from './ServingSizes';

export type Dish = {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  preparationTime: number;
  rate: number;
  authorId: number;
  author: User;
  calorie: Calories;
  cookingMethod: CookingMethod;
  cost: Cost;
  cuisine: Cuisine;
  dietaryPreference: DietaryPreference;
  difficulty: Difficulty;
  mealType: MealType;
  seasonality: Seasonality;
  servingSize: ServingSizes;
  createdAt: string;
  deletedAt: string | null;


};
