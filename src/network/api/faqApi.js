import axios from '@/network/axios';

const getFaqList = () => {
  return axios.get('/important_info/faq/');
};

export default {
  getFaqList,
};
