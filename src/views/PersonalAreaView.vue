<template>
  <section class="operations">
    <div class="operations__container">
      <div
        v-if="!currentUser.is_confirmed"
        class="alert alert-danger"
        role="alert">
        <span class="alert-text">
          {{ $t('account.not_confirmed') }}
        </span>
        <button
          @click="onSubmitLogin(credentials)"
          type="button"
          class="alert-link">
          Получить ссылку
        </button>
      </div>
      <nav class="submenu">
        <div class="submenu__wrapper">
          <ul class="submenu__list">
            <li class="submenu__item submenu__item_user">
              <picture
                ><source
                  srcset="@/assets/img/header/icons/user-big.webp"
                  type="image/webp" />
                <img
                  src="@/assets/img/header/icons/user-big.png"
                  alt="icon:user"
              /></picture>
              <span class="submenu__link">{{ currentUser.username }}</span>
            </li>
            <li class="submenu__item submenu__item_history">
              <router-link
                active-class="submenu__item_active"
                :to="$i18nRoute({ name: 'operations' })"
                class="submenu__link"
                >{{ $t('menu.operations_history') }}</router-link
              >
            </li>
            <li class="submenu__item submenu__item_securty">
              <router-link
                active-class="submenu__item_active"
                :to="$i18nRoute({ name: 'security' })"
                class="submenu__link"
                >{{ $t('menu.security') }}</router-link
              >
            </li>
            <li class="submenu__item submenu__item_analytics">
              <router-link
                active-class="submenu__item_active"
                :to="$i18nRoute({ name: 'analytics' })"
                class="submenu__link"
                >{{ $t('menu.analytics') }}</router-link
              >
            </li>
          </ul>
          <button @click="onLogout" type="button" class="log-out">
            {{ $t('menu.logout') }}
          </button>
        </div>
      </nav>
      <router-view />
    </div>
    <nex-partners />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NexPartners from '@/components/Partners';

export default {
  name: 'PersonalAreaView',
  components: {
    NexPartners,
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    onLogout() {
      this.$router.push({ name: 'home' }).then(() => this.logout());
    },
  },
};
</script>

<style scoped>
.submenu__wrapper {
  display: flex;
  justify-content: space-between;
}
.submenu__wrapper .log-out {
  padding-top: 0;
}
.alert {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 4px;
}

.alert-danger {
  background-color: #f33053;
  color: #ececec;
}

.alert-text {
  display: inline-block;
  margin-right: 20px;
}

.alert-link {
  font-weight: 500;
  text-align: right;
  color: #edbb40;
}
</style>
