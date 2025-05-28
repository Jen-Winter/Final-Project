<template>
  <div class="container">
    <Header></Header>
    <section>
      <h1 v-if="!isLogin">Sign Up</h1>
      <h1 v-else>Log in</h1>
      <input v-model="email" placeholder="Your Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <input
        v-if="!isLogin"
        v-model="name"
        placeholder="How should we call you?"
      />

      <button v-if="isLogin" @click="handleSignIn">Log in</button>
      <button v-else @click="handleSignUp">Create Account</button>
      <p v-if="isLogin">
        Don't have an account?
        <a @click="isLogin = false">Create one</a>
      </p>
      <p v-else>
        Already registered?
        <a @click="isLogin = true">Log in</a>
      </p>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import Header from '@/components/AppHeader.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const userStore = useUserStore();
const router = useRouter();
const isLogin = ref(true);
const { user } = storeToRefs(userStore);

onMounted(() => {
  if (user.value) {
    router.push('/UserDashboard.vue');
  }
});

const handleSignUp = async () => {
  errorMessage.value = '';

  if (!email.value || !password.value || !name.value) {
    errorMessage.value = 'Please fill in all fields.';
    return;
  }

  if (!email.value.includes('@')) {
    errorMessage.value = 'Please enter a valid email address.';
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters.';
    return;
  }

  try {
    await userStore.signUp(email.value, password.value, name.value);
    alert('Check your email to confirm your account.');
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const handleSignIn = async () => {
  errorMessage.value = '';

  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password.';
    return;
  }

  try {
    await userStore.signIn(email.value, password.value);
    router.push('/');
  } catch (error) {
    if (error.message.includes('Invalid login credentials')) {
      errorMessage.value = 'Incorrect email or password.';
    } else {
      errorMessage.value = error.message;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f6f5f5;
  margin: 0;
  padding: 0;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  background: #ffffff;
  padding: 1rem 2rem;
  font-family: 'Inter', sans-serif;
  border-radius: 20px;
  box-sizing: border-box;
}

h1 {
  font-size: 1.6rem;
  color: #6c0ee4;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

input {
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
  max-width: 340px;
}

button {
  display: block;
  width: 100%;
  background: #6c0ee4;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: 0.2s ease;
  box-sizing: border-box;
  max-width: 340px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
}

button:hover {
  background: #580bc4;
}

p {
  text-align: center;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
}

a {
  background: transparent;
  border: none;
  color: #6c0ee4;
  cursor: pointer;
  font-weight: 500;
  padding: 0;
  margin-top: 1rem;
}

p a:hover {
  text-decoration: underline;
}

@media (min-width: 768px) {
  .container {
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
