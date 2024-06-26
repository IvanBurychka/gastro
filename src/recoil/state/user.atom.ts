import { atom, selector } from 'recoil';
import { getMe } from '../../api/users';

type AuthUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
}

const getMeSelector = selector<AuthUser | null>({
  key: 'getMe',
  get: async () => {
    return await getMe();
  }
})

const userAtom = atom<AuthUser | null>({
  key: 'user',
  default: getMeSelector,
});

export { userAtom }
