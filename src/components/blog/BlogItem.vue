<template>
  <router-link :to="{ name: 'post', params: { slug: post.slug } }">
    <div class="item-blog-column">
      <div class="item-blog-column__top">
        <span
          v-for="tag in post.tags"
          :key="tag.name"
          class="item-blog-column__category">
          <span>#{{ tag.name }}</span>
        </span>
      </div>
      <div class="item-blog-column__content">
        <div class="item-blog-column__image">
          <img :src="post.image" :alt="post.slug" />
        </div>
        <p class="item-blog-column__text">
          {{ post.title }}
        </p>
        <div class="item-blog-column__info">
          <span class="item-blog-column__hour">
            {{ post.minutes_for_reading }} {{ $t('blog.mins') }}</span
          >
          <span class="item-blog-column__date">{{
            formatDate(post.created)
          }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { defaultDateFormat } from '@/helpers/utils';

export default {
  name: 'NexBlogItem',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(value) {
      return defaultDateFormat(value);
    },
  },
};
</script>

<style scoped>
.item-blog-column {
  height: 100%;
}
</style>
