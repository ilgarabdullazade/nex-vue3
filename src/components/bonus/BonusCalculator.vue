<template>
  <h3 class="bonus__heading heading">{{ $t('bonus.calculator.title') }}</h3>
  <p class="bonus__text">
    {{ $t('bonus.calculator.caption') }}
  </p>
  <div class="bonus__range range-bonus">
    <div class="range-bonus__item">
      <h6 class="range-bonus__topic topic">
        {{ $t('bonus.calculator.refferal_count') }}
      </h6>

      <span id="slider-span">{{ refferalCount }}</span>
      <div id="slider">
        <vue-slider
          v-model="refferalCount"
          v-bind="options"
          @drag-end="calculateBonus"
          :min="0"
          :max="2000" />
      </div>
    </div>
    <div class="range-bonus__item range-bonus__item_second">
      <h6 class="range-bonus__topic topic">
        {{ $t('bonus.calculator.monthly_average') }}
      </h6>
      <div class="range-bonus__currency">
        <span class="currency">$</span>
        <span id="slider2-span">{{ monthlyAverage }}</span>
      </div>
      <div id="slider2">
        <vue-slider
          v-model="monthlyAverage"
          v-bind="options"
          @drag-end="calculateBonus"
          :min="0"
          :max="300" />
      </div>
    </div>
    <div v-if="income" class="bonus__income income">
      <div class="income__link">
        <span class="income__text"> {{ $t('bonus.calculator.income') }}</span>
      </div>
      <span class="income__count">$ {{ income.value }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  name: 'NexBonusCalculator',
  components: {
    VueSlider,
  },
  data: () => {
    return {
      refferalCount: 1000,
      monthlyAverage: 100,
      options: {
        dotSize: 30,
        height: 12,
        interval: 1,
        tooltip: 'none',
      },
    };
  },
  computed: {
    ...mapState({
      income: (state) => state.bonus.data,
      isLoading: (state) => state.bonus.isLoading,
      error: (state) => state.bonus.error,
    }),
  },
  methods: {
    ...mapActions({
      getBonusCalculate: 'bonus/getBonusCalculate',
    }),
    calculateBonus() {
      this.getBonusCalculate({
        referral_number: this.refferalCount,
        price: this.monthlyAverage,
      });
    },
  },
  mounted() {
    this.calculateBonus();
  },
};
</script>

<style>
.vue-slider-process {
  background-color: #40474f !important;
}
.dark-mode .vue-slider-process {
  background-color: #e1e1e1 !important;
}

.vue-slider-rail {
  background: #f0f0f0 !important;
  border-radius: 40px !important;
}

.dark-mode .vue-slider-rail {
  background: #898989 !important;
}

.light-mode .vue-slider-dot-handle {
  background-color: #1e2329 !important;
}

.vue-slider-dot-handle-focus {
  box-shadow: none !important;
}
</style>
