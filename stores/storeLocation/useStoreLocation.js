import { useNuxtApp } from "nuxt/app";
import { defineStore } from "pinia";
import { useAdmin } from "~/stores/admin/useAdmin";

export const useStoreLocation = defineStore("storeLocation", {
  state: () => ({
    storeList: [],
    types: [],
    locations: [],
  }),

  getters: {
    groupedByLocation: (state) => {
      return state.storeList.reduce((acc, store) => {
        acc[store.location] = acc[store.location] || [];
        acc[store.location].push(store);
        return acc;
      }, {});
    },
    getStoreById: (state) => (id) => {
      return state.storeList.find((store) => store.id === id);
    },
  },

  actions: {
    async fetchStoreList() {
      const config = useRuntimeConfig();
      const admin = useAdmin();
      const { $firebaseAuth } = useNuxtApp();
      const currentUser = $firebaseAuth.currentUser;

      if (!currentUser) {
        throw new Error("No authenticated user found");
      }

      const idToken = await currentUser.getIdToken();
      const res = await apiFetch(
        `${config.public.apiBaseUrl}/stores?establishmentId=${admin.estId}&storeId=11325a15-2f9c-4d77-a2cf-7655f56a6661`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      this.storeList = res || [];
    },

    async updateStoreById(id, payload) {
      const config = useRuntimeConfig();

      const { data, error } = await apiFetch(
        `${config.public.apiBaseUrl}/store/${id}`,
        {
          method: "PUT",
          body: payload,
        }
      );

      if (error.value) {
        throw error.value;
      }
    },

    addStore(item) {
      this.storeList.push(item);
    },

    removeStore(id) {
      this.storeList = this.storeList.filter((store) => store.id !== id);
    },

    editStore(updatedItem) {
      const index = this.storeList.findIndex(
        (store) => store.id === updatedItem.id
      );
      if (index !== -1) {
        this.storeList[index] = { ...updatedItem };
      }
    },
  },
});
