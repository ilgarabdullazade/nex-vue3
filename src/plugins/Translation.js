import axios from 'axios';
import { i18n } from '@/i18n';
import { getItem, setItem } from '@/helpers/persistanceStorage';
import { setLocale } from '@vee-validate/i18n';

const Trans = {
  get defaultLocale() {
    return getItem('locale') ?? process.env.VUE_APP_I18N_LOCALE;
  },
  get supportedLocales() {
    return process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(', ');
  },
  get currentLocale() {
    return i18n.global.locale;
  },
  set currentLocale(locale) {
    i18n.global.locale = locale;
  },
  getUserSupportedLocale() {
    const userPreferredLocale = Trans.getUserLocale();

    if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale;
    }

    if (Trans.isLocaleSupported(userPreferredLocale.localeNoISO)) {
      return userPreferredLocale.localeNoISO;
    }
    return Trans.defaultLocale;
  },
  getUserLocale() {
    const locale =
      window.navigator.language ||
      window.navigator.userLanguage ||
      Trans.defaultLocale;
    return {
      locale: locale,
      localeNoISO: locale.split('-')[0],
    };
  },
  setI18nLocaleInServices(locale) {
    Trans.currentLocale = locale;
    setItem('locale', locale);
    setLocale(locale);
    axios.defaults.headers.common['Accept-Language'] = locale;
    document.querySelector('html').setAttribute('lang', locale);
    return locale;
  },
  async changeLocale(locale) {
    if (!Trans.isLocaleSupported(locale))
      return Promise.reject(new Error('Locale not supported'));
    if (i18n.locale === locale) return Promise.resolve(locale);
    return Trans.setI18nLocaleInServices(locale);
  },
  isLocaleSupported(locale) {
    return Trans.supportedLocales.includes(locale);
  },
  routeMiddleware(to, from, next) {
    const locale = to.params.locale;
    if (!Trans.isLocaleSupported(locale))
      return next(Trans.getUserSupportedLocale());
    return Trans.changeLocale(locale).then(() => next());
  },
  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: this.currentLocale,
        ...to.params,
      },
    };
  },
};

export { Trans };
