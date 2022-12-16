<template>
  <header class="header">
    <div class="header__container">
      <router-link :to="$i18nRoute({ name: 'home' })" class="logo">
        <img
          class="logo__text"
          src="@/assets/img/nex_logo_light.svg"
          alt="logo" />
        <img
          class="logo__light"
          src="@/assets/img/nex_logo_dark.svg"
          alt="logo" />
      </router-link>
      <div class="header__menu menu">
        <nav class="menu__body">
          <ul class="menu__list">
            <li class="menu__item menu__item_home">
              <router-link
                :to="$i18nRoute({ name: 'home' })"
                class="menu__link"
                exact-active-class="active"
                >{{ $t('header.home') }}</router-link
              >
            </li>
            <li class="menu__item menu__item_blog">
              <router-link
                :to="$i18nRoute({ name: 'blog' })"
                class="menu__link"
                active-class="active"
                >{{ $t('header.blog') }}</router-link
              >
            </li>
            <li class="menu__item menu__item_bonuses">
              <router-link
                :to="$i18nRoute({ name: 'bonus' })"
                class="menu__link"
                active-class="active"
                >{{ $t('header.bonus') }}</router-link
              >
            </li>
            <li class="menu__item menu__item_promotion">
              <router-link
                :to="$i18nRoute({ name: 'promotion' })"
                class="menu__link"
                active-class="active"
                >{{ $t('header.promotions') }}</router-link
              >
            </li>
            <li class="menu__item menu__item_contacts">
              <router-link
                :to="$i18nRoute({ name: 'contacts' })"
                class="menu__link"
                active-class="active"
                >{{ $t('header.contacts') }}</router-link
              >
            </li>
            <li class="menu__item menu__item_reviews">
              <router-link
                :to="$i18nRoute({ name: 'reviews' })"
                class="menu__link"
                active-class="active"
                >{{ $t('header.reviews') }}</router-link
              >
            </li>
          </ul>
          <div v-if="isTablet" class="cta">
            <nex-language-switcher />
            <nex-theme-switcher />
          </div>
        </nav>
      </div>
      <div class="header__items">
        <div class="header__buttons">
          <button v-if="isAnonymous" @click="openLoginModal" class="sign-in">
            <span class="sign-in__text"> {{ $t('header.sign_in') }} </span>
          </button>

          <router-link
            v-if="isLoggedIn && !isTablet"
            :to="$i18nRoute({ name: 'personalArea' })"
            class="user">
            <picture class="user-picture"
              ><source
                srcset="@/assets/img/header/icons/user-big.webp"
                type="image/webp" />
              <img src="@/assets/img/header/icons/user-big.png" alt="image"
            /></picture>
            <span class="user__text">{{ currentUser.username }}</span>
          </router-link>

          <button
            v-if="isTablet"
            @click="toggleSignIn"
            type="button"
            class="sign-in">
            <img
              class="sign-in__icon sign-in__icon-dark"
              src="@/assets/img/header/icons/Profile.svg"
              alt="icon" />
            <img
              class="sign-in__icon sign-in__icon-light"
              src="@/assets/img/user-light.svg"
              alt="icon" />

            <div v-if="isLoggedIn" class="sign-in__body body-sign-in">
              <a href="#" class="user">
                <picture
                  ><source
                    srcset="@/assets/img/header/icons/user-big.webp"
                    type="image/webp" />
                  <img src="@/assets/img/header/icons/user-big.png" alt="image"
                /></picture>
                <span class="user__text">{{ currentUser.username }}</span>
              </a>
              <ul class="body-sign-in__list">
                <li class="body-sign-in__item body-sign-in__item_history">
                  <router-link
                    :to="$i18nRoute({ name: 'operations' })"
                    class="body-sign-in__link"
                    >{{ $t('menu.operations_history') }}</router-link
                  >
                </li>
                <li class="body-sign-in__item body-sign-in__item_securty">
                  <router-link
                    :to="$i18nRoute({ name: 'security' })"
                    class="body-sign-in__link"
                    >{{ $t('menu.security') }}</router-link
                  >
                </li>
                <li class="body-sign-in__item body-sign-in__item_analytics">
                  <router-link
                    :to="$i18nRoute({ name: 'analytics' })"
                    class="body-sign-in__link"
                    >{{ $t('menu.analytics') }}</router-link
                  >
                </li>
              </ul>
              <button type="button" @click="onLogout" class="log-out">
                {{ $t('menu.logout') }}
              </button>
            </div>
          </button>
          <button
            v-if="isAnonymous"
            @click="openRegisterModal"
            class="header__button button button_size button_style">
            {{ $t('header.registration') }}
          </button>
        </div>
        <button @click="toggleMenu" type="button" class="menu__icon icon-menu">
          <span></span>
        </button>
        <div v-if="!isTablet" class="cta">
          <nex-language-switcher />
          <nex-theme-switcher />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { $vfm } from 'vue-final-modal';
import { mapGetters, mapActions } from 'vuex';
import NexLanguageSwitcher from '@/components/header/LanguageSwitcher';
import NexThemeSwitcher from '@/components/header/ThemeSwitcher';

export default {
  name: 'NexHeader',
  components: {
    NexLanguageSwitcher,
    NexThemeSwitcher,
  },
  data() {
    return {
      menuIsOpen: false,
      signInIsOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      isLoggedIn: 'auth/isLoggedIn',
      isAnonymous: 'auth/isAnonymous',
      isTablet: 'adaptive/isTablet',
    }),
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    toggleSignIn() {
      this.menuIsOpen = false;
      if (this.isLoggedIn) {
        this.signInIsOpen = !this.signInIsOpen;
        document.body.className = this.signInIsOpen ? 'lock sign-in-open' : '';
      } else {
        this.openLoginModal();
      }
    },
    toggleMenu() {
      this.signInIsOpen = false;
      this.menuIsOpen = !this.menuIsOpen;
      document.body.className = this.menuIsOpen ? 'lock menu-open' : '';
    },
    openLoginModal() {
      $vfm.hideAll();
      $vfm.show('login-modal');
    },
    openRegisterModal() {
      $vfm.hideAll();
      $vfm.show('register-modal');
    },
    onLogout() {
      this.$router
        .push({ name: 'home' })
        .then(() => this.logout().then(() => (this.menuIsOpen = false)));
    },
  },
  watch: {
    $route() {
      if (this.menuIsOpen) {
        this.toggleMenu();
      }
    },
  },
};
</script>

<style scoped>
.menu__link.active::after {
  width: 100%;
}
.user-picture img {
  display: block;
}

.logo__text,
.logo__light {
  height: 20px;
}
</style>
