<template>
  <Form
    @submit="onSubmit"
    :validation-schema="validationSchema"
    ref="emailChangeForm">
    <div class="form-security__header">
      {{ $t('account.security.change_email') }}
    </div>
    <div class="form-security__mail">
      <label
        class="form-security__label label"
        for="form-security__input-mail"
        >{{ $t('account.security.actual_email') }}</label
      >
      <Field
        type="text"
        name="old_email"
        :value="currentUser.email"
        :disabled="true"
        class="form-security__input input"
        id="form-security__input-mail"
        :placeholder="$t('account.security.enter_actual_email')" />

      <ErrorMessage name="old_email" class="error-alert" />
    </div>
    <div class="form-security__new-mail">
      <label
        class="form-security__label label"
        for="form-security__input-mail"
        >{{ $t('account.security.new_email') }}</label
      >
      <Field
        type="text"
        name="new_email"
        class="form-security__input input"
        id="form-security__input-new-mail"
        :placeholder="$t('account.security.enter_new_email')" />

      <ErrorMessage name="new_email" class="error-alert" />
    </div>

    <div class="form-security__btn">
      <button type="submit" class="form-security__button button button_long">
        {{ $t('account.security.save') }}
      </button>
    </div>
  </Form>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'NexChangeEmailForm',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data: () => {
    return {
      validationSchema: {
        old_email: 'required|max:254|email',
        new_email: 'required|max:254|email|not_same:@old_email',
      },
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.account.accountChangeEmail.isLoading,
      validationErrors: (state) =>
        state.account.accountChangeEmail.validationErrors,
    }),
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
  },
  methods: {
    ...mapActions({
      changeEmail: 'account/accountChangeEmail/changeEmail',
      getCurrentUser: 'auth/getCurrentUser',
      showSuccess: 'notifications/showSuccess',
      showDanger: 'notifications/showDanger',
    }),
    onSubmit(values) {
      if (this.currentUser.email !== values.old_email) {
        this.showDanger(this.$t('account.security.actual_email_incorrect'));
      } else {
        this.changeEmail(values).then((res) => {
          if (res) {
            this.showSuccess(
              this.$t('common.alert.change_success', {
                name: this.$t('registration.form.email'),
              })
            );
            this.getCurrentUser();
          } else {
            this.showDanger(this.$t('common.alert.error'));
          }

          this.resetForm();
        });
      }
    },
    resetForm() {
      this.$refs.emailChangeForm.resetForm();
    },
  },
};
</script>

<style scoped></style>
