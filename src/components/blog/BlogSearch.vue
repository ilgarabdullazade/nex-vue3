<template>
  <div class="blog__search-form form-search-blog">
    <button @click="fetchSearchPosts" class="form-search-blog__button">
      <img
        class="form-search-blog__button_dark"
        src="@/assets/img/Search.svg"
        alt="icon:search" />
      <img
        class="form-search-blog__button_light"
        src="@/assets/img/search-light.svg"
        alt="icon" />
    </button>
    <input
      v-model="search"
      id="form-search-blog__input"
      type="text"
      :placeholder="$t('blog.search')"
      class="form-search-blog__input form-search-blog__input_color input" />
    <button
      v-if="search"
      @click="search = ''"
      type="button"
      class="form-search-blog__delete">
      <img src="@/assets/img/X.svg" alt="icon" />
    </button>
    <button @click="toggleBlogMenu" type="button" class="blog__icon">
      <img
        class="blog__icon-dark"
        src="@/assets/img/blog/config.svg"
        alt="icon" />
      <img
        class="blog__icon-light"
        src="@/assets/img/filter-light.png"
        alt="icon" />
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NexBlogSearch',
  data: () => {
    return {
      search: '',
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    currentTag() {
      return this.$route.query.tags;
    },
  },
  methods: {
    ...mapActions({
      searchPosts: 'blog/blogPostList/searchPosts',
    }),
    toggleBlogMenu() {
      this.menuIsOpen = false;
      this.signInIsOpen = !this.signInIsOpen;
      document.body.className = this.signInIsOpen ? 'lock blog-open' : '';
    },
    fetchSearchPosts() {
      this.searchPosts({ text: this.search, page: 1 });
    },
  },
};
</script>

<style scoped>
.form-search-blog__delete {
  display: block;
}
</style>
