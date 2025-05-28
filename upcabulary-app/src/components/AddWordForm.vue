<template>
  <div>
    <h3>Add new words to your vocabulary:</h3>

    <form @submit.prevent="submitForm" class="word-form">
      <input
        v-model="word"
        placeholder="Enter a new word"
        required
        class="form-input"
      />
      <input
        v-model="meaning"
        placeholder="Enter its meaning (optional)"
        class="form-input"
      />
      <button type="submit" class="submit-button">Add Word</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
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
h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #2d0c57;
  font-family: 'Poppins', sans-serif;
}
.word-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.word-form button {
  align-self: flex-start;
  margin-top: 0;
  padding: 0.6rem 1.2rem;
  background-color: #6c0ee4;
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.form-input {
  padding: 0.6rem 1rem;
  border: 2px solid #e0d8ea;
  border-radius: 999px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  color: #2d0c57;
}

.form-input::placeholder {
  color: #e0d8ea;
}

.submit-button {
  background-color: #6c0ee4;
  color: white;
  margin-top: 1rem;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
  font-family: 'Inter', sans-serif;
}

.submit-button:hover {
  background-color: #580bc4;
}

.error-message {
  color: #e53935;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
