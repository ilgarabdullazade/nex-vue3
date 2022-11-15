import axios from '@/network/axios';

const getBonusCalculate = (params) => {
  return axios.get('/api/account/get-bonus-calculate/', { params });
};

export default {
  getBonusCalculate,
};
