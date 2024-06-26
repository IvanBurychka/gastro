export interface ArrayedFilter {
  cuisines: number[],
  mealType: number[],
  dietaryPreference: number[],
  cookingMethod: number[],
  seasonality: number[],
  allergies: number[],
  difficulty: number[],
  calorie: number[],
  servingSize: number[],
  cost: number[],
  ingredients: number[],
}

export interface FilterInterface extends ArrayedFilter {
  search: string | null,
  preparationTime: number | null,
  rate: number | null,
}
