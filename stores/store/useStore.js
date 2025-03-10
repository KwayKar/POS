import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('store', () => {
  const stores = ref([
    { id: 1, name: 'Store A', location: 'New York' },
    { id: 2, name: 'Store B', location: 'Los Angeles' },
    { id: 3, name: 'Store C', location: 'Chicago' },
  ]);
  
  const addStore = (store) => {
    stores.value.push({ id: Date.now(), ...store });
  };

  const updateStore = (id, updatedStore) => {
    const index = stores.value.findIndex(s => s.id === id);
    if (index !== -1) {
      stores.value[index] = { ...stores.value[index], ...updatedStore };
    }
  };

  const removeStore = (id) => {
    stores.value = stores.value.filter(s => s.id !== id);
  };

  return { stores, addStore, updateStore, removeStore };
});