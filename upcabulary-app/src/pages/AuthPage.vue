<template>
  <section>
    <h1>Login or Sign Up</h1>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="handleSignUp">Sign Up</button>
    <button @click="handleSignIn">Sign In</button>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const userStore = useUserStore()
const router = useRouter()

async function handleSignUp() {
  try {
    await userStore.signUp(email.value, password.value)
    alert('Check your email to confirm your account')
  } catch (error) {
    errorMessage.value = error.message
  }
}

async function handleSignIn() {
  try {
    await userStore.signIn(email.value, password.value)
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>
