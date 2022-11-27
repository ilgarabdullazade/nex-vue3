<template>
  <pre>{{ data }}</pre>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'WhiteBitView',
  computed: {
    ...mapState({
      data: (state) => state.whiteBit.data,
      isLoading: (state) => state.whiteBit.isLoading,
      error: (state) => state.whiteBit.error,
    }),
  },
  methods: {
    ...mapActions({
      whiteBitVerification: 'whiteBit/whiteBitVerification',
    }),
  },
  mounted() {
    this.whiteBitVerification();
  },
};
</script>

<style scoped></style>
