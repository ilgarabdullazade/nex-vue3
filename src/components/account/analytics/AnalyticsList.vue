<template>
  <div class="referral-operations">
    <h5 class="referral-operations__caption caption">
      {{ $t('account.analytics.operations.title') }}
    </h5>
    <div class="referral-operations__body">
      <nex-loading-component v-if="isLoading" />

      <nex-error-message v-if="error" :message="error" />

      <div v-if="operations" class="referral-operations__items">
        <template v-if="operations.count">
          <nex-analytics-item
            v-for="operation in operations.results"
            :key="operation.transaction_date" />
        </template>
        <nex-empty-component
          v-else
          :message="
            $t('common.empty_list', { name: $t('common.operations') })
          " />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';
import NexEmptyComponent from '@/components/Empty';
import NexAnalyticsItem from '@/components/account/analytics/AnalyticsItem';

export default {
  name: 'NexOperationList',
  components: {
    NexLoadingComponent,
    NexErrorMessage,
    NexEmptyComponent,
    NexAnalyticsItem,
  },
  computed: {
    ...mapState({
      operations: (state) => state.account.accountReferralOperations.data,
      isLoading: (state) => state.account.accountReferralOperations.isLoading,
      error: (state) => state.account.accountReferralOperations.error,
    }),
  },
  methods: {
    ...mapActions({
      getReferralOperations:
        'account/accountReferralOperations/getReferralOperations',
    }),
  },
  mounted() {
    this.getReferralOperations();
  },
};
</script>

<style scoped>
.item-lastest-operations {
  display: block !important;
}
</style>
