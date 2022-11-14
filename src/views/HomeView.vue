<template>
  <div class="content">
    <section class="exchange">
      <nex-exchanger-form v-if="step === 1" @setStep="changeStep" />
      <nex-exchanger-confirmation @setStep="changeStep" :step="step" v-else />
    </section>
    <div class="content__icon">
      <img src="@/assets/img/Icon_HelpChat.svg" alt="icon:help chat" />
    </div>
    <nex-partners />
  </div>
</template>

<script>
import NexPartners from '@/components/Partners';
import NexExchangerForm from '@/components/home/ExchangerForm';
import NexExchangerConfirmation from '@/components/home/ExchangerConfirmation';

export default {
  name: 'HomeView',
  components: {
    NexPartners,
    NexExchangerForm,
    NexExchangerConfirmation,
  },
  data: () => {
    return {
      step: 1,
    };
  },
  methods: {
    changeStep(step) {
      this.step = step;
    },
  },
};
</script>
