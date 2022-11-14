<template>
  <div class="empty-block">{{ message }}</div>
</template>

<script>
export default {
  name: 'NexEmptyComponent',
  props: {
    message: {
      type: String,
      default: 'Nothing found',
    },
  },
};
</script>

<style scoped>
.empty-block {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
</style>
