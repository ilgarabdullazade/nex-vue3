<template>
  <div class="loading-block">{{ $t('common.loading') }}</div>
</template>

<script>
export default {
  name: 'NexLoadingComponent',
};
</script>

<style scoped>
.loading-block {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
</style>
