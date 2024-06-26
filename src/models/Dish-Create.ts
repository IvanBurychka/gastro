export interface DishCreate {
  title: string | null;
  description: string | null;
  cuisineId: number | null;
  costId: number | null;
  dietaryPreferenceId: number | null;
  ingredientIds: number[];
  allergyIds: number[];
  calorieId: number | null;
  cookingMethodId: number | null;
  difficultyId: number | null;
  servingSizeId: number | null;
  preparationTime: number | null;
  seasonalityId: number | null;
  mealTypeId: number | null;
  file: File | null;
}