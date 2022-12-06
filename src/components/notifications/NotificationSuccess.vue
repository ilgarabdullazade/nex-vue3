<template>
  <div class="notification__item item-notification">
    <div class="item-notification__inner">
      <div class="notification__image">
        <img src="@/assets/img/success.png" alt="success" />
      </div>
      <p class="item-notification__text item-notification__text_green">
        {{ text }}
      </p>
      <div class="item-notification__icon">
        <img src="@/assets/img/X.svg" alt="icon:close" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NexNotificationSuccess',
  emits: ['closeToast'],
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
