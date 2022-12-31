<template>
  <vue-final-modal
    name="reset-password-modal"
    v-slot="{ close }"
    v-model="showModal"
    @closed="resetAll"
    :click-to-close="false"
    :esc-to-close="true"
    :z-index-base="100">
    <div class="popup-login__header">
      <h3 class="popup-login__heading heading">
        {{ $t('reset_password.title') }}
      </h3>
      <button @click="close" type="button" class="popup__close">
        <img src="@/assets/img/X.svg" alt="icon:close" />
      </button>
    </div>

    <Form
      v-if="!verificationStep"
      class="popup__form form-popup"
      @submit="sendCode"
      :validation-schema="validationSchemaFirstForm"
      ref="sendResetCodeForm">
      <div class="form-popup__email">
        <label
          class="form-popup__label label"
          for="form-popup__input-reset-email"
          >{{ $t('registration.form.email') }}</label
        >
        <Field
          type="email"
          name="email"
          class="form-popup__input input"
          id="form-popup__input-reset-email"
          :placeholder="$t('registration.form.your_email')" />

        <ErrorMessage name="email" class="error-alert" />
      </div>
      <button type="submit" class="form-popup__button button">
        {{ $t('reset_password.next') }}
      </button>
    </Form>
    <Form
      v-else
      class="popup__form form-popup"
      :validation-schema="validationSchemaSecondForm"
      @submit="resetPassword"
      ref="resetPasswordForm">
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

      <div class="form-popup__email">
        <label class="form-popup__label label" for="form-popup__input-code">{{
          $t('reset_password.code_verification')
        }}</label>
        <div class="form-popup__code-wrapper">
          <Field
            type="text"
            name="reset_password_code"
            rules="required"
            class="form-popup__code-input input"
            id="form-popup__input-code" />
          <button
            @click="sendCode(credentials)"
            type="button"
            class="form-popup__code-link">
            {{ $t('reset_password.get_code') }}
          </button>
        </div>
        <ErrorMessage name="reset_password_code" class="error-alert" />
      </div>
      <button type="submit" class="form-popup__button button">
        {{ $t('reset_password.next') }}
      </button>
    </Form>
    <div v-if="showNotification" class="popup__notification notification-popup">
      <div class="notification-popup__image">
        <img src="@/assets/img/warning.png" alt="image" />
      </div>
      <p class="notification-popup__text">
        {{ $t('reset_password.notification_text') }}
      </p>
      <div @click="showNotification = false" class="notification-popup__icon">
        <img src="@/assets/img/X.svg" alt="icon:close" />
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';
import { mapActions, mapMutations, mapState } from 'vuex';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { $vfm } from 'vue-final-modal';
import { Icon } from '@iconify/vue';
import eyeOutlined from '@iconify-icons/ant-design/eye-outlined';
import eyeInvisibleOutlined from '@iconify-icons/ant-design/eye-invisible-outlined';

export default {
  name: 'NexResetPasswordForm',
  components: {
    VueFinalModal,
    Form,
    Field,
    ErrorMessage,
    Icon,
  },
  data: () => {
    return {
      credentials: null,
      validationSchemaFirstForm: {
        email: 'required|max:254|email',
      },
      validationSchemaSecondForm: {
        new_password: 'required|min:8|max:128',
        passwordConfirm: 'required|confirmed:@new_password',
        reset_password_code: 'required',
      },
      icons: {
        eyeOutlined,
        eyeInvisibleOutlined,
      },
      verificationStep: false,
      showModal: false,
      showNotification: true,
      showNewPassword: false,
      showNewPasswordConfirm: false,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.isLoading,
      validationErrors: (state) => state.auth.validationErrors,
    }),
  },
  methods: {
    ...mapMutations({
      setLoading: 'auth/setLoading',
    }),
    ...mapActions({
      sendResetPasswordCode: 'auth/sendResetPasswordCode',
      resetPasswordWithCode: 'auth/resetPasswordWithCode',
      showSuccess: 'notifications/showSuccess',
      showDanger: 'notifications/showDanger',
    }),
    sendCode(values) {
      if (!this.credentials) {
        this.credentials = values;
      }
      this.sendResetPasswordCode(values).then((res) => {
        this.resetSendResetCodeForm();
        if (res) {
          this.verificationStep = true;
          this.showSuccess(
            this.$t('common.alert.send_success', {
              name: this.$t('common.code'),
            })
          );
        } else {
          this.showDanger(
            this.$t(
              `common.alert.${this.validationErrors.response.data.detail}`
            )
          );
        }
      });
    },
    resetPassword(values) {
      this.resetPasswordWithCode(values).then((res) => {
        this.resetPasswordWithCodeForm();
        if (res) {
          $vfm.hideAll();
          this.showSuccess(
            this.$t('common.alert.change_success', {
              name: this.$t('login.form.password'),
            })
          );
        } else {
          console.log(this.validationErrors);
          this.showDanger(this.$t('common.alert.error'));
        }
      });
    },
    resetAll() {
      this.verificationStep
        ? this.resetPasswordWithCodeForm()
        : this.resetSendResetCodeForm();
      this.verificationStep = false;
    },
    resetSendResetCodeForm() {
      this.$refs.sendResetCodeForm.resetForm();
    },
    resetPasswordWithCodeForm() {
      this.$refs.resetPasswordForm.resetForm();
    },
  },
};
</script>

<style scoped>
.notification-popup {
  top: -120px;
}
.notification-popup__image {
  padding-right: 0;
}

@media (max-width: 52.125em) {
  .notification-popup__image {
    padding-right: 0;
  }
  .notification-popup {
    top: -170px;
  }
}
</style>
