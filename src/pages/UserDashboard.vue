<template>
  <div>
    <Header></Header>
    <section>
      <h2>Welcome, {{ user?.user_metadata?.name }}</h2>

      <AddWordForm />
      <transition name="fade" mode="out-in">
<div v-if="hasNoWords" class="empty-state">
  <img src="@/assets/undraw_to-do-list_eoia.svg" alt="No words yet" class="empty-image" />
  <p class="empty-text">You haven’t added any words yet<br />Start by adding your first one!</p>
</div>
<div v-else>
      <h3>WORDS TO MASTER</h3>
      <transition-group name="card-fade" tag="div" class="cards">
        <div
          v-for="word in words.filter((w) => !w.mastered)"
          :key="word.id"
          class="card"
        >
          <!-- Edit Mode -->

          <div v-if="editingId === word.id" class="card-content">
            <input
              v-model="editedWord"
              placeholder="Edit word"
              class="card-input"
            />
            <input
              v-model="editedMeaning"
              placeholder="Edit meaning"
              class="card-input"
            />
            <div class="card-buttons">
              <button class="mark-done" @click="toggle(word)">
                Mark as done
              </button>
              <div class="card-actions">
                <button @click="saveEdit(word.id)">
                  <img src="@/assets/save.svg" alt="save" />
                </button>
                <button @click="cancelEdit">
                  <img src="@/assets/x.svg" alt="cancel" />
                </button>
              </div>
            </div>
          </div>

          <!-- View Mode -->

          <div v-else class="card-content">
            <p>
              <strong>{{ word.word }}</strong>
            </p>
            <p>{{ word.meaning }}</p>
            <div class="card-buttons">
              <button class="mark-done" @click="toggle(word)">
                Mark as done
              </button>
              <div class="card-actions">
                <button @click="startEdit(word)">
                  <img src="@/assets/edit-icon.svg" alt="edit" />
                </button>
                <button @click="remove(word.id)">
                  <img src="@/assets/delete-icon.svg" alt="delete" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>

      <h3>MASTERED WORDS</h3>

      <transition-group name="card-fade" tag="div" class="cards">
        <div
          v-for="word in words.filter((w) => w.mastered)"
          :key="word.id"
          class="card"
        >
          <!-- Edit Mode -->
          <div v-if="editingId === word.id" class="card-content">
            <input
              v-model="editedWord"
              placeholder="Edit word"
              class="card-input"
            />
            <input
              v-model="editedMeaning"
              placeholder="Edit meaning"
              class="card-input"
            />
            <div class="card-buttons">
              <button class="mark-undone" @click="toggle(word)">
                Word mastered
              </button>
              <div class="card-actions">
                <button @click="saveEdit(word.id)">
                  <img src="@/assets/save.svg" alt="save" />
                </button>
                <button @click="cancelEdit">
                  <img src="@/assets/x.svg" alt="cancel" />
                </button>
              </div>
            </div>
          </div>

          <!-- View Mode -->
          <div v-else class="card-content">
            <p>
              <strong>{{ word.word }}</strong>
            </p>
            <p>{{ word.meaning }}</p>
            <div class="card-buttons">
              <button class="mark-undone">Word mastered</button>
              <div class="card-actions">
                <button @click="startEdit(word)">
                  <img src="@/assets/edit-icon.svg" alt="edit" />
                </button>
                <button @click="remove(word.id)">
                  <img src="@/assets/delete-icon.svg" alt="delete" />
                </button>
                <button @click="toggle(word)">
                  <img src="@/assets/return-icon.svg" alt="delete" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
      </div>
      </transition>
    </section>

  </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
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
const hasNoWords = computed(() => words.value.length === 0);

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
  console.log('Editing:', word.word, word.meaning);
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
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  background-color: #f6f5f5;
  font-family: 'Inter', sans-serif;
}

h2 {
  font-family: 'Poppins', sans-serif;
  color: #2d0c57;
  font-size: 1.4rem;
  margin-bottom: 0;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 2rem;
  color: #7203ff;
  font-family: 'Poppins', sans-serif;
}

.cards {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 0;
}

.card {
  background-color: #ffffff;
  border: 2px solid #e0d8ea;
  border-radius: 20px;
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: none;
  font-family: 'Inter', sans-serif;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.card-input {
  padding: 0.6rem 1rem;
  color: #3c2362;
  border-radius: 999px;
  border: 2px solid #e0d8ea;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
}

.card-content {
  color: #3c2362;
  max-width: 100%;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.card-actions button {
  background: white;
  border: 2px solid #e0d8ea;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
  height: 40px;
}

.card-actions button:hover {
  background-color: #f2ecf9;
}

.card-actions img {
  height: 18px;
  filter: brightness(0) saturate(100%) invert(57%) sepia(8%) saturate(1009%)
    hue-rotate(224deg) brightness(96%) contrast(87%);
}

.card-buttons {
  display: flex;
  align-items: flex-end;
  justify-items: space-around;
  justify-content: space-between;
  gap: 0.5rem;
}

.mark-done {
  margin-top: 0.8rem;
  height: 33px;
  min-width: 144px;
  background: none;
  border: 2px solid #e0d8ea;
  color: #e0d8ea;
  border-radius: 999px;
  padding: 0.4rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 400;
}

.mark-done:hover {
  background-color: #d6b6ff;
  color: #6c0ee4;
  border: #d6b6ff;
}

.mark-undone {
  margin-top: 0.8rem;
  height: 33px;
  min-width: 144px;
  background: #d6b6ff;
  color: #6c0ee4;
  border: #d6b6ff;
  border-radius: 999px;
  padding: 0.4rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: default;
}

button {
  background-color: #6c0ee4;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: 0.2s ease;
}

input {
  padding: 0.5rem;
  border-radius: 20px;
  border: 1px solid #e0d8ea;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  width: 100%;
  box-sizing: border-box;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.card-fade-enter-active,
.card-fade-leave-active {
  transition: all 0.4s ease;
}

.card-fade-enter-from,
.card-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.card-fade-enter-to,
.card-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.empty-image{
  width: 100%;
  max-width: 260px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 70vh;
}

.empty-state p {
  font-size: 1.2rem;
  color: #3c2362;
  margin-top: 1rem;
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 500;
}

@media (min-width: 768px) {
  .cards {
    flex-direction: row;
    gap: 1rem;
  }
  .card {
    width: 350px;
  }
  section {
    display: flex;
    flex-direction: column;
    padding: 5rem 5rem 2rem 5rem;
    background-color: #f6f5f5;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    margin-top: 0;
  }
}
</style>
