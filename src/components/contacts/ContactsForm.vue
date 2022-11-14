<template>
  <Form
    @submit="onSubmit"
    :validation-schema="validationSchema"
    ref="contactsForm"
    class="contacts__callback callback-contacts">
    <h4 class="callback-contacts__headline headline">
      {{ $t('contacts.form.title') }}
    </h4>
    <div class="callback-contacts__inner">
      <div class="callback-contacts__mail">
        <label
          class="callback-contacts__label label"
          for="callback-contacts__mail-input"
          >{{ $t('contacts.form.email') }}</label
        >
        <Field
          type="text"
          name="email"
          class="input"
          id="callback-contacts__mail-input"
          :placeholder="$t('contacts.form.your_email')" />

        <ErrorMessage name="email" class="error-alert" />
      </div>
      <div class="callback-contacts__telegram">
        <label
          class="callback-contacts__label label"
          for="callback-contacts__telegram-input"
          >{{ $t('contacts.form.telegram') }}</label
        >
        <Field
          type="text"
          name="telegram"
          class="input"
          id="callback-contacts__telegram-input"
          :placeholder="$t('contacts.form.your_telegram')" />

        <ErrorMessage name="telegram" class="error-alert" />
      </div>
      <div class="callback-contacts__message">
        <label
          class="callback-contacts__label label"
          for="callback-contacts__message-input"
          >{{ $t('contacts.form.topic_label') }}</label
        >
        <Field
          type="text"
          name="title"
          class="input"
          id="callback-contacts__message-input"
          :placeholder="$t('contacts.form.topic')" />

        <ErrorMessage name="title" class="error-alert" />
      </div>
      <div class="callback-contacts__text">
        <Field
          as="textarea"
          type="text"
          name="text"
          class="callback-contacts__textarea"
          cols="30"
          rows="10"
          :placeholder="$t('contacts.form.text')" />

        <ErrorMessage name="text" class="error-alert" />
      </div>
    </div>
    <button type="submit" class="callback-contacts__button button">
      {{ $t('contacts.form.send') }}
    </button>
  </Form>
</template>

<script>
import axios from '@/network/axios';
import { mapActions } from 'vuex';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'NexContactsForm',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data: () => {
    return {
      validationSchema: {
        email: 'required|max:254|email',
        telegram: 'required|min:1|max:100',
        title: 'required|min:1|max:100',
        text: 'required|min:1|max:1024',
      },
      error: null,
      isLoading: null,
    };
  },
  methods: {
    ...mapActions({
      showSuccess: 'notifications/showSuccess',
      showDanger: 'notifications/showDanger',
    }),
    async postForm(data) {
      try {
        return await axios.post('/important_info/get-in-touch/', data);
      } catch (e) {
        this.error = e;
        this.showError('Error');
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.$refs.contactsForm.resetForm();
    },
    onSubmit(values) {
      this.postForm(values).then((res) => {
        if (res) {
          this.resetForm();
          this.showSuccess(this.$t('common.alert.success'));
        }
      });
    },
  },
};
</script>

<style>
textarea {
  color: #1e2329;
}
.dark-mode textarea {
  color: #ececec;
}
</style>
