import axios from 'axios';
import { getItem } from '@/helpers/persistanceStorage';
import { AuthJWT } from '@/helpers/authJWT';
import store from '@/store';

axios.defaults.baseURL = 'https://exchangenex.com/';

axios.interceptors.request.use((config) => {
  const accessToken = getItem('accessToken');
  if (accessToken && !AuthJWT.isTokenExpired(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const prevRequestConfig = config;
    if (
      response &&
      response.status === 401 &&
      !prevRequestConfig.sent &&
      getItem('accessToken')
    ) {
      prevRequestConfig.sent = true;
      const res = await store.dispatch('auth/loginUsingToken');

      prevRequestConfig.headers = { ...prevRequestConfig.headers };

      prevRequestConfig.headers.Authorization = `Bearer ${res.access}`;
      return axios(prevRequestConfig);
    }
    return Promise.reject(error);
  }
);

export default axios;
