import axios from '@/network/axios';
import { parseUrlByLimitAndOffset } from '@/helpers/utils';

const getPostList = (tags, page) => {
  return axios.get(parseUrlByLimitAndOffset('/blog/posts_by_tags/', page), {
    params: { tags },
  });
};

const searchPosts = (text, page) => {
  return axios.get(parseUrlByLimitAndOffset('/blog/posts_search/', page), {
    params: { search_string: text },
  });
};

const getTags = () => {
  return axios.get('/blog/tags/');
};

const getPost = (slug) => {
  return axios.get(`/blog/${slug}/`);
};

export default {
  getPostList,
  searchPosts,
  getTags,
  getPost,
};
