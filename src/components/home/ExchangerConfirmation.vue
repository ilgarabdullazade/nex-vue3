<template>
  <div class="data-confirmation__container">
    <div class="stepper">
      <ul class="stepper__list">
        <li class="stepper__item" :class="{ stepper__item_active: step === 1 }">
          <span class="stepper__step">1</span>
        </li>
        <li class="stepper__item" :class="{ stepper__item_active: step === 2 }">
          <span class="stepper__step">2</span>
        </li>
        <li class="stepper__item" :class="{ stepper__item_active: step === 3 }">
          <span class="stepper__step">3</span>
        </li>
      </ul>
    </div>
    <h1 class="data-confirmation__title title">
      {{
        step === 2
          ? $t('main.data_confirmation')
          : $t('main.application_details')
      }}
    </h1>
    <div
      v-if="step === 2"
      class="data-confirmation__body"
      :class="{ disabled: isLoading }">
      <nex-exchanger-confirmation-item
        :is-give="true"
        :currency="activePair.currency_left"
        :amount="formData.amount_exchange"
        :account="formData.from_account" />
      <nex-exchanger-confirmation-item
        :is-give="false"
        :currency="activePair.currency_right"
        :amount="formData.amount_receipt"
        :account="formData.to_account" />
      <Form @submit="onSubmit" :validation-schema="validationSchema">
        <div class="form-data-confirmation__content">
          <h5 class="form-data-confirmation__caption caption">
            {{ $t('main.personal_data') }}
          </h5>
          <div class="form-data-confirmation__input">
            <Field
              v-model="emailModel"
              type="email"
              name="email"
              :disabled="currentUser"
              :placeholder="$t('main.form.enter_email')"
              class="input" />

            <ErrorMessage name="email" class="error-alert" />
          </div>

          <div class="form-data-confirmation__check">
            <Field
              type="checkbox"
              name="conditions"
              :value="true"
              v-slot="{ field, errors }">
              <input
                id="form-data-confirmation__accept"
                type="checkbox"
                name="conditions"
                :value="true"
                v-bind="field"
                class="form-data-cofirmation__checkbox"
                :class="{ error: !!errors.length }" />
              <i18n-t
                scope="global"
                keypath="main.form.agreement"
                tag="label"
                class="form-data-confirmation__accept-label"
                for="form-data-confirmation__accept">
                <router-link :to="{ name: 'policy' }">{{
                  $t('main.form.policy')
                }}</router-link>
              </i18n-t>
            </Field>
          </div>
        </div>
        <div class="form-data-confirmation__buttons">
          <button
            @click="changeStep(1)"
            type="button"
            class="form-data-confirmation__button">
            {{ $t('main.back') }}
          </button>
          <button
            type="submit"
            class="form-data-confirmation__second-button button button_none">
            {{ $t('main.pay') }}
          </button>
        </div>
      </Form>
    </div>
    <template v-if="step === 3">
      <div class="request-details__request request">
        <div class="request__header">
          <h5 class="request__caption caption">
            {{ $t('main.submit_transfer') }}
          </h5>
        </div>
        <p class="request__create-date">
          {{ $t('main.created') }}
          {{ formatDate(responseForCrypto.created_at) }}
        </p>
      </div>
      <nex-exchanger-confirmation-item
        class="request-details__request"
        :show-data="false"
        :is-give="false"
        :currency="responseForCrypto.currency_exchange"
        :amount="formData.amount_exchange"
        :account="responseForCrypto.deposit_address" />
      <div class="request-details__request request">
        <i18n-t
          scope="global"
          keypath="main.support_text"
          tag="p"
          class="request__create">
          <a href="mailto:support@nex.com" class="link">{{
            $t('main.write_us')
          }}</a>
        </i18n-t>
      </div>
      <div class="form-data-confirmation__buttons">
        <button
          @click="changeStep(1)"
          type="button"
          class="form-data-confirmation__second-button button button_none">
          {{ $t('main.to_main') }}
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { Form, Field, ErrorMessage } from 'vee-validate';
import moment from 'moment';
import NexExchangerConfirmationItem from '@/components/home/ExchangerConfirmationItem';

