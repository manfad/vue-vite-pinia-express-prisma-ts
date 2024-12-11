import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username,
          password,
        });
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      } catch (error) {
        this.error = 'Invalid credentials';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(username: string, email: string, password: string, name: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          username,
          email,
          password,
          name,
        });
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      } catch (error) {
        this.error = 'Registration failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
}); 