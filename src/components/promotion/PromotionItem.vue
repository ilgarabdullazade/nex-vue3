<template>
  <div class="promotion__body">
    <div class="promotion__top top-promotion">
      <span v-if="promotion.new" class="top-promotion__type">new</span>
      <span class="top-promotion__date">{{
        formatDate(promotion.created_at)
      }}</span>
    </div>
    <div class="promotion__row">
      <div class="promotion__column">
        <div class="promotion__item">
          <div class="promotion__image">
            <img :src="promotion.image" :alt="promotion.slug" />
          </div>
          <div class="promotion__content">
            <div class="promotion__header">{{ promotion.title }}</div>
            <p v-if="showText" class="promotion__text">{{ promotion.text }}</p>
            <button @click="toggleText" type="button" class="promotion__link">
              {{
                showText
                  ? $t('promotions.item.hide')
                  : $t('promotions.item.more')
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
import { defaultDateFormat } from '@/helpers/utils';

export default {
  name: 'NexPromotionItem',
  data: () => {
    return {
      showText: false,
    };
  },
  props: {
    promotion: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(value) {
      return defaultDateFormat(value);
    },

    toggleText() {
      this.showText = !this.showText;
    },
  },
};
</script>

<style scoped>
.promotion__text {
  display: block;
}
.top-promotion__date {
  justify-self: flex-end;
  margin-left: auto;
}
</style>
