<template>
  <section>
    <router-view class="app-main" /> <!-- your routes will load inside of these tags -->
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()

onMounted(async () => {
  try {
    await userStore.fetchUser()
  } catch (e) {
    console.log(e)
  }
})
</script>

<style scoped>
.app-main {
  margin: 0, 0;
  padding: 0, 0;
}
</style>