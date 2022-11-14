<template>
  <nav class="blog__menu menu-blog">
    <nex-loading-component v-if="isLoading" />

    <nex-error-message v-if="error" :message="error" />

    <ul v-if="tags" class="menu-blog__list">
      <template v-if="tags.count">
        <li class="menu-blog__item">
          <router-link
            :to="{ name: 'blog' }"
            class="menu-blog__link"
            v-slot="{ route }">
            <span
              :class="{
                'menu-blog__link_active': $route.fullPath === route.fullPath,
              }"
              >All</span
            >
          </router-link>
        </li>
        <li v-for="tag in tags.results" :key="tag" class="menu-blog__item">
          <router-link
            :to="{ name: 'blog', query: { tags: tag.name } }"
            class="menu-blog__link"
            v-slot="{ route }">
            <span
              :class="{
                'menu-blog__link_active': $route.fullPath === route.fullPath,
              }"
              >{{ tag.name }}</span
            >
          </router-link>
        </li>
      </template>
      <nex-empty-component
        v-else
        :message="$t('common.empty_list', { name: $t('common.tags') })" />
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NexLoadingComponent from '@/components/Loading';
import NexErrorMessage from '@/components/ErrorMessage';
import NexEmptyComponent from '@/components/Empty';

export default {
  name: 'NexBlogTags',
  components: {
    NexLoadingComponent,
    NexErrorMessage,
    NexEmptyComponent,
  },
  computed: {
    ...mapState({
      tags: (state) => state.blog.blogTags.data,
      isLoading: (state) => state.blog.blogTags.isLoading,
      error: (state) => state.blog.blogTags.error,
    }),
    locale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    ...mapActions({
      getTags: 'blog/blogTags/getTags',
    }),
  },
  watch: {
    locale() {
      this.getTags();
    },
  },
  mounted() {
    this.getTags();
  },
};
</script>

<style scoped></style>