export default {
  name: 'NexExchangerConfirmation',
  components: {
    NexExchangerConfirmationItem,
    Form,
    Field,
    ErrorMessage,
  },
  data: () => {
    return {
      emailModel: '',
      validationSchema: {
        email: 'required|max:254|email',
        conditions: (value) => {
          if (value) {
            return true;
          }
          return;
        },
      },
      responseForCrypto: {
        message: 'transaction create',
        amount_exchange: '0.006826000000000000000000000000',
        currency_exchange: {
          id: 2,
          name: 'ETH',
          network: 'ERC20',
          provider: null,
          name_from_white_bit: 'ETH',
          image_icon: '/media/currency_images/2022/11/09/faq5.png',
          fiat: false,
          min_withdraw: '0.010000000000000000000000000000',
          max_withdraw: '1000000.000000000000000000000000000000',
          min_deposit: '0.006500000000000000000000000000',
          max_deposit: '1000000.000000000000000000000000000000',
          network_for_min_max: 'ERC20',
          commission_deposit: '0.000000000000000',
          commission_withdraw: '0.001071600000000',
        },
        amount_received: '329.969800000000000000000000000000',
        currency_received: {
          id: 1,
          name: 'UAH (MONO / Privat / VISA /Mastercard)',
          network: null,
          provider: 'VISAMASTER',
          name_from_white_bit: 'UAH',
          image_icon: '/media/currency_images/2022/11/09/555.jpeg',
          fiat: true,
          min_withdraw: '50.000000000000000000000000000000',
          max_withdraw: '100000.000000000000000000000000000000',
          min_deposit: '50.000000000000000000000000000000',
          max_deposit: '29500.000000000000000000000000000000',
          network_for_min_max: 'VISAMASTER',
          commission_deposit: '0.000000000000000',
          commission_withdraw: '0.000000000000000',
        },
        created_at: '2022-11-29T11:24:50.912047Z',
        user: 'd072d707-8949-494a-a173-6ec1b0b4a578',
        deposit_address: '0xe135B8206004d8128bB00d20Bd8aE0a798E621C9',
        unique_id: '44d64a27-3099-458b-9ebb-5b563f837e8d',
        email: 'ilqar_99_99@inbox.ru',
      },
    };
  },
  props: {
    step: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState({
      activePair: (state) => state.exchanger.exchangerPairs.activePair,
      formData: (state) => state.exchanger.exchangerTransactions.formData,
      isLoading: (state) => state.exchanger.exchangerTransactions.isLoading,
      error: (state) => state.exchanger.exchangerTransactions.error,
    }),
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
  },
  methods: {
    ...mapActions({
      transactionFiatToCrypto:
        'exchanger/exchangerTransactions/transactionFiatToCrypto',
      transactionCryptoToFiat:
        'exchanger/exchangerTransactions/transactionCryptoToFiat',
    }),
    changeStep(step) {
      this.$emit('setStep', step);
    },
    formatDate(value) {
      return moment(value).format('kk:mm:ss - DD.MM.YYYY');
    },
    onSubmit(values) {
      const formData = {
        pairs_id: this.activePair.id,
        amount_exchange: this.formData.amount_exchange,
        email: values.email,
        address: this.formData.to_account.replace(/\s+/g, ''),
      };
      console.log(formData);
      this.activePair.fiat_to_crypto
        ? this.transactionFiatToCrypto(formData).then((res) =>
            window.open(res.data.deposit_address, '_self')
          )
        : this.transactionCryptoToFiat(formData).then((res) => {
            this.changeStep(3);
            this.responseForCrypto = res.data;
          });
    },
  },
  mounted() {
    if (this.currentUser) {
      this.emailModel = this.currentUser.email;
    }
  },
  watch: {
    currentUser() {
      this.emailModel = this.currentUser.email;
    },
  },
};
</script>

<style scoped>
.form-data-cofirmation__checkbox.error {
  outline: auto;
  outline-color: red;
}

.stepper {
  max-width: 170px;
}

.link {
  color: #edbb40;
}
</style>
