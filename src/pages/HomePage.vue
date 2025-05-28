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
  margin: 0;
  padding: 0;
  width: 100%;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  background: #ffffff;
  padding: 3rem 2rem;
  font-family: 'Inter', sans-serif;
  border-radius: 20px;
  box-sizing: border-box;
}

h1 {
  font-size: 1.3rem;
  color: #6c0ee4;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  margin: 0;
}

p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

button {
  background: #0bce83;
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
  background: #19bb7d;
}

@media (min-width: 768px) {
  section {
    width: 90%;
    padding: 3rem 2rem;
  }

  .home {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 6rem;
    height: 100vh;
    background-color: #f6f5f5;
    box-sizing: border-box;
  }

  h1 {
    font-size: 1.6rem;
  }
}
</style>
