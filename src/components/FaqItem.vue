<template>
  <div class="spollers__item">
    <button
      @click="isOpen = !isOpen"
      :class="{ '_spoller-active': isOpen }"
      type="button"
      class="spollers__title">
      {{ faq.question }}
    </button>

    <collapse-transition>
      <div v-show="isOpen" class="spollers__body">
        {{ faq.answer }}
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import CollapseTransition from '@/components/UI/CollapseTransition';

export default {
  name: 'NexFaqItem',
  components: {
    CollapseTransition,
  },
  data: () => {
    return {
      isOpen: false,
    };
  },
  props: {
    faq: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
