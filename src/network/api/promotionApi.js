import axios from '@/network/axios';

const getPromotionList = () => {
  return axios.get('/api/important_info/actions/');
};

export default {
  getPromotionList,
};
