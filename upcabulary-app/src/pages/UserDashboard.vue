<template>
  <div>
    <Header></Header>
  <section>
    <h2>Welcome, {{ user?.user_metadata?.name }}</h2>

    <AddWordForm />

    <h3>📚 To Master</h3>
    <div class="cards">
      <div v-for="word in words.filter(w => !w.mastered)" :key="word.id" class="card">
        <div v-if="editingId === word.id">
          <input v-model="editedWord" placeholder="Edit word" />
          <input v-model="editedMeaning" placeholder="Edit meaning" />
          <button @click="saveEdit(word.id)">💾 Save</button>
          <button @click="cancelEdit">❌ Cancel</button>
        </div>
        <div v-else>
          <p><strong>{{ word.word }}</strong> - {{ word.meaning }}</p>
          <div class="card-actions">
            <button @click="toggle(word)">✅</button>
            <button @click="startEdit(word)">✏️</button>
            <button @click="remove(word.id)">🗑</button>
          </div>
        </div>
      </div>
    </div>

    <h3>🏆 Mastered</h3>
    <div class="cards">
      <div v-for="word in words.filter(w => w.mastered)" :key="word.id" class="card">
        <div v-if="editingId === word.id">
          <input v-model="editedWord" />
          <input v-model="editedMeaning" />
          <button @click="saveEdit(word.id)">💾</button>
          <button @click="cancelEdit">❌</button>
        </div>
        <div v-else>
          {{ word.word }} - {{ word.meaning }} ✔️
          <button @click="startEdit(word)">✏️</button>
          <button @click="toggle(word)">↩️</button>
          <button @click="remove(word.id)">🗑</button>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useWordStore } from '@/stores/word';
import { storeToRefs } from 'pinia';
import AddWordForm from '@/components/AddWordForm.vue';
import Header from '@/components/AppHeader.vue';

const userStore = useUserStore();
const wordStore = useWordStore();
const { user } = storeToRefs(userStore);
const { words } = storeToRefs(wordStore);
const editingId = ref(null);
const editedWord = ref('');
const editedMeaning = ref('');

async function remove(id) {
  try {
    await wordStore.deleteWord(id);
  } catch (err) {
    console.error('Failed to delete word:', err.message);
  }
}

async function toggle(word) {
  try {
    await wordStore.toggleMastered(word);
  } catch (err) {
    console.error('Failed to toggle mastered:', err.message);
  }
}

function startEdit(word) {
  editingId.value = word.id;
  editedWord.value = word.word;
  editedMeaning.value = word.meaning;
}

function cancelEdit() {
  editingId.value = null;
  editedWord.value = '';
  editedMeaning.value = '';
}

async function saveEdit(id) {
  try {
    await wordStore.updateWord(id, editedWord.value, editedMeaning.value);
    await wordStore.fetchWords();
    cancelEdit();
  } catch (err) {
    console.error('Failed to update word:', err.message);
  }
}



onMounted(async () => {
  await userStore.fetchUser();
  wordStore.fetchWords();
});
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  margin-top: 4rem;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.card {
  background: #fff;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 350px;
  height: 120px;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

</style>