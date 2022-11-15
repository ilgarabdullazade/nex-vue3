import axios from '@/network/axios';

const changeEmail = (params) => {
  return axios.patch('/api/account/change-email/', params);
};

const changePassword = (params) => {
  return axios.patch('/api/account/change-password/', params);
};

const changeTwoFactorAuth = (value) => {
  return axios.patch('/api/account/change-two-factor-auth/', {
    two_factor_auth: value,
  });
};

const getReferralStatistics = () => {
  return axios.get('/api/account/referral-statistics/');
};

const getReferralOperations = () => {
  return axios.get('/api/account/referral-operations-list/');
};

const getUserTransactions = (page = 1) => {
  return axios.get('/api/account/user-transactions/', { page });
};

const getUserTransaction = (id) => {
  return axios.get(`/api/account/user-transactions/${id}/`);
};

export default {
  changeEmail,
  changePassword,
  changeTwoFactorAuth,
  getReferralStatistics,
  getReferralOperations,
  getUserTransactions,
  getUserTransaction,
};
