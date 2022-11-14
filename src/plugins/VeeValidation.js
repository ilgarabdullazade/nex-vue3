import { defineRule, configure } from 'vee-validate';

import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import en from '@/validations/en.json';
import ru from '@/validations/ru.json';
import uk from '@/validations/uk.json';

export default {
  install() {
    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('confirmed', confirmed);
    defineRule('not_same', (value, [target]) => {
      if (value !== target) {
        return true;
      }
      return;
    });
    defineRule('credit_card', (value) => {
      if (value.length === 19) {
        return true;
      }
      return;
    });
    configure({
      generateMessage: localize({
        en,
        ru,
        uk,
      }),
      validateOnBlur: false,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
