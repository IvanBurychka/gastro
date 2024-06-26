import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { useAuthActions, useAlertActions } from '../../recoil/actions';

function useFetchWrapper() {
  const alertActions = useAlertActions();
  // const authActions = useAuthActions();
  function request(method: string) {
    return async (url: string, data?: Record<string, any>) => {

      // const requestOptions: {
      //   method: string,
      //   headers: Record<string, any>,
      //   data?: string,
      // } = {
      //   method,
      //   headers: {} as Record<string, any>,
      // };
      // if (body) {
      //   requestOptions.headers['Content-Type'] = 'application/json';
      //   requestOptions.data = JSON.stringify(body);
      // }

      const response = await axios(url, { data, method });
      return handleResponse(response);
    }
  }

  function handleResponse(response: AxiosResponse) {
    const data = response.data;

    if (response.status >= 400) {
      if ([401, 403].includes(response.status)) {
        console.log('Should be logged out');
        // authActions.logout();
      }

      const error = response.statusText;
      alertActions.error(error);
      throw error;
    }

    return data;
  }

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    patch: request('PATCH'),
    delete: request('DELET'),
  }
}

export { useFetchWrapper }

