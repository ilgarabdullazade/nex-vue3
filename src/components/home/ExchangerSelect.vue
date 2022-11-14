<template>
  <div class="select select_form-1 _select-active">
    <div class="select__body">
      <button type="button" class="select__title" @click="isHidden = !isHidden">
        <span class="select__value">
          <span class="select__content form__card">
            <span class="select__row">
              <span class="select__asset">
                <img
                  v-if="mainOption.image_icon"
                  :src="mainOption.image_icon" />
                <img v-else src="@/assets/img/star.png" />
              </span>
              <span class="select__text">{{ mainOption.name }}</span>
            </span>
          </span>
        </span>
      </button>
      <div class="select__options" :hidden="isHidden">
        <template v-for="currency in currencyList" :key="currency.id">
          <button
            v-if="
              currency.id !== mainOption.id && currency.id !== otherOption.id
            "
            @click="switchCurrency(currency)"
            class="select__option form__card"
            type="button">
            <span class="select__row">
              <span class="select__asset">
                <img v-if="currency.image_icon" :src="currency.image_icon" />
                <img v-else src="@/assets/img/star.png" />
              </span>
              <span class="select__text">{{ currency.name }}</span>
            </span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NexEchangerSelect',
  props: {
    currencyList: {
      type: Array,
      required: true,
    },
    mainOption: {
      type: Object,
      required: true,
    },
    otherOption: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      isHidden: true,
    };
  },
  methods: {
    switchCurrency(currency) {
      this.$emit('setCurrency', currency);
      this.isHidden = true;
    },
  },
  watch: {
    currencyList() {
      this.isHidden = true;
    },
  },
};
</script>

<style scoped>
.select__asset {
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
}
.select__asset img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.select__text {
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 115px;
  overflow: hidden;
  min-width: 40px;
}
</style>
