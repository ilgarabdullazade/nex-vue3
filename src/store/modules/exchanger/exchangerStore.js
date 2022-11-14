import { exchangerCurrenciesStore } from './exchangerCurrenciesStore';
import { exchangerPairsStore } from './exchangerPairsStore';
import { exchangerTransactionsStore } from './exchangerTransactionsStore';

export const exchangerStore = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    exchangerCurrencies: exchangerCurrenciesStore,
    exchangerPairs: exchangerPairsStore,
    exchangerTransactions: exchangerTransactionsStore,
  },
  namespaced: true,
};
