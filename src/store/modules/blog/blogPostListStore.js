import blogApi from '@/network/api/blogApi';

export const blogPostListStore = {
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
    async getPostList(_, { tags, page }) {
      try {
        return await blogApi.getPostList(tags, page);
      } catch (e) {
        console.log(e);
      }
    },
    async getPostListOnInit({ commit, dispatch }, { tags, page }) {
      try {
        commit('setData', null);
        commit('setLoading', true);
        const response = await dispatch('getPostList', {
          tags,
          page,
        });
        commit('setData', response.data);
        commit('setError', null);
        return response;
      } catch (e) {
        commit('setError', e.message);
      } finally {
        commit('setLoading', false);
      }
    },
    async searchPosts({ commit }, { text, page }) {
      try {
        commit('setData', null);
        commit('setLoading', true);
        const response = await blogApi.searchPosts(text, page);
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
