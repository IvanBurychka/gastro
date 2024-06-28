import { useSetRecoilState } from 'recoil';
import { dishesAtom } from '../state/dishes.atom';
import { getDish, getDishes } from '../../api/dishes.api';
import { dishAtom } from '../state/dish.atom';

const useDishActions = () => {
  const setDishes = useSetRecoilState(dishesAtom);
  const setDish = useSetRecoilState(dishAtom);

  async function getUserDishes(userId: number) {
    const dishes = await getUserDishes(userId);
    console.log(dishes);
    // console.log(`get me: ${user}`);
    // setUser(user);
  }

  async function getDishesAndChangeState() {
    const dishes = await getDishes();
    setDishes(dishes);
  }

  async function fetchDishes(query = ''): Promise<void>{
    const dishes = await getDishes(query);
    setDishes(dishes);
  }

  async function fetchDish(id: number): Promise<void>{
    const dish = await getDish(id);
    setDish(dish);
  }

  return {
    getDishesAndChangeState,
    getUserDishes,
    fetchDishes,
    fetchDish,
  }
};

export { useDishActions }
