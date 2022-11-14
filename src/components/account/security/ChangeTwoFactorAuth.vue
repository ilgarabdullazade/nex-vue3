<template>
  <div class="form-security__accept">
    <label class="form-security__label label" for="form-security__sel-security">
      {{ $t('account.security.authorization_confirmation') }}
    </label>
    <div class="select select_sel-security">
      <div class="select__body">
        <button
          :disabled="isLoading"
          @click="isHidden = !isHidden"
          type="button"
          class="select__title">
          <span class="select__value"
            ><span class="select__content">
              {{
                currentUser.two_factor_auth
                  ? $t('account.security.yes')
                  : $t('account.security.no')
              }}</span
            ></span
          >
        </button>
        <div :hidden="isHidden" class="select__options">
          <button
            v-if="!currentUser.two_factor_auth"
            @click="onChange(true)"
            class="select__option"
            type="button">
            {{ $t('account.security.yes') }}</button
          ><button
            v-else
            @click="onChange(false)"
            class="select__option"
            type="button">
            {{ $t('account.security.no') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'NexChangeTwoFactorAuth',
  data: () => {
    return {
      isHidden: true,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.account.accountChangeTwoFactorAuth.isLoading,
      validationErrors: (state) =>
        state.account.accountChangeTwoFactorAuth.validationErrors,
    }),
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
  },
  methods: {
    ...mapActions({
      changeTwoFactorAuth:
        'account/accountChangeTwoFactorAuth/changeTwoFactorAuth',
      getCurrentUser: 'auth/getCurrentUser',
      showSuccess: 'notifications/showSuccess',
      showDanger: 'notifications/showDanger',
    }),

    onChange(value) {
      this.isHidden = true;
      this.changeTwoFactorAuth(value).then((res) => {
        if (res) {
          this.getCurrentUser();
          this.showSuccess(this.$t('common.alert.success'));
        } else {
          this.showDanger(this.$t('common.alert.error'));
        }
      });
    },
  },
};
</script>

<style scoped>
.select__title[disabled] {
  opacity: 0.5;
}
</style>
