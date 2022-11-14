<template>
  <h1 class="form-security__title title">{{ $t('account.security.title') }}</h1>
  <div class="security__form form-security">
    <nex-change-two-factor-auth class="security__item" />
    <nex-change-email-form class="security__item" />
    <nex-change-password-form class="security__item" />
  </div>
</template>

<script>
import NexChangeEmailForm from '@/components/account/security/ChangeEmailForm';
import NexChangePasswordForm from '@/components/account/security/ChangePasswordForm';
import NexChangeTwoFactorAuth from '@/components/account/security/ChangeTwoFactorAuth';

export default {
  name: 'SecurityView',
  components: {
    NexChangeEmailForm,
    NexChangePasswordForm,
    NexChangeTwoFactorAuth,
  },
};
</script>

<style scoped>
.security__item:not(:last-child) {
  margin-bottom: 24px;
}
</style>
