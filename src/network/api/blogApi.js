import axios from '@/network/axios';
import { parseUrlByLimitAndOffset } from '@/helpers/utils';

const getPostList = (tags, page) => {
  return axios.get(parseUrlByLimitAndOffset('/api/blog/posts_by_tags/', page), {
    params: { tags },
  });
};

const searchPosts = (text, page) => {
  return axios.get(parseUrlByLimitAndOffset('/api/blog/posts_search/', page), {
    params: { search_string: text },
  });
};

const getTags = () => {
  return axios.get('/api/blog/tags/');
};

const getPost = (slug) => {
  return axios.get(`/api/blog/${slug}/`);
};

export default {
  getPostList,
  searchPosts,
  getTags,
  getPost,
};
