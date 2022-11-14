import accountApi from '@/network/api/accountApi';

export const accountReferralStatisticsStore = {
  state: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  getters: {},
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getReferralStatistics({ commit }) {
      try {
        commit('setData', null);
        commit('setLoading', true);
        const response = await accountApi.getReferralStatistics();
        commit('setData', response.data);
        return response;
      } catch (e) {
        commit('setError', e.message);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  namespaced: true,
};
