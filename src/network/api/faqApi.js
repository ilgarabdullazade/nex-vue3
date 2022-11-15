import axios from '@/network/axios';

const getFaqList = () => {
  return axios.get('/api/important_info/faq/');
};

export default {
  getFaqList,
};
