<template>
  <div class="data-confirmation__item item-data-confirmation">
    <div v-if="showData" class="item-data-confirmation__top">
      <span class="transfer">{{
        isGive ? $t('main.give') : $t('main.getting')
      }}</span>
      <span class="method">
        <div class="method__image">
          <img :src="currency.image_icon" alt="icon" />
        </div>
        <span class="method__text">{{ currency.name }}</span>
      </span>
    </div>
    <div
      class="item-data-confirmation__column item-data-confirmation__column_first">
      <h5 class="item-data-confirmation__caption caption">
        {{ $t('main.sum') }}
      </h5>
      <span class="item-data-confirmation__detail"
        >{{ amount }} {{ currency.name_from_white_bit }}</span
      >
    </div>
    <div v-if="account" class="item-data-confirmation__column">
      <h5 class="item-data-confirmation__caption caption">
        {{ isGive ? $t('main.from_account') : $t('main.on_account') }}
      </h5>
      <span class="item-data-confirmation__detail">{{ account }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NexExchangeConfirmationItem',
  props: {
    showData: {
      type: Boolean,
      default: true,
    },
    isGive: {
      type: Boolean,
      required: true,
    },
    currency: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    account: {
      required: true,
    },
  },
};
</script>

<style scoped>
.method__image {
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
}

.method__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-data-confirmation__detail {
  word-break: break-all;
}
.transfer {
  margin-right: 30px;
}
.method {
  max-width: 210px;
}
</style>
