<template>
  <section class="bonus">
    <div class="bonus__container">
      <h1 class="bonus__title title">{{ $t('bonus.title') }}</h1>
      <h6 class="bonus__topic topic">
        {{ $t('bonus.caption') }}
      </h6>
      <div class="bonus__row">
        <div class="bonus__item item-bonus">
          <div class="item-bonus__image">
            <picture
              ><source srcset="@/assets/img/bonus/01.webp" type="image/webp" />
              <img
                class="item-bonus__image_light"
                src="@/assets/img/bonus/01.png"
                alt="image"
            /></picture>
            <picture
              ><source
                srcset="@/assets/img/bonus/01-light.webp"
                type="image/webp" />
              <img
                class="item-bonus__image_dark"
                src="@/assets/img/bonus/01-light.png"
                alt="image"
            /></picture>
          </div>
          <h5 class="item-bonus__caption caption">
            {{ $t('bonus.register.title') }}
          </h5>
          <p class="item-bonus__text">
            {{ $t('bonus.register.caption') }}
          </p>
        </div>
        <!--  -->
        <div class="bonus__item item-bonus">
          <div class="item-bonus__image">
            <picture
              ><source srcset="@/assets/img/bonus/02.webp" type="image/webp" />
              <img
                class="item-bonus__image_light"
                src="@/assets/img/bonus/02.png"
                alt="image"
            /></picture>
            <picture
              ><source
                srcset="@/assets/img/bonus/02.light.webp"
                type="image/webp" />
              <img
                class="item-bonus__image_dark"
                src="@/assets/img/bonus/02.light.png"
                alt="image"
            /></picture>
          </div>
          <h5 class="item-bonus__caption caption">
            {{ $t('bonus.share.title') }}
          </h5>
          <p class="item-bonus__text">
            {{ $t('bonus.share.caption') }}
          </p>
        </div>
        <!--  -->
        <div class="bonus__item item-bonus">
          <div class="item-bonus__image">
            <picture
              ><source srcset="@/assets/img/bonus/03.webp" type="image/webp" />
              <img
                class="item-bonus__image_light"
                src="@/assets/img/bonus/03.png"
                alt="image"
            /></picture>
            <picture
              ><source
                srcset="@/assets/img/bonus/03-light.webp"
                type="image/webp" />
              <img
                class="item-bonus__image_dark"
                src="@/assets/img/bonus/03-light.png"
                alt="image"
            /></picture>
          </div>
          <h5 class="item-bonus__caption caption">
            {{ $t('bonus.income.title') }}
          </h5>
          <p class="item-bonus__text">
            {{ $t('bonus.income.caption') }}
          </p>
        </div>
        <!--  -->
        <div class="bonus__button">
          <button
            @click="copyReferralUrl"
            type="button"
            class="button button_long-text">
            {{ $t('bonus.get_refferal') }}
          </button>
        </div>
      </div>
      <nex-bonus-calculator />
    </div>
    <nex-partners />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { copyURL } from '@/helpers/utils';
import { $vfm } from 'vue-final-modal';
import NexBonusCalculator from '@/components/bonus/BonusCalculator';
import NexPartners from '@/components/Partners';

export default {
  name: 'BonusView',
  components: {
    NexBonusCalculator,
    NexPartners,
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
  },
  methods: {
    ...mapActions({
      showInfo: 'notifications/showInfo',
    }),
    copyReferralUrl() {
      if (this.currentUser) {
        copyURL(this.currentUser.referral_url).then(() =>
          this.showInfo(this.$t('common.copied'))
        );
      } else {
        $vfm.show('login-modal');
      }
    },
  },
};
</script>

<style scoped></style>
