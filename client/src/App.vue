<template>
  <div class="container py-4">
    <h1 class="mb-4">Posts CRUD</h1>

    <!-- Create Post Form -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Create Post</h5>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <input
              v-model="form.title"
              type="text"
              class="form-control"
              placeholder="Title"
              required
            />
          </div>
          <div class="mb-3">
            <textarea
              v-model="form.content"
              class="form-control"
              placeholder="Content"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            {{ editingId ? 'Update' : 'Create' }} Post
          </button>
          <button
            v-if="editingId"
            type="button"
            class="btn btn-secondary ms-2"
            @click="cancelEdit"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>

    <!-- Posts List -->
    <div v-if="store.loading" class="text-center">Loading...</div>
    <div v-else-if="store.error" class="alert alert-danger">
      {{ store.error }}
    </div>
    <div v-else class="row">
      <div v-for="post in store.posts" :key="post.id" class="col-md-6 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content }}</p>
            <div class="btn-group">
              <button
                class="btn btn-sm btn-primary"
                @click="editPost(post)"
              >
                Edit
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="store.deletePost(post.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { usePostStore } from './stores/posts';

const store = usePostStore();
const editingId = ref<number | null>(null);
const form = reactive({
  title: '',
  content: '',
});

onMounted(() => {
  store.fetchPosts();
});

const handleSubmit = async () => {
  if (editingId.value) {
    await store.updatePost(editingId.value, form.title, form.content);
    editingId.value = null;
  } else {
    await store.createPost(form.title, form.content);
  }
  form.title = '';
  form.content = '';
};

const editPost = (post: { id: number; title: string; content: string }) => {
  editingId.value = post.id;
  form.title = post.title;
  form.content = post.content;
};

const cancelEdit = () => {
  editingId.value = null;
  form.title = '';
  form.content = '';
};
</script> 