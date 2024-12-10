import { defineStore } from 'pinia';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchPosts() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        this.posts = response.data;
      } catch (error) {
        this.error = 'Error fetching posts';
      } finally {
        this.loading = false;
      }
    },

    async createPost(title: string, content: string) {
      try {
        const response = await axios.post('http://localhost:3000/api/posts', {
          title,
          content,
        });
        this.posts.unshift(response.data);
      } catch (error) {
        this.error = 'Error creating post';
      }
    },

    async updatePost(id: number, title: string, content: string) {
      try {
        const response = await axios.put(`http://localhost:3000/api/posts/${id}`, {
          title,
          content,
        });
        const index = this.posts.findIndex(post => post.id === id);
        if (index !== -1) {
          this.posts[index] = response.data;
        }
      } catch (error) {
        this.error = 'Error updating post';
      }
    },

    async deletePost(id: number) {
      try {
        await axios.delete(`http://localhost:3000/api/posts/${id}`);
        this.posts = this.posts.filter(post => post.id !== id);
      } catch (error) {
        this.error = 'Error deleting post';
      }
    },
  },
}); 