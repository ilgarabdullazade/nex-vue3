<template>
  <vue-final-modal
    name="register-modal"
    v-slot="{ close }"
    v-model="showModal"
    @closed="resetForm()"
    :esc-to-close="true"
    :z-index-base="100">
    <div class="popup-login__header">
      <h3 class="popup-login__heading heading">
        {{ $t('registration.title') }}
      </h3>
      <button @click="close" class="popup__close">
        <img src="@/assets/img/X.svg" alt="icon:close" />
      </button>
    </div>
    <Form
      class="popup__form form-popup"
      @submit="onSubmit"
      :validation-schema="validationSchema"
      ref="popupForm">
      <div class="form-popup__login">
        <label
          class="form-popup__label label"
          for="form-popup__register-usernname"
          >{{ $t('login.form.login') }}</label
        >
        <Field
          type="text"
          name="username"
          class="form-popup__input input"
          id="form-popup__register-usernname"
          :placeholder="$t('login.form.your_login')" />

        <ErrorMessage name="username" class="error-alert" />
      </div>

      <div class="form-popup__password">
        <label
          class="form-popup__label label"
          for="form-popup__register-password">
          {{ $t('login.form.password') }}
        </label>
        <div class="form-password__inner">
          <Field
            :type="showPassword ? 'text' : 'password'"
            name="password"
            class="form-password__input input"
            id="form-popup__input-password"
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

      <div class="form-popup__password-repeat">
        <label
          class="form-popup__label label"
          for="form-popup__register-password-confirm"
          >{{ $t('registration.form.confirm_password') }}</label
        >
        <div class="form-password__inner">
          <Field
            :type="showConfirmPassword ? 'text' : 'password'"
            name="passwordConfirm"
            class="form-password__input input"
            id="form-popup__register-password-confirm"
            :placeholder="$t('registration.form.confirm_your_password')" />
          <button
            @click="showConfirmPassword = !showConfirmPassword"
            type="button"
            class="form-password__icon">
            <Icon
              :icon="
                showConfirmPassword
                  ? icons.eyeOutlined
                  : icons.eyeInvisibleOutlined
              "
              :height="20" />
          </button>
        </div>

        <ErrorMessage name="passwordConfirm" class="error-alert" />
      </div>

      <button type="submit" class="form-popup__button button">
        {{ $t('header.registration') }}
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
  name: 'NexRegisterForm',
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
        old_password: 'required|min:8|max:128',
        new_password: 'required|min:8|max:128',
        passwordConfirm: 'required|confirmed:@password',
        conditions: (value) => {
          if (value) {
            return true;
          }
          return;
        },
      },
      icons: {
        eyeOutlined,
        eyeInvisibleOutlined,
      },
      showModal: false,
      showPassword: false,
      showConfirmPassword: false,
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
      register: 'auth/register',
      showDanger: 'notifications/showDanger',
    }),
    onSubmit(values) {
      this.register({
        email: values.email,
        password: values.password,
        username: values.username,
        inviter_token: '',
      }).then((res) => {
        if (res) {
          $vfm.hideAll();
        } else {
          this.resetForm();
          this.showDanger(this.validationErrors.message);
        }
      });
    },
    resetForm() {
      this.$refs.popupForm.resetForm();
    },
    openLoginModal() {
      $vfm.hideAll().then(() => $vfm.show('login-modal'));
    },
  },
};
</script>

<style scoped>
.form-popup__check {
  display: block;
}
.form-data-cofirmation__checkbox.error {
  outline: auto;
  outline-color: red;
}
</style>
