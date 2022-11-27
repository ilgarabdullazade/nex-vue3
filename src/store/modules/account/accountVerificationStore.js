import accountApi from '@/network/api/accountApi';

export const accountVerificationStore = {
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
    async sendVerificationCode({ commit }) {
      try {
        commit('setLoading', true);
        return await accountApi.sendVerificationCode();
      } catch (e) {
        commit('setError', e.message);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  namespaced: true,
};
