import { atom, RecoilState } from "recoil";

type AlertType = {
  message: string | null;
  type: string;
} | null
const alertAtom: RecoilState<AlertType>= atom({ key: 'alert', default: null as AlertType });

export { alertAtom }
