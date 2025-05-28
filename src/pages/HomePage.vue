<template>
  <div class="home">
    <Header></Header>
    <section>
      <h1 style="color: black;">Master New Words,</h1>
      <h1>Expand your World</h1>
      <p>Save, organize, and master new vocabulary as you learn languages. Build your personal dictionary and make every word count in your language journey.</p>
      <button @click="goToAuth">Start learning</button>
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
  font-size: 26px;
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

@media (min-width: 768px) {
  section {
    width: 90%;
    padding: 3rem 2rem;
    gap: 1rem;
  }

  .home {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 6rem;
    background-color: #f6f5f5;
    box-sizing: border-box;
    
  }

  h1 {
    font-size: 80px;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 18px;
    max-width: 600px;
    text-align: center;
    line-height: 1.5;
  }
}
</style>
