<template>
  <button @click="toggleTheme" class="cta__dark-mode dark-mode">
    <img
      v-if="userTheme === 'light-mode'"
      class="dark-mode__icon"
      src="@/assets/img/header/icons/moon.svg"
      alt="icon" />
    <img
      v-else
      class="dark-mode__icon"
      src="@/assets/img/header/icons/sun.svg"
      alt="icon" />
    <span class="dark-mode__text">Dark mode</span>
    <div class="dark-mode__form form-dark-mode">
      <div class="switcher">
        <input
          @change="toggleTheme"
          :checked="userTheme === 'dark-mode'"
          id="switcher"
          type="checkbox"
          class="switcher__input" />
        <label class="switcher__label" for="switcher"></label>
      </div>
    </div>
  </button>
</template>

<script>
import { getItem, setItem } from '@/helpers/persistanceStorage';

export default {
  name: 'NexThemeSwatcher',
  mounted() {
    const initUserTheme = this.getTheme() || this.getMediaPreference();
    this.setTheme(initUserTheme);
  },

  data() {
    return {
      userTheme: 'light-theme',
    };
  },

  methods: {
    toggleTheme() {
      const activeTheme = getItem('user-theme');
      activeTheme === 'light-mode'
        ? this.setTheme('dark-mode')
        : this.setTheme('light-mode');
    },

    getTheme() {
      return getItem('user-theme') ?? 'light-mode';
    },

    setTheme(theme) {
      setItem('user-theme', theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      hasDarkPreference ? 'dark-mode' : 'light-mode';
    },
  },
};
</script>

<style scoped>
.dark-mode__icon {
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
}
</style>
