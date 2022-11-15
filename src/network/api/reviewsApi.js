import axios from '@/network/axios';

const getReviewMonitoringList = () => {
  return axios.get('/api/important_info/feedback-monitoring/');
};

const getReviewForumList = () => {
  return axios.get('/api/important_info/feedback-sites/');
};

export default {
  getReviewMonitoringList,
  getReviewForumList,
};
