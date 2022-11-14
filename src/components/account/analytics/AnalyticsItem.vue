<template>
  <div class="referral-operations__item">
    <span class="referral-operations__date">{{
      formatDate(operation.transaction_date)
    }}</span>
    <div class="referral-operations__mail-info">
      <span class="referral-operations__header">
        {{ $t('account.analytics.operations.item.email') }}
      </span>
      <span class="referral-operations__text">{{ operation.user_email }}</span>
    </div>
    <div class="referral-operations__total">
      <span class="referral-operations__header">
        {{ $t('account.analytics.operations.item.sum') }}
      </span>
      <span class="referral-operations__text">10 000 UAH</span>
    </div>
    <div class="referral-operations__earned">
      <span class="referral-operations__header">
        {{ $t('account.analytics.operations.item.earned') }}
      </span>
      <span class="referral-operations__text"
        >{{ operation.inviter_earned_by_transaction }} UAH</span
      >
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { roundUp } from '@/helpers/utils';

export default {
  name: 'NexAnalyticsItem',
  props: {
    operation: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(value) {
      return moment(value).format('kk:mm:ss - DD.MM.YYYY');
    },
    roundUpValue(value, fixed) {
      return roundUp(value, fixed);
    },
  },
};
</script>

<style scoped>
.item-lastest-operations__give {
  text-transform: uppercase;
}

.item-lastest-operations__image {
  display: block;
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
}

.item-lastest-operations__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
