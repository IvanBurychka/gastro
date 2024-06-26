import { useSetRecoilState } from 'recoil';
import { dishesAtom } from '../state/dishes.atom';
import { getDishes } from '../../api/dishes.api';

const useDishActions = () => {
  const setDishes = useSetRecoilState(dishesAtom);

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

  // async function logout() {
  //   await logoutUser();
  //   setUser(null);
  // }

  // async function getMe() {
  //   const user = await getMe();
  //   console.log(`get me: ${user}`);
  //   setUser(user);
  // }

  // return logout;

  return {
    getDishesAndChangeState,
    getUserDishes,
    fetchDishes
    // logout,
    // getMe,
  }
};

export { useDishActions }
