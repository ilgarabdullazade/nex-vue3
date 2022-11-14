import excahangerApi from '@/network/api/excahangerApi';

export const exchangerPairsStore = {
  state: () => ({
    data: null,
    activePair: null,
    currencyLeft: null,
    currencyRight: null,
    serviceCommission: null,
    blockchainCommission: null,
    isLoading: false,
    pairIsLoading: false,
    error: null,
  }),
  getters: {
    selectedPairId: (state) => {
      return state.data
        ? state.data.filter(
            (obj) =>
              obj.currency_left.id === state.currencyLeft.id &&
              obj.currency_right.id === state.currencyRight.id
          )[0].id
        : null;
    },
    selectedRealCurrency: (state) => {
      return state.activePair
        ? state.activePair.fiat_to_crypto
          ? state.activePair.currency_left
          : state.activePair.currency_right
        : null;
    },
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setActivePair(state, pair) {
      state.activePair = pair;
    },
    setCurrencyLeft(state, currency) {
      state.currencyLeft = currency;
    },
    setCurrencyRight(state, currency) {
      state.currencyRight = currency;
    },
    setServiceCommission(state, value) {
      state.serviceCommission = value;
    },
    setBlockchainCommission(state, value) {
      state.blockchainCommission = value;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setPairLoading(state, bool) {
      state.pairIsLoading = bool;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getPairs({ commit }) {
      try {
        commit('setLoading', true);
        const response = await excahangerApi.getPairs();
        commit('setData', response.data);
        if (response.data.length) {
          commit('setActivePair', response.data[0]);
          commit('setCurrencyLeft', response.data[0].currency_left);
          commit('setCurrencyRight', response.data[0].currency_right);
        }
        return response;
      } catch (e) {
        console.log(e);
        commit('setError', e.message);
      } finally {
        commit('setLoading', false);
      }
    },
    async getPair({ commit }, id) {
      try {
        commit('setPairLoading', true);
        const response = await excahangerApi.getPair(id);
        commit('setActivePair', response.data);
        return response;
      } catch (e) {
        console.log(e);
        commit('setError', e.message);
      } finally {
        commit('setPairLoading', false);
      }
    },
    async preCalculate({ commit }, params) {
      try {
        commit('setPairLoading', true);
        return await excahangerApi.preCalculate(params);
      } catch (e) {
        console.log(e);
        commit('setError', e.message);
      } finally {
        commit('setPairLoading', false);
      }
    },
  },
  namespaced: true,
};
