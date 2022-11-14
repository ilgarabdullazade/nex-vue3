export const adaptiveStore = {
  state: () => ({
    tablet: false,
  }),
  getters: {
    isTablet: (state) => {
      return state.tablet;
    },
  },
  mutations: {
    setTabletStatus(state, bool) {
      state.tablet = bool;
    },
  },
  actions: {
    onResize({ commit }) {
      commit('setTabletStatus', window.innerWidth < 985);
    },
  },
  namespaced: true,
};
