<template>
  <div class="operations__my-operation my-operation">
    <h4 class="my-operation__headline headline">
      {{ $t('account.operations_history.card.title') }}
    </h4>
    <div class="my-operation__details">
      <div class="my-operation__item">
        <span class="my-operation__info">
          {{ $t('account.operations_history.card.counts_exchange_all_time') }}
        </span>
        <span class="my-operation__count">{{
          currentUser.counts_exchange_all_time
        }}</span>
      </div>
      <div class="my-operation__item">
        <span class="my-operation__info">
          {{ $t('account.operations_history.card.counts_exchange_per_mount') }}
        </span>
        <span class="my-operation__count">{{
          currentUser.counts_exchange_per_mount
        }}</span>
      </div>
      <div class="my-operation__item">
        <span class="my-operation__info">
          {{ $t('account.operations_history.card.sum_exchange_usdt_all_time') }}
        </span>
        <span class="my-operation__count"
          >{{
            roundUpValue(currentUser.sum_exchange_usdt_all_time, 2)
          }}
          UAH</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { roundUp } from '@/helpers/utils';

export default {
  name: 'NexOperationsCard',
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
  },
  methods: {
    roundUpValue(value, fixed) {
      return roundUp(value, fixed);
    },
  },
};
</script>

<style scoped></style>
