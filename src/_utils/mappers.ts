import { FilterInterface } from '../models/Dish-Query';

export function filterToUrl(filter: FilterInterface) {
  let url = '';

  if (filter.search) {
    url += `&search=${filter.search}`;
  }

  if (filter.cuisines.length > 0) {
    url += `&cuisines=${filter.cuisines.join(',')}`;
  }

  if (filter.preparationTime) {
    url += `&preparationTime=${filter.preparationTime}`;
  }

  if (filter.rate) {
    url += `&rate=${filter.rate}`;
  }

  if (filter.mealType.length > 0) {
    url += `&mealType=${filter.mealType.join(',')}`;
  }

  if (filter.dietaryPreference.length > 0) {
    url += `&dietaryPreference=${filter.dietaryPreference.join(',')}`;
  }

  if (filter.cookingMethod.length > 0) {
    url += `&cookingMethod=${filter.cookingMethod.join(',')}`;
  }

  if (filter.seasonality.length > 0) {
    url += `&seasonality=${filter.seasonality.join(',')}`;
  }

  if (filter.allergies.length > 0) {
    url += `&allergies=${filter.allergies.join(',')}`;
  }

  if (filter.difficulty.length > 0) {
    url += `&difficulty=${filter.difficulty.join(',')}`;
  }

  if (filter.calorie.length > 0) {
    url += `&calorie=${filter.calorie.join(',')}`;
  }

  if (filter.servingSize.length > 0) {
    url += `&servingSize=${filter.servingSize.join(',')}`;
  }

  if (filter.cost.length > 0) {
    url += `&cost=${filter.cost}`;
  }

  if (filter.ingredients.length > 0) {
    url += `&ingredients=${filter.ingredients.join(',')}`;
  }

  return url.length ? `?${url.slice(1)}` : '';
}