import blogApi from '@/network/api/blogApi';

export const blogTagsStore = {
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
    async getTags({ commit }) {
      try {
        commit('setData', null);
        commit('setLoading', true);
        const response = await blogApi.getTags();
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
