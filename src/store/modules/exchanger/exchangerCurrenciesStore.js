import excahangerApi from '@/network/api/excahangerApi';

export const exchangerCurrenciesStore = {
  state: () => ({
    data: null,
    realCurrencies: null,
    cryptoCurrencies: null,
    isLoading: false,
    error: null,
  }),
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setRealCurrencies(state, data) {
      state.realCurrencies = data;
    },
    setCryptoCurrencies(state, data) {
      state.cryptoCurrencies = data;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getCurrencyList({ commit }) {
      try {
        commit('setLoading', true);
        const response = await excahangerApi.getCurrencyList();
        commit('setData', response.data);
        commit(
          'setRealCurrencies',
          response.data.filter((currency) => currency.fiat)
        );
        commit(
          'setCryptoCurrencies',
          response.data.filter((currency) => !currency.fiat)
        );
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
