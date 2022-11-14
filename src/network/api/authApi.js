import axios from '@/network/axios';

const login = (credentials) => {
  return axios.post('/account/login/', credentials);
};

const register = (credentials) => {
  return axios.post('/account/sign_up/', credentials);
};

const loginUsingToken = (token) => {
  return axios.post('/account/token/refresh/', { refresh: token });
};

const getUserInfo = () => {
  return axios.get('/account/user_info/');
};

const sendResetPasswordCode = (params) => {
  return axios.patch('/account/send-change-password-code/', params);
};

const resetPasswordWithCode = (params) => {
  return axios.patch('/account/reset-password-with-code/', params);
};

const loginWithTwoAuthCode = (params) => {
  return axios.post('/account/login-with-two-auth-code/', params);
};

export default {
  login,
  register,
  loginUsingToken,
  getUserInfo,
  sendResetPasswordCode,
  resetPasswordWithCode,
  loginWithTwoAuthCode,
};
