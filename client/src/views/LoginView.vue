<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center mb-4">Login</h2>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input
                  v-model="form.username"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  required
                />
              </div>
             
              <div v-if="authStore.error" class="alert alert-danger">
                {{ authStore.error }}
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="authStore.loading"
              >
                {{ authStore.loading ? 'Loading...' : 'Login' }}
              </button>
            </form>
            <div class="text-center mt-3">
              <router-link to="/register">Don't have an account? Register</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/modules/auth';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  username: '',
  password: '',
});

const handleSubmit = async () => {
  try {
    await authStore.login(form.username, form.password);
    router.push('/books');
  } catch (error) {
    // Error is handled in the store
  }
};
</script> 