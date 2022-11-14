import axios from '@/network/axios';

const changeEmail = (params) => {
  return axios.patch('/account/change-email/', params);
};

const changePassword = (params) => {
  return axios.patch('/account/change-password/', params);
};

const changeTwoFactorAuth = (value) => {
  return axios.patch('/account/change-two-factor-auth/', {
    two_factor_auth: value,
  });
};

const getReferralStatistics = () => {
  return axios.get('/account/referral-statistics/');
};

const getReferralOperations = () => {
  return axios.get('/account/referral-operations-list/');
};

const getUserTransactions = (page = 1) => {
  return axios.get('/account/user-transactions/', { page });
};

const getUserTransaction = (id) => {
  return axios.get(`/account/user-transactions/${id}/`);
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
