<template>
  <div class="exchange__container">
    <h1 class="exchange__title title">{{ $t('main.title') }}</h1>
    <h3 class="exchange__caption caption">{{ $t('main.caption') }}</h3>
    <nex-loading-component v-if="isLoading" />

    <nex-error-message v-if="error" :message="error" />

    <div
      v-if="pairs && leftCurrencyList && rightCurrencyList && activePair"
      class="exchange__content">
      <Form
        @submit="onSubmit"
        :validation-schema="validationSchema"
        ref="exchangeForm">
        <div class="exchange__form-exchange">
          <div class="form-exchange__header header-form-exchange">
            <span class="header-form-exchange__rate"
              >1 {{ activePair.currency_left.name }} ≈
              {{ roundUpValue(Number(activePair.value_right), 6) }}
              {{ activePair.currency_right.name }}</span
            >
            <span class="header-form-exchange__number">30</span>
          </div>
          <div class="form-exchange__body">
            <div class="form-exchange__column">
              <div class="form-exchange__give give-form-exchange">
                <label class="give-form-exchange__label" for="leftCurrency">{{
                  $t('main.give')
                }}</label>
                <div class="give-form-exchange__info">
                  <Field
                    name="sum"
                    v-slot="{ handleChange }"
                    ref="leftCurrency">
                    <currency-input
                      v-model="amountLeft"
                      @change="handleChange"
                      @input="calculateCurrency($event.target.value)"
                      :placeholder="$t('main.form.enter_amount')"
                      class="input input_weight input_color" />
                    <nex-exchanger-select
                      @setCurrency="setCurrencyLeft"
                      :currency-list="leftCurrencyList"
                      :main-option="activePair.currency_left"
                      :other-option="activePair.currency_right" />
                  </Field>

                  <ErrorMessage name="sum" class="error-alert" />
                </div>
                <div class="give-form-exchange__amount amount">
                  <span class="amount__min"
                    >{{ $t('main.min_price') }}
                    <span
                      @click="setMaxOrMinValue(activePair.min_value * 1.05)"
                      >{{ roundUpValue(activePair.min_value * 1.05, 6) }}</span
                    >
                    {{ activePair.currency_left.name_from_white_bit }}</span
                  >
                  <span class="amount__max"
                    >{{ $t('main.max_price') }}
                    <span
                      @click="setMaxOrMinValue(activePair.max_value * 0.95)"
                      >{{ roundUpValue(activePair.max_value * 0.95, 6) }}</span
                    >
                    {{ activePair.currency_left.name_from_white_bit }}</span
                  >
                </div>
              </div>
            </div>

            <div class="form-exchange__item">
              <button
                :disabled="pairIsLoading"
                @click="swapCurrency"
                type="button"
                class="form-exchange__button"></button>
            </div>

            <div class="form-exchange__column">
              <div class="form-exchange__give give-form-exchange">
                <label class="give-form-exchange__label" for="rightCurrency">{{
                  $t('main.getting')
                }}</label>
                <div
                  class="give-form-exchange__info give-form-exchange__info_space">
                  <currency-input
                    ref="rightCurrency"
                    v-model="amountRight"
                    disabled
                    :readonly="true"
                    :placeholder="$t('main.form.enter_amount')"
                    class="input input_weight input_color" />
                  <nex-exchanger-select
                    @setCurrency="setCurrencyRight"
                    :currency-list="rightCurrencyList"
                    :main-option="activePair.currency_right"
                    :other-option="activePair.currency_left" />
                </div>
              </div>
              <template v-if="activePair.currency_right.fiat">
                <Field
                  name="credit_card"
                  type="text"
                  :placeholder="$t('main.form.enter_card_number')"
                  class="input"
                  v-maska="'#### #### #### ####'" />

                <ErrorMessage name="credit_card" class="error-alert" />
              </template>
              <template v-else>
                <Field
                  name="crypto_wallet"
                  type="text"
                  :placeholder="$t('main.form.crypto_wallet')"
                  class="input" />

                <ErrorMessage name="crypto_wallet" class="error-alert" />
              </template>
            </div>
          </div>
        </div>
        <div class="exchange__info">
          <ul class="exchange__list">
            <li class="exchange__item">{{ $t('main.included') }}</li>
            <li v-if="serviceCommission" class="exchange__item">
              {{ $t('main.service_fee') }} {{ serviceCommission }}
              {{ selectedRealCurrency.name_from_white_bit }}
            </li>
            <li v-if="blockchainCommission" class="exchange__item">
              {{ $t('main.blockchain_fee') }}
              {{ blockchainCommission }}
              USDT
            </li>
          </ul>
        </div>
        <div class="exchange__button">
          <button type="submit" class="button button_long">
            {{ $t('main.exchange') }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { maska } from 'maska';
import { roundUp } from '@/helpers/utils';
import NexExchangerSelect from '@/components/home/ExchangerSelect';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';
import CurrencyInput from '@/components/UI/CurrencyInput';

export default {
  name: 'NexExchangerForm',
  components: {
    NexExchangerSelect,
    NexLoadingComponent,
    NexErrorMessage,
    CurrencyInput,
    Form,
    Field,
    ErrorMessage,
  },
  data: () => {
    return {
      leftCurrencyList: null,
      rightCurrencyList: null,
      amountLeft: 0,
      amountRight: 0,
    };
  },
  directives: { maska },
  computed: {
    ...mapState({
      pairs: (state) => state.exchanger.exchangerPairs.data,
      activePair: (state) => state.exchanger.exchangerPairs.activePair,
      isLoading: (state) => state.exchanger.exchangerPairs.isLoading,
      pairIsLoading: (state) => state.exchanger.exchangerPairs.pairIsLoading,
      error: (state) => state.exchanger.exchangerPairs.error,
      realCurrencies: (state) =>
        state.exchanger.exchangerCurrencies.realCurrencies,
      cryptoCurrencies: (state) =>
        state.exchanger.exchangerCurrencies.cryptoCurrencies,
      currencyLeft: (state) => state.exchanger.exchangerPairs.currencyLeft,
      currencyRight: (state) => state.exchanger.exchangerPairs.currencyRight,
      serviceCommission: (state) =>
        state.exchanger.exchangerPairs.serviceCommission,
      blockchainCommission: (state) =>
        state.exchanger.exchangerPairs.blockchainCommission,
    }),
    ...mapGetters({
      selectedPairId: 'exchanger/exchangerPairs/selectedPairId',
      selectedRealCurrency: 'exchanger/exchangerPairs/selectedRealCurrency',
    }),
    validationSchema() {
      return {
        sum: `required|min_value:${roundUp(
          this.activePair.min_value * 1.05,
          6
        )}|max_value:${roundUp(this.activePair.max_value * 0.95, 6)}`,
        credit_card: !this.activePair.currency_left.fiat
          ? 'required|credit_card'
          : null,
        crypto_wallet: this.activePair.currency_left.fiat
          ? 'required|min:16'
          : null,
      };
    },
  },
  methods: {
    ...mapMutations({
      setFormData: 'exchanger/exchangerTransactions/setFormData',
      setCurrencyLeft: 'exchanger/exchangerPairs/setCurrencyLeft',
      setCurrencyRight: 'exchanger/exchangerPairs/setCurrencyRight',
      setServiceCommission: 'exchanger/exchangerPairs/setServiceCommission',
      setBlockchainCommission:
        'exchanger/exchangerPairs/setBlockchainCommission',
    }),
    ...mapActions({
      getCurrencyList: 'exchanger/exchangerCurrencies/getCurrencyList',
      getPair: 'exchanger/exchangerPairs/getPair',
      getPairs: 'exchanger/exchangerPairs/getPairs',
      preCalculate: 'exchanger/exchangerPairs/preCalculate',
    }),

    onSubmit(values) {
      console.log(values);
      this.setFormData({
        amount_exchange: values.sum,
        amount_receipt: this.amountRight,
        to_account: this.activePair.fiat_to_crypto
          ? values.crypto_wallet
          : values.credit_card,
      });
      this.nextStep(2);
    },

    nextStep(step) {
      this.$emit('setStep', step);
    },

    roundUpValue(value, fixed) {
      return roundUp(value, fixed);
    },

    setMaxOrMinValue(value) {
      this.amountLeft = Number(value);
      this.calculateCurrency(Number(value));
    },

    calculateCurrency(value) {
      if (
        value >= this.activePair.min_value * 1.05 &&
        value <= this.activePair.max_value * 0.95
      ) {
        this.preCalculate({
          pairs_id: this.activePair.id,
          price: value,
        }).then((res) => {
          if (res) {
            this.amountRight = res.data.value.value;
            this.setServiceCommission(res.data.value.service_commission);
            this.setBlockchainCommission(res.data.value.blockchain_commission);
          }
        });
      }
    },

    refreshCurrency() {
      this.getPair(this.selectedPairId).then((res) => {
        if (res) {
          this.amountLeft = this.activePair.min_value * 1.05;
          if (this.$refs.leftCurrency) this.$refs.leftCurrency.reset();
          this.calculateCurrency(this.amountLeft);
        }
      });
    },

    swapCurrency() {
      const temporaryCurrencyList = this.leftCurrencyList;
      this.leftCurrencyList = this.rightCurrencyList;
      this.rightCurrencyList = temporaryCurrencyList;

      const temporaryCurrency = this.currencyLeft;
      this.setCurrencyLeft(this.currencyRight);
      this.setCurrencyRight(temporaryCurrency);
      if (this.$refs.exchangeForm) this.$refs.exchangeForm.setErrors({});
    },
  },
  mounted() {
    this.getPairs().then((response) => {
      if (response) {
        this.getCurrencyList().then((res) => {
          if (this.currencyLeft.fiat) {
            this.leftCurrencyList = res.data.filter(
              (currency) => currency.fiat
            );
            this.rightCurrencyList = res.data.filter(
              (currency) => !currency.fiat
            );
          } else {
            this.rightCurrencyList = res.data.filter(
              (currency) => currency.fiat
            );
            this.leftCurrencyList = res.data.filter(
              (currency) => !currency.fiat
            );
          }
        });
        this.refreshCurrency();
      }
    });
  },
  watch: {
    selectedPairId() {
      this.refreshCurrency();
    },
  },
};
</script>

<style scoped>
.header-form-exchange__rate {
  display: block !important;
}
.header-form-exchange {
  justify-content: space-between !important;
}
.form-exchange__button[disabled] {
  opacity: 0.5;
}

.amount__max span,
.amount__min span {
  cursor: pointer;
}

.form-exchange__body {
  display: flex;
  column-gap: 24px;
}
.form-exchange__item {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 78.125em) {
  .form-exchange__body {
    flex-direction: column;
  }
}
</style>
