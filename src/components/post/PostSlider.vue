<template>
  <h6 class="blog-inner__topic topic">Так же вам может понравится</h6>
  <swiper
    class="blog-inner__slider"
    :modules="modules"
    :breakpoints="breakpoints"
    :slides-per-view="4"
    :auto-height="true"
    :space-between="16"
    navigation>
    <swiper-slide v-for="slide in slides" :key="slide.slug">
      <router-link
        :to="{ name: 'post', params: { slug: slide.slug } }"
        class="slide-inner-blog">
        <div class="slide-inner-blog__content">
          <div class="slide-inner-blog__image">
            <img :src="slide.image" :alt="slide.slug" />
          </div>
          <p class="slide-inner-blog__text">
            {{ slide.title }}
          </p>
          <div class="blog-inner__info">
            <span class="blog-inner__hour"
              >{{ slide.minutes_for_reading }} {{ $t('blog.mins') }}</span
            >
            <span class="blog-inner__date">{{
              formatDate(slide.created)
            }}</span>
          </div>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue';

import { defaultDateFormat } from '@/helpers/utils';

export default {
  name: 'NexPostSlider',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    slides: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(value) {
      return defaultDateFormat(value);
    },
  },
  setup() {
    return {
      modules: [Navigation],
      breakpoints: {
        320: {
          slidesPerView: 2.2,
          spaceBetween: 8,
          autoHeight: true,
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        1268: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
      },
    };
  },
};
</script>

<style scoped></style>
