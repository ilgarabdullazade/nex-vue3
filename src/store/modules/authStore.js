import authApi from '@/network/api/authApi';
import { getItem, setItem, removeItem } from '@/helpers/persistanceStorage';

export const authStore = {
  state: () => ({
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: false,
  }),
  getters: {
    currentUser: (state) => {
      return state.currentUser;
    },
    isLoggedIn: (state) => {
      return !!state.isLoggedIn;
    },
    isAnonymous: (state) => {
      return state.isLoggedIn === false;
    },
  },
  mutations: {
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setUser(state, payload) {
      state.currentUser = payload;
    },
    setValidationErrors(state, errors) {
      state.validationErrors = errors;
    },
    setIsLoggedIn(state, bool) {
      state.isLoggedIn = bool;
    },
  },
  actions: {
    async register({ commit }, credentials) {
      try {
        commit('setLoading', true);
        const response = await authApi.register(credentials);
        commit('setUser', response.data.user);
        commit('setValidationErrors', null);
        commit('setIsLoggedIn', true);
        setItem('accessToken', response.data.access_token);
        setItem('refreshToken', response.data.refresh_token);
        return response;
      } catch (res) {
        commit('setValidationErrors', res);
      } finally {
        commit('setLoading', false);
      }
    },
    async login({ commit, dispatch }, credentials) {
      try {
        commit('setLoading', true);
        const response = await authApi.login(credentials);
        if (
          response.data.user &&
          response.data.detail !== 'Code send to email'
        ) {
          dispatch('actionsAfterLogin', response);
        }
        return response;
      } catch (res) {
        commit('setValidationErrors', res);
      } finally {
        commit('setLoading', false);
      }
    },
    async loginUsingToken({ commit, dispatch }) {
      try {
        commit('setLoading', true);
        const response = await authApi.loginUsingToken(getItem('refreshToken'));
        dispatch('actionsAfterLogin', response);
        return response;
      } catch (res) {
        console.log(res);
        dispatch('logout');
      } finally {
        commit('setLoading', false);
      }
    },
    async getCurrentUser({ commit, dispatch }) {
      try {
        commit('setLoading', true);
        const response = await authApi.getUserInfo();
        commit('setUser', response.data);
        commit('setIsLoggedIn', true);
        return response;
      } catch (res) {
        dispatch('logout');
      } finally {
        commit('setLoading', false);
      }
    },
    async sendResetPasswordCode({ commit }, params) {
      try {
        commit('setLoading', true);
        const response = await authApi.sendResetPasswordCode(params);
        return response;
      } catch (res) {
        commit('setValidationErrors', res);
      } finally {
        commit('setLoading', false);
      }
    },
    async resetPasswordWithCode({ commit }, params) {
      try {
        commit('setLoading', true);
        return await authApi.resetPasswordWithCode(params);
      } catch (res) {
        commit('setValidationErrors', res);
      } finally {
        commit('setLoading', false);
      }
    },
    async loginWithTwoAuthCode({ commit, dispatch }, credentials) {
      try {
        commit('setLoading', true);
        const response = await authApi.loginWithTwoAuthCode(credentials);
        dispatch('actionsAfterLogin', response);
        return response;
      } catch (res) {
        commit('setValidationErrors', res);
      } finally {
        commit('setLoading', false);
      }
    },
    actionsAfterLogin({ commit }, response) {
      commit('setUser', response.data.user);
      commit('setValidationErrors', null);
      commit('setIsLoggedIn', true);
      setItem('accessToken', response.data.access);
      setItem('refreshToken', response.data.refresh);
    },
    logout({ commit }) {
      removeItem('accessToken');
      removeItem('refreshToken');
      commit('setUser', null);
      commit('setIsLoggedIn', false);
    },
  },
  namespaced: true,
};
