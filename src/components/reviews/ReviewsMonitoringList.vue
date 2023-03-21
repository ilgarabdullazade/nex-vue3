<template>
  <div class="reviews__column">
    <h5 class="reviews__caption caption">
      {{ $t('reviews.monitoring') }}
    </h5>
    <div class="reviews__items">
      <nex-loading-component v-if="isLoading" />

      <nex-error-message v-if="error" :message="error" />

      <template v-if="reviews">
        <template v-if="reviews.count">
          <a
            v-for="review in reviews.results"
            target="_blank"
            :href="review.link"
            :key="review.link"
            class="review__image">
            <img
              :src="review.logo_image"
              :alt="review.name"
              :title="review.name" />
          </a>
        </template>
        <nex-empty-component
          key="empty"
          v-else
          :message="$t('common.empty_list', { name: $t('common.reviews') })" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';
import NexEmptyComponent from '@/components/Empty';

export default {
  name: 'NexReviewsMonitoringList',
  components: {
    NexLoadingComponent,
    NexErrorMessage,
    NexEmptyComponent,
  },
  computed: {
    ...mapState({
      reviews: (state) => state.reviews.reviewsMonitoring.data,
      isLoading: (state) => state.reviews.reviewsMonitoring.isLoading,
      error: (state) => state.reviews.reviewsMonitoring.error,
    }),
    locale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    ...mapActions({
      getReviewMonitoringList:
        'reviews/reviewsMonitoring/getReviewMonitoringList',
    }),
  },
  watch: {
    locale() {
      this.getReviewMonitoringList();
    },
  },
  mounted() {
    this.getReviewMonitoringList();
  },
};
</script>

<style scoped></style>
