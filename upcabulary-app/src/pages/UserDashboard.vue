<template>
  <div>
    <Header></Header>
    <section>
    <h2>Welcome, {{ user?.user_metadata?.name }}</h2>

    <AddWordForm />
    <h3>📚 To Master</h3>
    <ul>
      <li v-for="word in words.filter((w) => !w.mastered)" :key="word.id">
        {{ word.word }} - {{ word.meaning }}
        <button @click="toggle(word)">✅</button>
        <button @click="remove(word.id)">🗑</button>
      </li>
    </ul>

    <h3>🏆 Mastered</h3>
    <ul>
      <li v-for="word in words.filter((w) => w.mastered)" :key="word.id">
        {{ word.word }} - {{ word.meaning }} ✔️
        <button @click="toggle(word)">↩️</button>
        <button @click="remove(word.id)">🗑</button>
      </li>
    </ul>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useWordStore } from '@/stores/word';
import { storeToRefs } from 'pinia';
import AddWordForm from '@/components/AddWordForm.vue';
import Header from '@/components/AppHeader.vue';

const userStore = useUserStore();
const wordStore = useWordStore();

const { user } = storeToRefs(userStore);
const { words } = storeToRefs(wordStore);


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

onMounted(async () => {
  await userStore.fetchUser();
  wordStore.fetchWords();
});
</script>

<style scoped>
section {
  padding: 4rem;
}

</style>