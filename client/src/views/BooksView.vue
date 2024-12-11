<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Books CRUD</h1>
      <button class="btn btn-danger" @click="handleLogout">Logout</button>
    </div>

    <BookForm
      :editing-id="editingId"
      :initial-title="form.title"
      :initial-content="form.content"
      @submit="handleSubmit"
      @cancel="cancelEdit"
    />

    <BookList
      :books="store.books"
      :loading="store.loading"
      :error="store.error"
      @edit="editBook"
      @delete="store.deleteBook"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBookStore } from '../stores/modules/books';
import { useAuthStore } from '../stores/modules/auth';
import BookForm from '../components/books/BookForm.vue';
import BookList from '../components/books/BookList.vue';

const router = useRouter();
const store = useBookStore();
const authStore = useAuthStore();
const editingId = ref<number | null>(null);
const form = reactive({
  title: '',
  content: '',
});

onMounted(() => {
  store.fetchBooks();
});

const handleSubmit = async (data: { title: string; content: string }) => {
  if (editingId.value) {
    await store.updateBook(editingId.value, data.title, data.content);
    editingId.value = null;
  } else {
    await store.createBook(data.title, data.content);
  }
  form.title = '';
  form.content = '';
};

const editBook = (book: { id: number; title: string; content: string }) => {
  editingId.value = book.id;
  form.title = book.title;
  form.content = book.content;
};

const cancelEdit = () => {
  editingId.value = null;
  form.title = '';
  form.content = '';
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script> 