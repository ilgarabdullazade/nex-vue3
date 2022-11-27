import whiteBitApi from '@/network/api/whiteBitApi';

export const whiteBitStore = {
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
    async whiteBitVerification({ commit }) {
      try {
        commit('setLoading', true);
        const response = await whiteBitApi.whiteBitVerification();
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
