import { defineStore } from 'pinia';
import { supabase } from './supabase';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // ***STATES*** hold data that persists in the store and is reactive
  // Stores the current authenticated user
  const user = ref(null);

  // Stores the list of all users
  const users = ref([]);

  // ***ACTIONS*** methods to interact with the store and perform operations
  // === Authentication Methods ===
  const fetchUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      user.value = null;
      return;
    }

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Supabase getUser error:', error.message);
      user.value = null;
      return;
    }

    user.value = data.user;
  };

  const signUp = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    if (error) throw error;
    user.value = data.user;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    user.value = data.user;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    user.value = null;
  };

  // === Database User Management ===
  const fetchUsers = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase.from('Users').select('*');
    if (error) throw error;
    users.value = data;
  };

  const createUser = async (newUser) => {
    const { error } = await supabase.from('Users').insert([newUser]);
    if (error) throw error;
    await fetchUsers();
  };

  const deleteUser = async (id) => {
    const { error } = await supabase.from('Users').delete().eq('id', id);
    if (error) throw error;
    await fetchUsers();
  };

  // On Composition API: Return the state and actions I want to use --
  return {
    user,
    users,
    fetchUser,
    signUp,
    signIn,
    signOut,
    fetchUsers,
    createUser,
    deleteUser,
  };
});
