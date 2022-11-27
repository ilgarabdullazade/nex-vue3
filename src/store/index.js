import { createStore } from 'vuex';
import { notificationsStore } from '@/store/modules/notificationsStore';
import { accountStore } from '@/store/modules/account/accountStore';
import { authStore } from '@/store/modules/authStore';
import { blogStore } from '@/store/modules/blog/blogStore';
import { exchangerStore } from '@/store/modules/exchanger/exchangerStore';
import { bonusStore } from '@/store/modules/bonusStore';
import { promotionStore } from '@/store/modules/promotionStore';
import { reviewsStore } from '@/store/modules/reviews/reviewsStore';
import { adaptiveStore } from '@/store/modules/adaptiveStore';
import { faqStore } from '@/store/modules/faqStore';
import { whiteBitStore } from '@/store/modules/whiteBitStore';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    notifications: notificationsStore,
    auth: authStore,
    account: accountStore,
    blog: blogStore,
    exchanger: exchangerStore,
    bonus: bonusStore,
    promotion: promotionStore,
    reviews: reviewsStore,
    adaptive: adaptiveStore,
    faq: faqStore,
    whiteBit: whiteBitStore,
  },
});
