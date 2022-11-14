<template>
  <div class="lastest-operations">
    <h4 class="lastest-operations__headline headline">
      {{ $t('account.operations_history.list.title') }}
    </h4>

    <nex-loading-component v-if="isLoading" />

    <nex-error-message v-if="error" :message="error" />

    <div v-if="transactions" class="lastest-operations__body">
      <ul v-if="transactions.count" class="lastest-operations__items">
        <nex-operations-item
          v-for="transaction in transactions.results"
          :transaction="transaction"
          :key="transaction.unique_id"
          class="lastest-operations__item" />
      </ul>
      <nex-empty-component
        v-else
        :message="$t('common.empty_list', { name: $t('common.operations') })" />

      <div class="lastest-operations__button">
        <button
          v-if="pagesCount > currentPage"
          @click="setNewPage"
          type="button"
          class="lastest-operations__more">
          <span>{{ $t('account.operations_history.list.more') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';
import NexEmptyComponent from '@/components/Empty';
import NexOperationsItem from '@/components/account/operations/OperationsItem';

export default {
  name: 'NexOperationList',
  components: {
    NexLoadingComponent,
    NexErrorMessage,
    NexEmptyComponent,
    NexOperationsItem,
  },
  data: () => {
    return {
      currentPage: 1,
      pagesCount: 1,
    };
  },
  computed: {
    ...mapState({
      transactions: (state) => state.account.accountTransactions.data,
      isLoading: (state) => state.account.accountTransactions.isLoading,
      error: (state) => state.account.accountTransactions.error,
    }),
  },
  methods: {
    ...mapActions({
      getUserTransactionsOnInit:
        'account/accountTransactions/getUserTransactionsOnInit',
      getUserTransactions: 'account/accountTransactions/getUserTransactions',
    }),
    fetchTransactionsOnInit() {
      this.getUserTransactionsOnInit(1).then((res) => {
        this.pagesCount = Math.ceil(res.data.count / 3);
      });
    },
    fetchNewTransactions() {
      this.getUserTransactions(this.currentPage).then((res) => {
        this.transactions.results = [
          ...this.transactions.results,
          ...res.data.results,
        ];
      });
    },
    setNewPage() {
      if (this.pagesCount > this.currentPage) {
        this.currentPage++;
        this.fetchNewTransactions();
      }
    },
  },
  mounted() {
    this.fetchTransactionsOnInit();
  },
};
</script>

<style scoped>
.item-lastest-operations {
  display: block !important;
}
</style>
