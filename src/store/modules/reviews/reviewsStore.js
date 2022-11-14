import { reviewsMonitoringStore } from './reviewsMonitoringStore';
import { reviewsForumStore } from './reviewsForumStore';

export const reviewsStore = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    reviewsMonitoring: reviewsMonitoringStore,
    reviewsForum: reviewsForumStore,
  },
  namespaced: true,
};
