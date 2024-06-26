import { atom, RecoilState } from 'recoil';

type AuthType = any | null

const authAtom: RecoilState<AuthType> = atom({ key: 'authUser', default: null as AuthType })

export { authAtom };
