<template>
  <header class="header">
    <div class="header-container">
      <div class="header-left">
        <img src="../assets/Logo.svg" alt="Upcabulary logo" class="logo" />
        <h1 class="app-name">Upcabulary</h1>
      </div>

      <div class="header-right">
        <button
          v-if="route.path !== '/auth' && !user"
          @click="goToLogin"
          class="login-button"
        >
          <img src="../assets/user.svg" alt="login" class="user-icon" /> Log in
        </button>

        <button
          v-if="route.path !== '/auth' && user"
          @click="logout"
          class="logout-button"
        >
          <img
            src="../assets/sign-out-icon.svg"
            alt="login"
            class="logout-icon"
          />
          Sign out
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
defineOptions({ name: 'AppHeader' });

import { useRouter, useRoute } from 'vue-router'; // Router: used to navigate. Route: used to access the current route/path.
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useWordStore } from '@/stores/word'; // Importing the word store to clear words on logout

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

function goToLogin() {
  router.push('/auth');
}

async function logout() {
  await userStore.signOut();

  const wordStore = useWordStore();
  wordStore.words.value = [];

  await router.push('/');
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #f6f5f5;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.header-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 30px;
}

.app-name {
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Poppins', 'Times New Roman', Times, serif;
  color: #6c0ee4;
  margin: 0;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  background: #d6b6ff;
  color: #6c0ee4;
  border: none;
  border-radius: 25rem;
  font-size: 0.9rem;
  white-space: nowrap;
  height: 34px;
  width: 98px;
  cursor: pointer;
}

.login-button:hover {
  background: rgba(214, 182, 255, 0.8);
}

.user-icon {
  height: 20px;
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  background: white;
  color: #d9d0e3;
  border: #d9d0e3 1px solid;
  border-radius: 25rem;
  font-size: 0.9rem;
  white-space: nowrap;
  height: 30px;
  width: 98px;
  padding: 0.5rem;
  cursor: pointer;
}

.logout-button:hover {
  background: rgba(217, 208, 227, 0.2);
}

.logout-icon {
  height: 16px;
}

@media (min-width: 768px) {
  .header-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0.75rem 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
