import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';
import { useRouter } from 'vue-router';

interface Book {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const useBookStore = defineStore('books', {
  state: () => ({
    books: [] as Book[],
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    handleUnauthorized(error: any) {
      if (error.response?.status === 401) {
        const authStore = useAuthStore();
        const router = useRouter();
        authStore.logout();
        router.push('/login');
      }
    },

    async fetchBooks() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/books');
        this.books = response.data;
      } catch (error) {
        this.handleUnauthorized(error);
        this.error = 'Error fetching books';
      } finally {
        this.loading = false;
      }
    },

    async createBook(title: string, content: string) {
      try {
        const response = await axios.post('http://localhost:3000/api/books', {
          title,
          content,
        });
        this.books.unshift(response.data);
      } catch (error) {
        this.error = 'Error creating book';
      }
    },

    async updateBook(id: number, title: string, content: string) {
      try {
        const response = await axios.put(`http://localhost:3000/api/books/${id}`, {
          title,
          content,
        });
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
          this.books[index] = response.data;
        }
      } catch (error) {
        this.error = 'Error updating book';
      }
    },

    async deleteBook(id: number) {
      try {
        await axios.delete(`http://localhost:3000/api/books/${id}`);
        this.books = this.books.filter(book => book.id !== id);
      } catch (error) {
        this.error = 'Error deleting book';
      }
    },
  },
}); 