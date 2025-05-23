<template>
  <div>
    <h1>Welcome to your Vocabulary Dashboard</h1>
    <button @click="logout">Sign Out</button>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function logout() {
  userStore.signOut()
  router.push('/auth')
}
</script>
