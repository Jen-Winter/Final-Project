import { defineStore } from 'pinia';
import { supabase } from './supabase';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const users = ref([]);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('Users').select('*');
    if (error) {
      throw error;
    }
    users.value = data;
  };

  const createUser = async (newUser) => {
    const { data, error } = await supabase.from('Users').insert([newUser]);
    if (error) throw error;
    await fetchUsers(); // traer todos los usuarios
  };

  const deleteUser = async (id) => {
    const { error } = await supabase.from('Users').delete().eq('id', id);
    if (error) throw error;
    await fetchUsuarios();
  };
});
