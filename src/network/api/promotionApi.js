import axios from '@/network/axios';

const getPromotionList = () => {
  return axios.get('/important_info/actions/');
};

export default {
  getPromotionList,
};
