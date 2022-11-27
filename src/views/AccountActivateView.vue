<template>
  <section class="exchange">
    <div class="exchange__container">
      <h1 class="exchange__title title">
        {{ $t('common.account_activation') }}
      </h1>
      <nex-loading-component v-if="isLoading" />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { setItem } from '@/helpers/persistanceStorage';
import NexLoadingComponent from '@/components/Loading';

export default {
  name: 'AccountActivateView',
  components: {
    NexLoadingComponent,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.account.accountVerification.isLoading,
      error: (state) => state.account.accountVerification.error,
    }),
    currentCode() {
      return this.$route.query.code;
    },
  },
  methods: {
    ...mapActions({
      activateAccount: 'account/accountVerification/activateAccount',
      showDanger: 'notifications/showDanger',
      showSuccess: 'notifications/showSuccess',
    }),
    ...mapMutations({
      setUser: 'auth/setUser',
      setIsLoggedIn: 'auth/setIsLoggedIn',
    }),
  },
  mounted() {
    this.currentCode
      ? this.activateAccount(this.currentCode).then((res) => {
          if (res) {
            this.setUser(res.data.user);
            this.setIsLoggedIn(true);
            setItem('accessToken', res.data.access);
            setItem('refreshToken', res.data.refresh);
            this.showSuccess(this.$t('common.alert.account_activated'));
            this.$router.push({ name: 'personalArea' });
          } else {
            this.showDanger(this.$t('common.alert.error'));
            this.$router.push({ name: 'home' });
          }
        })
      : this.$router.push({ name: 'home' });
  },
};
</script>

<style scoped></style>
