import { useToast } from 'vue-toastification';
import NexNotificationDanger from '@/components/notifications/NotificationDanger';
import NexNotificationSuccess from '@/components/notifications/NotificationSuccess';
import NexNotificationInformatory from '@/components/notifications/NotificationInformatory';
import NexNotificationWarning from '@/components/notifications/NotificationWarning';

const toast = useToast();

export const notificationsStore = {
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    showSuccess(_, text) {
      toast({
        component: NexNotificationSuccess,
        props: {
          text: text,
        },
      });
    },
    showDanger(_, text) {
      toast({
        component: NexNotificationDanger,
        props: {
          text: text,
        },
      });
    },
    showInfo(_, text) {
      toast({
        component: NexNotificationInformatory,
        props: {
          text: text,
        },
      });
    },
    showWarning(_, text) {
      toast({
        component: NexNotificationWarning,
        props: {
          text: text,
        },
      });
    },
  },
  namespaced: true,
};
