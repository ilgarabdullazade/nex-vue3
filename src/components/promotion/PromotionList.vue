<template>
  <div class="promotion__items">
    <nex-loading-component v-if="isLoading" />

    <nex-error-message v-if="error" :message="error" />

    <template v-if="promotions">
      <template v-if="promotions.count">
        <nex-promotion-item
          v-for="promotion in promotions.results"
          :promotion="promotion"
          :key="promotion.slug" />
      </template>
      <nex-empty-component
        v-else
        :message="$t('common.empty_list', { name: $t('common.promotions') })" />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';
import NexEmptyComponent from '@/components/Empty';
import NexPromotionItem from '@/components/promotion/PromotionItem';

export default {
  name: 'NexBlogList',
  components: {
    NexLoadingComponent,
    NexErrorMessage,
    NexEmptyComponent,
    NexPromotionItem,
  },
  computed: {
    ...mapState({
      promotions: (state) => state.promotion.data,
      isLoading: (state) => state.promotion.isLoading,
      error: (state) => state.promotion.error,
    }),
    locale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    ...mapActions({
      getPromotionList: 'promotion/getPromotionList',
    }),
  },
  watch: {
    locale() {
      this.getPromotionList();
    },
  },
  mounted() {
    this.getPromotionList();
  },
};
</script>

<style scoped>
.blog__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px -16px;
}
.blog__item {
  flex: 0 1 25%;
  padding: 0 8px;
  margin-bottom: 16px;
}
.blog__item:nth-child(1),
.blog__item:nth-child(6) {
  flex-basis: 50%;
}
@media (max-width: 61.5625em) {
  .blog__item {
    flex-basis: 33.33333% !important;
  }
}
@media (max-width: 47.999em) {
  .blog__item {
    flex-basis: 50% !important;
  }
}
@media (max-width: 29.999em) {
  .blog__item {
    flex-basis: 100% !important;
  }
}
</style>
