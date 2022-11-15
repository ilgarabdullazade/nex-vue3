import axios from '@/network/axios';

const login = (credentials) => {
  return axios.post('/api/account/login/', credentials);
};

const register = (credentials) => {
  return axios.post('/api/account/sign_up/', credentials);
};

const loginUsingToken = (token) => {
  return axios.post('/api/account/token/refresh/', { refresh: token });
};

const getUserInfo = () => {
  return axios.get('/api/account/user_info/');
};

const sendResetPasswordCode = (params) => {
  return axios.patch('/api/account/send-change-password-code/', params);
};

const resetPasswordWithCode = (params) => {
  return axios.patch('/api/account/reset-password-with-code/', params);
};

const loginWithTwoAuthCode = (params) => {
  return axios.post('/api/account/login-with-two-auth-code/', params);
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
