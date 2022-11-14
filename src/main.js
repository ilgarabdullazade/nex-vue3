import { createApp } from 'vue';
import VueSocialSharing from 'vue-social-sharing';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { i18n } from '@/i18n';
import { Trans } from '@/plugins/Translation';
import VeeValidation from '@/plugins/VeeValidation';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.config.globalProperties.$i18nRoute = Trans.i18nRoute.bind(Trans);

app
  .use(i18n)
  .use(store)
  .use(router)
  .use(VueSocialSharing)
  .use(VeeValidation)
  .use(Toast, {
    timeout: 2000,
    icon: false,
    closeButton: false,
  })
  .mount('#app');
