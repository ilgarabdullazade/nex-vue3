<template>
  <Form
    @submit="onSubmit"
    :validation-schema="validationSchema"
    ref="changePasswordForm">
    <div class="form-security__header">{{ $t('account.security.title') }}</div>

    <div class="form-security__password">
      <label
        class="form-security__label label"
        for="form-security__input-password"
        >{{ $t('account.security.old_password') }}</label
      >
      <div class="form-password__inner">
        <Field
          :type="showOldPassword ? 'text' : 'password'"
          name="old_password"
          class="form-security__input input"
          id="form-security__input-password"
          :placeholder="$t('account.security.enter_old_password')" />
        <button
          @click="showOldPassword = !showOldPassword"
          type="button"
          class="form-password__icon">
          <Icon
            :icon="
              showOldPassword ? icons.eyeOutlined : icons.eyeInvisibleOutlined
            "
            :height="20" />
        </button>
      </div>

      <ErrorMessage name="old_password" class="error-alert" />
    </div>

    <div class="form-security__new-password">
      <label
        class="form-security__label label"
        for="form-security__input-new-password"
        >{{ $t('account.security.new_password') }}</label
      >
      <div class="form-password__inner">
        <Field
          :type="showNewPassword ? 'text' : 'password'"
          name="new_password"
          class="form-security__input input"
          id="form-security__input-new-password"
          :placeholder="$t('account.security.enter_new_password')" />
        <button
          @click="showNewPassword = !showNewPassword"
          type="button"
          class="form-password__icon">
          <Icon
            :icon="
              showNewPassword ? icons.eyeOutlined : icons.eyeInvisibleOutlined
            "
            :height="20" />
        </button>
      </div>

      <ErrorMessage name="new_password" class="error-alert" />
    </div>

    <!--  -->
    <div class="form-security__check-password">
      <label
        class="form-security__label label"
        for="form-security__input-check-password"
        >{{ $t('account.security.confirm_password') }}</label
      >
      <div class="form-password__inner">
        <Field
          :type="showNewPassword ? 'text' : 'password'"
          name="passwordConfirm"
          class="form-security__input input"
          id="form-security__input-check-password"
          :placeholder="$t('account.security.enter_confirm_password')" />
        <button
          @click="showNewPasswordConfirm = !showNewPasswordConfirm"
          type="button"
          class="form-password__icon">
          <Icon
            :icon="
              showNewPasswordConfirm
                ? icons.eyeOutlined
                : icons.eyeInvisibleOutlined
            "
            :height="20" />
        </button>
      </div>

      <ErrorMessage name="passwordConfirm" class="error-alert" />
    </div>
    <div class="form-security__btn form-security__password">
      <button type="submit" class="form-security__button button button_long">
        {{ $t('account.security.save') }}
      </button>
    </div>
  </Form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { Icon } from '@iconify/vue';
import eyeOutlined from '@iconify-icons/ant-design/eye-outlined';
import eyeInvisibleOutlined from '@iconify-icons/ant-design/eye-invisible-outlined';

export default {
  name: 'NexChangePasswordForm',
  components: {
    Form,
    Field,
    ErrorMessage,
    Icon,
  },
  data: () => {
    return {
      validationSchema: {
        old_password: 'required|min:8|max:128',
        new_password: 'required|min:8|max:128|not_same:@old_password',
        passwordConfirm: 'required|confirmed:@new_password',
      },
      icons: {
        eyeOutlined,
        eyeInvisibleOutlined,
      },
      showOldPassword: false,
      showNewPassword: false,
      showNewPasswordConfirm: false,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.account.accountChangePassword.isLoading,
      validationErrors: (state) =>
        state.account.accountChangePassword.validationErrors,
    }),
  },
  methods: {
    ...mapMutations({
      setLoading: 'auth/setLoading',
    }),
    ...mapActions({
      changePassword: 'account/accountChangePassword/changePassword',
      showSuccess: 'notifications/showSuccess',
      showDanger: 'notifications/showDanger',
    }),
    onSubmit(values) {
      this.changePassword(values).then((res) => {
        res
          ? this.showSuccess(
              this.$t('common.alert.change_success', {
                name: this.$t('login.form.password'),
              })
            )
          : this.showDanger(this.$t('common.alert.error'));

        this.resetForm();
      });
    },
    resetForm() {
      this.$refs.changePasswordForm.resetForm();
    },
  },
};
</script>

<style scoped>
.form-security__password {
  margin-top: 16px;
}
</style>
