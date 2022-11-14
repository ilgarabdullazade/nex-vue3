import { blogTagsStore } from './blogTagsStore';
import { blogPostListStore } from './blogPostListStore';
import { blogPostStore } from './blogPostStore';

export const blogStore = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    blogTags: blogTagsStore,
    blogPostList: blogPostListStore,
    blogPost: blogPostStore,
  },
  namespaced: true,
};
