<template>
  <section class="faq">
    <div class="fap__container">
      <h1 class="faq__title title title_dark">
        {{ $t('faq.title') }}
      </h1>
      <h3 class="faq__topic topic">
        {{ $t('faq.caption') }}
      </h3>
      <nex-loading-component v-if="isLoading" />

      <nex-error-message v-if="error" :message="error" />

      <div v-if="faqs" class="spollers _spoller-init">
        <template v-if="faqs.count">
          <nex-faq-item
            v-for="(faq, index) in faqs.results"
            :key="index"
            :faq="faq" />
        </template>
        <nex-empty-component
          v-else
          :message="$t('common.empty_list', { name: $t('common.faqs') })" />
      </div>
      <nex-partners />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';
import NexEmptyComponent from '@/components/Empty';
import NexFaqItem from '@/components/FaqItem';
import NexPartners from '@/components/Partners';

export default {
  name: 'BonusView',
  components: {
    NexLoadingComponent,
    NexErrorMessage,
    NexEmptyComponent,
    NexFaqItem,
    NexPartners,
  },
  computed: {
    ...mapState({
      faqs: (state) => state.faq.data,
      isLoading: (state) => state.faq.isLoading,
      error: (state) => state.faq.error,
    }),
    locale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    ...mapActions({
      getFaqList: 'faq/getFaqList',
    }),
  },
  watch: {
    locale() {
      this.getFaqList();
    },
  },
  mounted() {
    this.getFaqList();
  },
};
</script>

<style scoped></style>
