import accountApi from '@/network/api/accountApi';

export const accountTransactionsStore = {
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
    async getUserTransactions(_, page) {
      try {
        return await accountApi.getUserTransactions(page);
      } catch (e) {
        console.log(e);
      }
    },
    async getUserTransactionsOnInit({ commit, dispatch }, page) {
      try {
        commit('setData', null);
        commit('setLoading', true);
        const response = await dispatch('getUserTransactions', page);
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
