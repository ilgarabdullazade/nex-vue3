<template>
  <h1 class="referral__title title">{{ $t('account.analytics.title') }}</h1>
  <h6 class="referral__topic topic">
    {{ $t('account.analytics.caption') }}
  </h6>
  <nex-analytics-card />
  <nex-analytics-list />
</template>

<script>
import NexAnalyticsCard from '@/components/account/analytics/AnalyticsCard';
import NexAnalyticsList from '@/components/account/analytics/AnalyticsList';

export default {
  name: 'AnalyticsView',
  components: {
    NexAnalyticsCard,
    NexAnalyticsList,
  },
};
</script>

<style scoped></style>
