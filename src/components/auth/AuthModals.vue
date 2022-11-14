<template>
  <nex-login-form />
  <nex-register-form />
  <nex-reset-password-form />
</template>

<script>
import NexLoginForm from '@/components/auth/LoginForm';
import NexRegisterForm from '@/components/auth/RegisterForm';
import NexResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default {
  name: 'NexAuthModals',
  components: {
    NexLoginForm,
    NexRegisterForm,
    NexResetPasswordForm,
  },
};
</script>

<style>
.vfm__container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vfm__content {
  background-color: #fff;
  padding: 20px;
  width: 100%;
  max-width: 480px;
  border-radius: 10px;
  position: relative;
}
.error-alert {
  color: red;
  display: inline-block;
  padding: 0 12px;
  margin: 4px 0;
}
.form-password__inner {
  position: relative;
}
.form-password__input {
  padding-right: 50px;
}
.form-password__icon {
  display: inline-flex;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 16px;
}

.dark-mode .vfm__content {
  background-color: #29292e;
}
</style>
