import bonusApi from '@/network/api/bonusApi';

export const bonusStore = {
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
    async getBonusCalculate({ commit }, params) {
      try {
        commit('setLoading', true);
        const response = await bonusApi.getBonusCalculate(params);
        commit('setData', response.data);
        commit('setError', null);
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
