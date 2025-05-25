<template>
  <div class="home">
    <Header></Header>
    <section>
      <h1>Welcome to Upcabulary</h1>
      <p>Build your vocabulary one word at a time.</p>
      <button @click="goToAuth">Get Started</button>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Header from '@/components/AppHeader.vue';

const router = useRouter();

function goToAuth() {
  router.push('/auth');
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f6f5f5;
  box-sizing: border-box;
}

section {
  background: #ffffff;
  padding: 2rem 2rem;
  border-radius: 20px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  color: #6c0ee4;
  font-weight: 600;
  margin-bottom: 1rem;
}

p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #333;
  margin-bottom: 2rem;
}

button {
  background: #6c0ee4;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
  width: 100%;
  max-width: 300px;
  font-family: 'Inter', sans-serif;
}

button:hover {
  background: #580bc4;
}
</style>
