<template>
  <section class="promotion">
    <div class="promotion__container">
      <h1 class="promotion__title title title_dark">
        {{ $t('promotions.title') }}
      </h1>
      <h6 class="promotion__topic topic">{{ $t('promotions.caption') }}</h6>
      <nex-promotion-list />
      <nex-partners />
    </div>
  </section>
</template>

<script>
import NexPromotionList from '@/components/promotion/PromotionList';
import NexPartners from '@/components/Partners';

export default {
  name: 'BonusView',
  components: {
    NexPromotionList,
    NexPartners,
  },
};
</script>

<style scoped></style>
