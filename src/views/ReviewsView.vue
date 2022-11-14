<template>
  <section class="reviews">
    <div class="reviews__container">
      <h1 class="reviews__title title">
        {{ $t('reviews.title') }}
      </h1>
      <h6 class="reviews__topic topic">
        {{ $t('reviews.caption') }}
      </h6>
      <div class="reviews__inner">
        <nex-reviews-monitoring-list />
        <nex-reviews-forum-list />
      </div>
      <nex-partners />
    </div>
  </section>
</template>

<script>
import NexReviewsMonitoringList from '@/components/reviews/ReviewsMonitoringList';
import NexReviewsForumList from '@/components/reviews/ReviewsForumList';
import NexPartners from '@/components/Partners';

export default {
  name: 'ReviewsView',
  components: {
    NexReviewsMonitoringList,
    NexReviewsForumList,
    NexPartners,
  },
};
</script>

<style scoped></style>
