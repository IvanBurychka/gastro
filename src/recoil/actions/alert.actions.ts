import { useSetRecoilState, useResetRecoilState } from "recoil";

import { alertAtom } from "../state";

function useAlertActions() {
  const setAlert = useSetRecoilState(alertAtom);
  const resetAlert = useResetRecoilState(alertAtom);

  return {
    success: (message: string) => setAlert({ message, type: 'alert-success' }),
    error: (message: string) => setAlert({ message, type: 'alert-danger' }),
    clear: resetAlert
  }
}

export { useAlertActions }
