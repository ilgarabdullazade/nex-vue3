<template>
  <div class="error-block">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'NexErrorMessage',
  props: {
    message: {
      type: String,
      default: 'Something went wrong',
    },
  },
};
</script>

<style scoped>
.error-block {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
</style>
