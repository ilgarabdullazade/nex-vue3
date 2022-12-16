<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__top">
        <div class="footer__item">
          <div class="footer__column">
            <router-link
              :to="$i18nRoute({ name: 'home' })"
              class="footer__logo logo">
              <img
                class="logo__text logo__text_big"
                src="@/assets/img/nex_logo_light.svg"
                alt="logo" />
              <img
                class="logo__light logo__text_big"
                src="@/assets/img/nex_logo_dark.svg"
                alt="logo" />
            </router-link>
            <p class="description">
              {{ $t('footer.description') }}
            </p>
          </div>
          <div class="footer__navigation">
            <div class="footer__contacts">
              <h3 class="heading">{{ $t('footer.contacts') }}</h3>
              <a href="mailto:support@nex.com" class="mail-link"
                >support@nex.com</a
              >
              <div class="social">
                <a href="#" target="_blank" class="social__link">
                  <img
                    class="social__telegram"
                    src="@/assets/img/social/telegram.svg"
                    alt="icon:telegram" />
                  <img
                    class="social__telegram-light"
                    src="@/assets/img/social/Telegram/Negative.svg"
                    alt="icon" />
                </a>
                <a href="#" target="_blank" class="social__link">
                  <img
                    class="social__instagram"
                    src="@/assets/img/social/instagram.svg"
                    alt="icon:instagram" />
                  <img
                    class="social__instagram-light"
                    src="@/assets/img/social/Instagram/Negative.svg"
                    alt="instagram" />
                </a>
                <a href="#" target="_blank" class="social__link">
                  <img
                    class="social__twitter"
                    src="@/assets/img/social/twitter.svg"
                    alt="icon:twitter" />
                  <img
                    class="social__twitter-light"
                    src="@/assets/img/social/Twitter/Negative.svg"
                    alt="icon:twitter" />
                </a>
              </div>
            </div>
            <nav class="footer__links links-footer">
              <h3 class="heading">{{ $t('footer.links.title') }}</h3>
              <ul class="links-footer__list">
                <li class="links-footer__item">
                  <router-link
                    :to="$i18nRoute({ name: 'contacts' })"
                    class="links-footer__link"
                    >{{ $t('footer.links.contacts') }}</router-link
                  >
                </li>
                <li class="links-footer__item">
                  <router-link
                    :to="$i18nRoute({ name: 'blog' })"
                    class="links-footer__link"
                    >{{ $t('footer.links.blog') }}</router-link
                  >
                </li>
                <li class="links-footer__item">
                  <router-link
                    :to="$i18nRoute({ name: 'faq' })"
                    class="links-footer__link"
                    >FAQs</router-link
                  >
                </li>
                <li class="links-footer__item">
                  <router-link
                    :to="$i18nRoute({ name: 'aml' })"
                    class="links-footer__link"
                    >AML / KYC</router-link
                  >
                </li>
                <li class="links-footer__item">
                  <router-link
                    :to="$i18nRoute({ name: 'policy' })"
                    class="links-footer__link"
                    >{{ $t('footer.links.policy') }}</router-link
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="lastest-blog">
          <h3 class="heading">{{ $t('footer.blog_news') }}</h3>
          <nex-loading-component v-if="isLoading" />

          <nex-error-message v-if="error" :message="error" />
          <template v-if="posts">
            <template v-if="posts.length">
              <div class="lastest-blog__row">
                <router-link
                  v-for="post in posts"
                  :key="post.slug"
                  :to="
                    $i18nRoute({
                      name: 'post',
                      params: { slug: post.slug },
                    })
                  "
                  class="lastest-blog__columns">
                  <div class="lastest-blog__item">
                    <div class="lastest-blog__image">
                      <img :src="post.image" :alt="post.slug" />
                    </div>
                    <p class="lastest-blog__text">
                      {{ post.title }}
                    </p>
                  </div>
                </router-link>
              </div>
            </template>

            <nex-empty-component
              v-else
              :message="
                $t('common.empty_list', { name: $t('common.articles') })
              " />
          </template>
        </div>
      </div>
      <div class="footer__bottom">
        <span class="copyright">Copyright © 2022 NEX</span>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from '@/network/axios';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';
import NexEmptyComponent from '@/components/Empty';

export default {
  name: 'NexFooter',
  components: {
    NexLoadingComponent,
    NexErrorMessage,
    NexEmptyComponent,
  },
  data: () => {
    return {
      posts: null,
      error: null,
      isLoading: null,
    };
  },
  methods: {
    async fetchPosts() {
      try {
        return await axios.get('/api/blog/posts_by_tags/', {
          params: {
            limit: 2,
          },
        });
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts().then((res) => {
      this.posts = res.data.results;
    });
  },
};
</script>

<style scoped>
.logo__text_big {
  width: auto !important;
}
</style>
