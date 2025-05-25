import { defineStore } from 'pinia';
import { supabase } from './supabase.js';
import { ref } from 'vue';

export const useWordStore = defineStore('words', () => {
   // STATES: hold data that persists in the store and is reactive
   // Stores the list of words
  const words = ref([]);

  // ACTIONS: methods to interact with the store and perform operations
  const fetchWords = async () => {
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    words.value = data;
  };

  const addWord = async (word, meaning) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;

    const { error } = await supabase.from('words').insert([
      {
        word,
        meaning,
        mastered: false,
        user_id: user.id,
      },
    ]);

    if (error) throw error;

    await fetchWords();
  };

  const deleteWord = async (id) => {
    const { error } = await supabase.from('words').delete().eq('id', id);
    if (error) throw error;
    await fetchWords();
  };

  // On Composition API: Return the state and actions I want to use --
  return {
    words,
    fetchWords,
    addWord,
    deleteWord,
  };


});