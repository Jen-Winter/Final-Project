<template>
  <form @submit.prevent="submitForm">
    <input v-model="word" placeholder="Word" required />
    <input v-model="meaning" placeholder="Meaning (optional)" />
    <button type="submit">Add Word</button>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useWordStore } from '@/stores/word';

const wordStore = useWordStore();
const word = ref('');
const meaning = ref('');
const errorMessage = ref('');

async function submitForm() {
  errorMessage.value = '';
  try {
    await wordStore.addWord(word.value, meaning.value);
    word.value = '';
    meaning.value = '';
  } catch (error) {
    errorMessage.value = error.message;
  }
}
</script>

<style scoped>
form {
  margin-bottom: 1rem;
}
input {
  margin-right: 0.5rem;
}
.error {
  color: red;
}
</style>
