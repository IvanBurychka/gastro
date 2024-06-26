import { Dish } from '../models/dish';
import axios from '../axios';
import { DishCreate } from '../models/Dish-Create';

export async function getDishes(query = ''): Promise<Dish[]>{
  const { data } = await axios.get<Dish[]>(`/dishes${query}`);

  return data;
}

export async function getUserDishes(userId: number): Promise<Dish[]> {
  const { data } = await axios.get<Dish[]>(`/user/${userId}/dishes`);

  return data;
}

export async function createUserDishes(userId: number, dish: DishCreate): Promise<Dish> {
  const formData = new FormData();

  Object.entries(dish).forEach(([key, value]) => {
    if (key === 'file' && value) {
      formData.append(key, value, value.name);
    } else if (value) {
      formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
    }
  });

  const { data } = await axios.post<Dish>(`/user/${userId}/dishes`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}
