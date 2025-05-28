<template>
  <section>
    <transition name="fade" mode="out-in">
      <router-view class="app-main" />
    </transition>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user.js';

const userStore = useUserStore();

onMounted(async () => {
  try {
    await userStore.fetchUser();
  } catch (e) {
    console.log(e);
  }
});
</script>

<style scoped>
.app-main {
  margin: 0, 0;
  padding: 0, 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
