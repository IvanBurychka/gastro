import { useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../../api/_helpers';
import { userAtom } from '../state/user.atom';

const useAuthActions = () => {
  const setUser = useSetRecoilState(userAtom);
  const fetchWrapper = useFetchWrapper();

  async function login({ email, password }: { email: string, password: string }) {
    await fetchWrapper.post('/auth/login', { email, password });
    const user = await getMe();
    console.log(`get me: ${user}`);
    setUser(user);
  }

  async function getMe() {
    try {
      const user = await fetchWrapper.get('/auth/me');
      return user
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      await fetchWrapper.post('/auth/logout');
    } catch (e) {
      console.log(e);
    }

    setUser(null);
  }

  return {
    login,
    logout,
    getMe,
  }
};

export { useAuthActions }
