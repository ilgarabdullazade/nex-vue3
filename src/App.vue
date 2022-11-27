<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';
import { AuthJWT } from '@/helpers/authJWT';
import { getItem } from '@/helpers/persistanceStorage';

export default {
  name: 'App',
  methods: {
    ...mapActions({
      getCurrentUser: 'auth/getCurrentUser',
      loginUsingToken: 'auth/loginUsingToken',
      onResize: 'adaptive/onResize',
    }),
    setTheme(theme) {
      localStorage.setItem('user-theme', theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
  },
  mounted() {
    this.onResize();
    if (getItem('accessToken')) {
      AuthJWT.isTokenExpired(getItem('accessToken'))
        ? this.loginUsingToken()
        : this.getCurrentUser();
    }
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style>
@import './assets/css/style.min.css';
</style>
