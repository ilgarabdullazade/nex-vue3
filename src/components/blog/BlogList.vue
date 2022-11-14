<template>
  <div class="blog__body">
    <nex-loading-component v-if="isLoadingInit" />

    <nex-error-message v-if="errorInit" :message="errorInit" />

    <div v-if="posts" class="blog__content">
      <div class="blog__columns">
        <template v-if="posts.count">
          <div class="blog__column">
            <div class="blog__list">
              <nex-blog-item
                v-for="post in posts.results"
                :post="post"
                :key="post.slug"
                class="blog__item" />
            </div>
          </div>
        </template>
        <nex-empty-component
          v-else
          :message="$t('common.empty_list', { name: $t('common.articles') })" />
      </div>
      <button
        v-if="pagesCount > currentPage"
        @click="setNewPage"
        type="button"
        class="blog__more">
        <span>{{ $t('blog.more') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';
import NexEmptyComponent from '@/components/Empty';
import NexBlogItem from '@/components/blog/BlogItem';

export default {
  name: 'NexBlogList',
  components: {
    NexLoadingComponent,
    NexErrorMessage,
    NexEmptyComponent,
    NexBlogItem,
  },
  data: () => {
    return {
      currentPage: 1,
      pagesCount: 1,
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.blog.blogPostList.data,
      isLoadingInit: (state) => state.blog.blogPostList.isLoading,
      errorInit: (state) => state.blog.blogPostList.error,
    }),
    locale() {
      return this.$i18n.locale;
    },
    currentTag() {
      return this.$route.query.tags;
    },
  },
  methods: {
    ...mapActions({
      getPostList: 'blog/blogPostList/getPostList',
      getPostListOnInit: 'blog/blogPostList/getPostListOnInit',
    }),
    fetchPostsOnInit() {
      this.getPostListOnInit({
        tags: this.currentTag,
        page: 1,
      }).then((res) => {
        this.pagesCount = Math.ceil(res.data.count / 10);
      });
    },
    fetchNewPosts() {
      this.getPostList({
        tags: this.currentTag,
        page: this.currentPage,
      }).then((res) => {
        this.posts.results = [...this.posts.results, ...res.data.results];
      });
    },
    setNewPage() {
      if (this.pagesCount > this.currentPage) {
        this.currentPage++;
        this.fetchNewPosts();
      }
    },
  },
  watch: {
    locale() {
      this.fetchPostsOnInit();
      this.currentPage = 1;
    },
    currentTag() {
      this.fetchPostsOnInit();
      this.currentPage = 1;
    },
  },
  mounted() {
    this.fetchPostsOnInit();
  },
};
</script>

<style scoped>
.blog__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px -16px;
}
.blog__item {
  flex: 0 1 25%;
  padding: 0 8px;
  margin-bottom: 16px;
}
.blog__item:nth-child(10n + 1),
.blog__item:nth-child(10n + 6) {
  flex-basis: 50%;
}
@media (max-width: 61.5625em) {
  .blog__item {
    flex-basis: 33.33333% !important;
  }
}
@media (max-width: 47.999em) {
  .blog__item {
    flex-basis: 50% !important;
  }
}
@media (max-width: 29.999em) {
  .blog__item {
    flex-basis: 100% !important;
  }
}
</style>
