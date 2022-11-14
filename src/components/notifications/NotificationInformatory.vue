<template>
  <div class="notification__item item-notification">
    <div class="item-notification__inner">
      <div class="notification__image">
        <img src="@/assets/img/informatory.png" alt="informatory" />
      </div>
      <p class="item-notification__text">{{ text }}</p>
      <div class="item-notification__icon">
        <img src="@/assets/img/X.svg" alt="icon:close" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NexNotificationInformatory',
  emits: ['closeToast'],
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log(this.text);
  },
};
</script>
