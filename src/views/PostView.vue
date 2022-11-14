<template>
  <section class="blog-inner">
    <div class="blog-inner__container">
      <div class="blog-inner__navigation">
        <button
          @click="this.$router.push({ name: 'blog' })"
          class="blog-inner__button">
          <img
            class="blog-inner__icon blog-inner__icon_light"
            src="@/assets/img/blog/prev-arrow.svg"
            alt="icon" />
          <img
            class="blog-inner__icon blog-inner__icon_dark"
            src="@/assets/img/arrow-dark-mode.svg"
            alt="icon" />
          <span> {{ $t('header.blog') }}</span>
        </button>
        <div v-if="post" class="buttons">
          <router-link
            v-if="post.previous_slug"
            :to="{ name: 'post', params: { slug: post.previous_slug } }"
            class="buttons__previos">
            <img
              class="buttons__icon-light"
              src="@/assets/img/blog/prev-arrow.svg"
              alt="icon" />
            <img
              class="buttons__icon-dark"
              src="@/assets/img/arrow-dark-mode.svg"
              alt="icon" />
          </router-link>
          <span v-else class="buttons__previos disabled">
            <img
              class="buttons__icon-light"
              src="@/assets/img/blog/prev-arrow.svg"
              alt="icon" />
            <img
              class="buttons__icon-dark"
              src="@/assets/img/arrow-dark-mode.svg"
              alt="icon" />
          </span>
          <router-link
            v-if="post.next_slug"
            :class="{ disabled: !post.next_slug }"
            :to="{ name: 'post', params: { slug: post.next_slug } }"
            class="buttons__next">
            <img
              class="buttons__icon-light"
              src="@/assets/img/blog/next-arrow.svg"
              alt="icon" />
            <img
              class="buttons__icon-dark"
              src="@/assets/img/arrow-dark-mode-right.svg"
              alt="icon" />
          </router-link>
          <span v-else class="buttons__next disabled">
            <img
              class="buttons__icon-light"
              src="@/assets/img/blog/next-arrow.svg"
              alt="icon" />
            <img
              class="buttons__icon-dark"
              src="@/assets/img/arrow-dark-mode-right.svg"
              alt="icon" />
          </span>
        </div>
      </div>

      <nex-loading-component v-if="isLoading" />

      <nex-error-message v-if="error" :message="error" />

      <template v-if="post">
        <h5 class="blog-inner__caption caption">
          {{ post.title }}
        </h5>
        <div class="blog-inner__image">
          <img :src="post.image" :alt="post.slug" />
        </div>
        <div class="blog-inner__info">
          <span class="blog-inner__hour">
            {{ post.minutes_for_reading }} {{ $t('blog.mins') }}</span
          >
          <span class="blog-inner__date">{{ formatDate(post.created) }}</span>
        </div>

        <div class="blog-inner__content">
          <p class="blog-inner__text">
            {{ post.text }}
          </p>
          <div class="blog-inner__share share-inner-blog">
            <button
              @click="copyPostUrl(`http://localhost:8080${$route.fullPath}`)"
              class="share-inner-blog__link">
              Поделиться статьей
            </button>
            <div class="share-inner-blog__icons">
              <button
                @click="copyPostUrl(`http://localhost:8080${$route.fullPath}`)"
                class="share-inner-blog__copy">
                <img src="@/assets/img/blog/Chain.svg" alt="icon" />
              </button>
              <ShareNetwork
                network="twitter"
                :url="`http://localhost:8080${$route.fullPath}`"
                :title="post.title">
                <img src="@/assets/img/blog/telegram.svg" alt="icon:telegram" />
              </ShareNetwork>
              <ShareNetwork
                network="facebook"
                :url="`http://localhost:8080${$route.fullPath}`"
                :title="post.title"
                :description="post.description">
                <img src="@/assets/img/blog/facebook.svg" alt="icon:facebook" />
              </ShareNetwork>
            </div>
          </div>
        </div>
        <nex-post-slider :slides="post.recommendation" />
      </template>
      <nex-partners />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { copyURL, defaultDateFormat } from '@/helpers/utils';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';
import NexPostSlider from '@/components/post/PostSlider';
import NexPartners from '@/components/Partners';

export default {
  name: 'PostView',
  components: {
    NexLoadingComponent,
    NexErrorMessage,
    NexPostSlider,
    NexPartners,
  },
  computed: {
    ...mapState({
      post: (state) => state.blog.blogPost.data,
      isLoading: (state) => state.blog.blogPost.isLoading,
      error: (state) => state.blog.blogPost.error,
    }),
    locale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    ...mapActions({
      getPost: 'blog/blogPost/getPost',
      showInfo: 'notifications/showInfo',
    }),
    formatDate(value) {
      return defaultDateFormat(value);
    },
    copyPostUrl(text) {
      copyURL(text).then(() =>
        this.showInfo(this.$t('account.analytics.statistics.copied'))
      );
    },
  },
  watch: {
    locale() {
      this.getPost(this.$route.params.slug);
    },
    '$route.params.slug': {
      handler() {
        if (this.$route.params.slug) this.getPost(this.$route.params.slug);
      },
    },
  },
  mounted() {
    this.getPost(this.$route.params.slug);
  },
};
</script>

<style scoped></style>
