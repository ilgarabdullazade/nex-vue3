<template>
  <li class="item-lastest-operations">
    <div class="item-lastest-operations__top">
      <span class="item-lastest-operations__date">{{
        formatDate(transaction.created_at)
      }}</span>
      <div
        v-if="transaction.complete"
        class="item-lastest-operations__status-approve">
        {{ $t('account.operations_history.item.paid') }}
      </div>
      <div v-else class="item-lastest-operations__status">
        {{ $t('account.operations_history.item.awaiting') }}
      </div>
    </div>
    <div class="item-lastest-operations__info">
      <div
        class="item-lastest-operations__column item-lastest-operations__column_first">
        <div class="item-lastest-operations__type">
          <span class="item-lastest-operations__give">{{
            $t('main.give')
          }}</span>
          <div class="item-lastest-operations__inner">
            <div class="item-lastest-operations__image">
              <img
                :src="transaction.currency_exchange.image_icon"
                :alt="transaction.currency_exchange.name" />
            </div>
            <span class="item-lastest-operations__method">{{
              transaction.currency_exchange.name
            }}</span>
          </div>
        </div>
        <div class="item-lastest-operations__count">
          <span class="item-lastest-operations__label">{{
            $t('main.sum')
          }}</span>
          <span class="item-lastest-operations__text"
            >{{ roundUpValue(transaction.amount_exchange, 6) }}
            {{ transaction.currency_exchange.name_from_white_bit }}</span
          >
        </div>
        <div class="item-lastest-operations__details">
          <span class="item-lastest-operations__label">{{
            $t('main.from_account')
          }}</span>
          <span class="item-lastest-operations__text">{{
            transaction.address_from
              ? transaction.address_from
              : $t('account.operations_history.item.is_hidden')
          }}</span>
        </div>
      </div>
      <div
        class="item-lastest-operations__column item-lastest-operations__column_second">
        <div class="item-lastest-operations__type">
          <span class="item-lastest-operations__give">{{
            $t('main.getting')
          }}</span>
          <div class="item-lastest-operations__inner">
            <div class="item-lastest-operations__image">
              <img
                :src="transaction.currency_received.image_icon"
                :alt="transaction.currency_received.name" />
            </div>
            <span class="item-lastest-operations__method">{{
              transaction.currency_received.name_from_white_bit
            }}</span>
          </div>
        </div>
        <div class="item-lastest-operations__count">
          <span class="item-lastest-operations__label">{{
            $t('main.sum')
          }}</span>
          <span class="item-lastest-operations__text"
            >{{ roundUpValue(transaction.amount_real_received, 6) }}
            {{ transaction.currency_received.name_from_white_bit }}</span
          >
        </div>
        <div class="item-lastest-operations__details">
          <span class="item-lastest-operations__label">{{
            $t('main.on_account')
          }}</span>
          <span class="item-lastest-operations__text">{{
            transaction.address_to
          }}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import moment from 'moment';
import { roundUp } from '@/helpers/utils';

export default {
  name: 'NexOperationItem',
  props: {
    transaction: {
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
