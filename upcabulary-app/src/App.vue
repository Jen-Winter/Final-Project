<!-- src/App.vue -->
<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user'

const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
  if (userStore.user) {
    router.push('/')
  } else {
    router.push('/auth')
  }
})
</script>
