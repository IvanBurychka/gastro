import { Ingredient } from './Ingredient';

export interface IngredientInDish {
    dishId: number
    amount: number;
    unit: string;
    ingredient: Ingredient;
}