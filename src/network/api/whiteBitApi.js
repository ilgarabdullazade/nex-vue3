import axios from '@/network/axios';

const whiteBitVerification = () => {
  return axios.get(`/api/whiteBIT-verification`);
};

export default {
  whiteBitVerification,
};
