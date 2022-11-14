import axios from '@/network/axios';

const getBonusCalculate = (params) => {
  return axios.get('/account/get-bonus-calculate/', { params });
};

export default {
  getBonusCalculate,
};
