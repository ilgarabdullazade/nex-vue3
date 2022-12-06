<template>
  <div class="referral-analytics">
    <h5 class="referral-analytics__caption caption">
      {{ $t('account.analytics.statistics.title') }}
    </h5>

    <nex-loading-component v-if="isLoading" />

    <nex-error-message v-if="error" :message="error" />

    <div v-if="statistics" class="referral-analytics__items">
      <div class="referral-analytics__item">
        <span class="referral-analytics__header">
          {{ $t('account.analytics.statistics.counts_of_referral') }}
        </span>
        <div class="referral-analytics__count">
          {{ statistics.counts_of_referral }}
        </div>
      </div>
      <div class="referral-analytics__item">
        <span class="referral-analytics__header">
          {{ $t('account.analytics.statistics.paid_from_referral') }}
        </span>
        <div class="referral-analytics__count">
          {{ statistics.paid_from_referral }} UAH
        </div>
      </div>
      <div class="referral-analytics__item">
        <span class="referral-analytics__header">
          {{ $t('account.analytics.statistics.total_sum_from_referral') }}
        </span>
        <div class="referral-analytics__count">
          {{ statistics.total_sum_from_referral }} UAH
        </div>
      </div>
      <div class="referral-analytics__item">
        <span class="referral-analytics__header">
          {{ $t('account.analytics.statistics.available_for_payment') }}
        </span>
        <div class="referral-analytics__count">
          {{ statistics.available_for_payment }} UAH
        </div>
      </div>
    </div>
    <button
      @click="copyReferralUrl"
      type="button"
      class="referral-analytics__link">
      {{ $t('account.analytics.statistics.referral_link') }}
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { copyURL } from '@/helpers/utils';
import { roundUp } from '@/helpers/utils';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'NexOperationsCard',
  components: {
    NexLoadingComponent,
    NexErrorMessage,
  },
  computed: {
    ...mapState({
      statistics: (state) => state.account.accountReferralStatistics.data,
      isLoading: (state) => state.account.accountReferralStatistics.isLoading,
      error: (state) => state.account.accountReferralStatistics.error,
    }),
  },
  methods: {
    ...mapActions({
      getReferralStatistics:
        'account/accountReferralStatistics/getReferralStatistics',
      showInfo: 'notifications/showInfo',
    }),
    roundUpValue(value, fixed) {
      return roundUp(value, fixed);
    },
    copyReferralUrl() {
      copyURL(this.statistics.referral_url).then(() =>
        this.showInfo(this.$t('common.copied'))
      );
    },
  },
  mounted() {
    this.getReferralStatistics();
  },
};
</script>

<style scoped></style>
