<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title">{{ props.editingId ? 'Edit' : 'Create' }} Book</h5>
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
          {{ props.editingId ? 'Update' : 'Create' }}
        </button>
        <button
          v-if="props.editingId"
          type="button"
          class="btn btn-secondary ms-2"
          @click="emit('cancel')"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

interface Props {
  editingId: number | null;
  initialTitle?: string;
  initialContent?: string;
}

interface Emits {
  (e: 'submit', data: { title: string; content: string }): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  initialTitle: '',
  initialContent: '',
});

const emit = defineEmits<Emits>();

const form = reactive({
  title: props.initialTitle,
  content: props.initialContent,
});

watch(() => props.initialTitle, (newTitle) => {
  form.title = newTitle || '';
});

watch(() => props.initialContent, (newContent) => {
  form.content = newContent || '';
});

const handleSubmit = () => {
  emit('submit', {
    title: form.title,
    content: form.content,
  });
  form.title = '';
  form.content = '';
};
</script> 