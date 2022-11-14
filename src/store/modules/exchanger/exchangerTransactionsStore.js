import excahangerApi from '@/network/api/excahangerApi';

export const exchangerTransactionsStore = {
  state: () => ({
    data: null,
    formData: null,
    isLoading: false,
    error: null,
  }),
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setFormData(state, data) {
      state.formData = data;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async transactionCryptoToFiat({ commit }, data) {
      try {
        commit('setLoading', true);
        const response = await excahangerApi.transactionCryptoToFiat(data);
        commit('setData', response.data);
        return response;
      } catch (e) {
        commit('setError', e.message);
      } finally {
        commit('setLoading', false);
      }
    },
    async transactionFiatToCrypto({ commit }, data) {
      try {
        commit('setLoading', true);
        const response = await excahangerApi.transactionFiatToCrypto(data);
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
