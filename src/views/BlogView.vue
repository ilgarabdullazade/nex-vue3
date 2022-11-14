<template>
  <section class="blog">
    <div class="blog__container">
      <h1 class="blog__title title">{{ $t('blog.title') }}</h1>
      <h6 class="blog__topic topic">
        {{ $t('blog.caption') }}
      </h6>
      <nex-blog-search />
      <nex-blog-tags />
      <nex-blog-list />
      <nex-partners />
    </div>
  </section>
</template>

<script>
import NexBlogSearch from '@/components/blog/BlogSearch';
import NexBlogTags from '@/components/blog/BlogTags';
import NexBlogList from '@/components/blog/BlogList';
import NexPartners from '@/components/Partners';

export default {
  name: 'BlogView',
  components: {
    NexBlogSearch,
    NexBlogTags,
    NexBlogList,
    NexPartners,
  },
};
</script>
