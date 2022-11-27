import { createRouter, createWebHistory } from 'vue-router';
import { Trans } from '@/plugins/Translation';
import { getItem } from '@/helpers/persistanceStorage';

const routes = [
  {
    path: '/:locale',
    component: () => import('../views/MainShellView.vue'),
    beforeEnter: Trans.routeMiddleware,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: 'blog',
        name: 'blog',
        component: () => import('../views/BlogView.vue'),
      },
      {
        path: 'blog/:slug',
        name: 'post',
        component: () => import('../views/PostView.vue'),
      },
      {
        path: 'bonus',
        name: 'bonus',
        component: () => import('../views/BonusView.vue'),
      },
      {
        path: 'promotion',
        name: 'promotion',
        component: () => import('../views/PromotionsView.vue'),
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: () => import('../views/ContactsView.vue'),
      },
      {
        path: 'reviews',
        name: 'reviews',
        component: () => import('../views/ReviewsView.vue'),
      },
      {
        path: 'personal-area',
        name: 'personalArea',
        component: () => import('../views/PersonalAreaView.vue'),
        beforeEnter: (to, _, next) => {
          to.path !== '/:locale/home' && !getItem('accessToken')
            ? next({ path: '/:locale/home' })
            : next();
        },
        redirect: { name: 'operations' },
        children: [
          {
            path: 'operations',
            name: 'operations',
            component: () => import('../views/OperationsView.vue'),
          },
          {
            path: 'security',
            name: 'security',
            component: () => import('../views/SecurityView.vue'),
          },
          {
            path: 'analytics',
            name: 'analytics',
            component: () => import('../views/AnalyticsView.vue'),
          },
        ],
      },
      {
        path: 'faq',
        name: 'faq',
        component: () => import('../views/FaqView.vue'),
      },
      {
        path: 'aml-policy',
        name: 'aml',
        component: () => import('../views/AmlView.vue'),
      },
      {
        path: 'privacy-policy',
        name: 'policy',
        component: () => import('../views/PolicyView.vue'),
      },
    ],
  },
  {
    path: '/whiteBIT-verification',
    name: 'whiteBit',
    component: () => import('../views/WhiteBitView.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect() {
      return Trans.defaultLocale;
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

export default router;
