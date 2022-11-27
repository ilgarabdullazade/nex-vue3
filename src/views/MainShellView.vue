<template>
  <nex-header />
  <main class="page page_light">
    <router-view />
  </main>
  <nex-footer />
  <nex-auth-modals />
</template>

<script>
import NexHeader from '@/components/header/Header';
import NexFooter from '@/components/Footer';
import NexAuthModals from '@/components/auth/AuthModals';

export default {
  name: 'App',
  components: {
    NexHeader,
    NexFooter,
    NexAuthModals,
  },
};
</script>

<style>
body.blog-open::before {
  content: '';
  background: rgba(17, 19, 25, 0.65);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 55;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.light-mode .Vue-Toastification__toast--default {
  background: #fff;
}
.dark-mode .Vue-Toastification__toast--default {
  background: #404048;
}
.Vue-Toastification__toast {
  padding: 0 !important;
}
.light-mode .Vue-Toastification__progress-bar {
  background-color: #404048;
}
</style>
