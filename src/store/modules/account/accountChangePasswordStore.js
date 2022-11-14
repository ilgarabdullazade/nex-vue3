import accountApi from '@/network/api/accountApi';

export const accountChangePasswordStore = {
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
    async changePassword({ commit }, params) {
      try {
        commit('setData', null);
        commit('setLoading', true);
        const response = await accountApi.changePassword(params);
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
