<template>
  <div v-if="loading" class="text-center">Loading...</div>
  <div v-else-if="error" class="alert alert-danger">
    {{ error }}
  </div>
  <div v-else class="row">
    <div v-for="book in books" :key="book.id" class="col-md-6 mb-3">
      <BookCard
        :book="book"
        @edit="emit('edit', book)"
        @delete="emit('delete', book.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BookCard from './BookCard.vue';

interface Book {
  id: number;
  title: string;
  content: string;
}

interface Props {
  books: Book[];
  loading: boolean;
  error: string | null;
}

interface Emits {
  (e: 'edit', book: Book): void;
  (e: 'delete', id: number): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script> 