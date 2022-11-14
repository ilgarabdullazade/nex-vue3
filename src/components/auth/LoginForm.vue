<template>
  <vue-final-modal
    name="login-modal"
    v-slot="{ close }"
    v-model="showModal"
    @closed="resetForm"
    :esc-to-close="true"
    :z-index-base="100">
    <div
      class="popup-login__header"
      :class="{ 'popup-login__header_s': twoAuth }">
      <h3 class="popup-login__heading heading">
        {{ !twoAuth ? $t('login.title') : $t('login.two_auth.title') }}
      </h3>
      <button @click="close" type="button" class="popup__close">
        <img src="@/assets/img/X.svg" alt="icon:close" />
      </button>
    </div>
    <p v-if="twoAuth" class="popup-check__text">
      {{ $t('login.two_auth.caption') }}
    </p>
    <template v-if="!twoAuth">
      <Form
        class="popup__form form-popup"
        @submit="onSubmitLogin"
        :validation-schema="validationSchema"
        ref="loginForm">
        <div class="form-popup__login">
          <label
            class="form-popup__label label"
            for="form-popup__login-username"
            >{{ $t('login.form.login') }}</label
          >
          <Field
            type="text"
            name="username"
            class="form-popup__input input"
            id="form-popup__login-username"
            :placeholder="$t('login.form.your_login')" />

          <ErrorMessage name="username" class="error-alert" />
        </div>

        <div class="form-popup__password">
          <label
            class="form-popup__label label"
            for="form-popup__login-password">
            {{ $t('login.form.password') }}
          </label>
          <div class="form-password__inner">
            <Field
              :type="showPassword ? 'text' : 'password'"
              name="password"
              class="form-password__input input"
              id="form-popup__login-password"
              :placeholder="$t('login.form.your_password')" />
            <button
              @click="showPassword = !showPassword"
              type="button"
              class="form-password__icon">
              <Icon
                :icon="
                  showPassword ? icons.eyeOutlined : icons.eyeInvisibleOutlined
                "
                :height="20" />
            </button>
          </div>

          <ErrorMessage name="password" class="error-alert" />
        </div>

        <div class="form-popup__link">
          <button @click="openResetPasswordModal" type="button">
            {{ $t('login.forget_password') }}
          </button>
        </div>

        <button type="submit" class="form-popup__button button">
          {{ $t('header.sign_in') }}
        </button>
      </Form>

      <div class="popup-login__footer">
        <span class="popup-login__text">{{ $t('login.no_account') }}</span>
        <button
          type="button"
          @click="openRegisterModal"
          class="popup-login__link">
          {{ $t('login.registration') }}
        </button>
      </div>
    </template>

    <Form
      v-else
      class="popup__form form-popup"
      @submit="onSubmitTwoAuth"
      ref="twoAuthForm">
      <div class="form-popup__email">
        <label
          class="form-popup__label label"
          for="form-popup__input-two_auth_code"
          >{{ $t('reset_password.code_verification') }}</label
        >
        <div class="form-popup__code-wrapper">
          <Field
            type="text"
            name="two_auth_code"
            rules="required"
            class="form-popup__code-input input"
            id="form-popup__input-two_auth_code" />
          <button
            @click="onSubmitLogin(credentials)"
            type="button"
            class="form-popup__code-link">
            {{ $t('reset_password.get_code') }}
          </button>
        </div>
        <ErrorMessage name="two_auth_code" class="error-alert" />
      </div>
      <button type="submit" class="form-popup__button button">
        {{ $t('header.sign_in') }}
      </button>
    </Form>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';
import { mapActions, mapMutations, mapState } from 'vuex';
import { $vfm } from 'vue-final-modal';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { Icon } from '@iconify/vue';
import eyeOutlined from '@iconify-icons/ant-design/eye-outlined';
import eyeInvisibleOutlined from '@iconify-icons/ant-design/eye-invisible-outlined';

export default {
  name: 'NexLoginForm',
  components: {
    VueFinalModal,
    Form,
    Field,
    ErrorMessage,
    Icon,
  },
  data: () => {
    return {
      validationSchema: {
        username: 'required|min:3|max:50',
        password: 'required|min:8|max:128',
      },
      icons: {
        eyeOutlined,
        eyeInvisibleOutlined,
      },
      showModal: false,
      showPassword: false,
      twoAuth: false,
      credentials: null,
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
      login: 'auth/login',
      loginWithTwoAuthCode: 'auth/loginWithTwoAuthCode',
      showDanger: 'notifications/showDanger',
      showSuccess: 'notifications/showSuccess',
    }),
    onSubmitLogin(values) {
      if (!this.credentials) {
        this.credentials = values;
      }
      this.login(values).then((res) => {
        if (res) {
          if (res.data.user && res.data.detail !== 'Code send to email') {
            $vfm.hideAll();
            this.showSuccess(this.$t('common.alert.success'));
          } else {
            this.twoAuth = true;
            this.showSuccess(
              this.$t('common.alert.send_success', {
                name: this.$t('reset_password.code_verification'),
              })
            );
          }
        } else {
          this.resetLoginForm();
          this.showDanger(this.$t('common.alert.error'));
        }
      });
    },
    onSubmitTwoAuth(values) {
      this.loginWithTwoAuthCode(values).then((res) => {
        if (res) {
          $vfm.hideAll();
          this.showSuccess(this.$t('common.alert.success'));
        } else {
          this.resetTwoAuthForm();
          this.showDanger(this.$t('common.alert.error'));
        }
      });
    },
    resetForm() {
      this.twoAuth ? this.resetTwoAuthForm() : this.resetLoginForm();
    },
    resetLoginForm() {
      this.$refs.loginForm.resetForm();
    },
    resetTwoAuthForm() {
      this.$refs.twoAuthForm.resetForm();
    },
    openRegisterModal() {
      $vfm.hideAll().then(() => $vfm.show('register-modal'));
    },
    openResetPasswordModal() {
      $vfm.hideAll().then(() => $vfm.show('reset-password-modal'));
    },
  },
};
</script>

<style scoped></style>
