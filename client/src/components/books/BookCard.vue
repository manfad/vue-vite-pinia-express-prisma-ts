<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ book.title }}</h5>
      <p class="card-text">{{ book.content }}</p>
      <div class="btn-group">
        <button class="btn btn-sm btn-primary" @click="emit('edit', book)">
          Edit
        </button>
        <button class="btn btn-sm btn-danger" @click="emit('delete', book.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Book {
  id: number;
  title: string;
  content: string;
}

interface Props {
  book: Book;
}

interface Emits {
  (e: 'edit', book: Book): void;
  (e: 'delete', id: number): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script> 