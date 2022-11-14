<template>
  <input ref="inputRef" type="text" />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input';
import { watch } from 'vue';
export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef, setValue } = useCurrencyInput({
      ...props.options,
      currency: 'USD',
      currencyDisplay: 'hidden',
      precision: {
        min: 1,
        max: 6,
      },
      hideCurrencySymbolOnFocus: true,
      hideGroupingSeparatorOnFocus: true,
      hideNegligibleDecimalDigitsOnFocus: true,
      autoDecimalDigits: false,
      useGrouping: true,
      accountingSign: false,
    });

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );
    return { inputRef };
  },
};
</script>
