import { useNuxtApp, useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import * as storeService from "~/services/storeService";
import { apiFetch } from "~/utils/apiFetch";

export const useStoreLocation = defineStore("storeLocation", {
  state: () => ({
    storeList: [],
    types: [],
    locations: [],
    selectedStore: null,
    displayModal: false,
    activeSection: 'Locations', // tab 
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
    async fetchStoreList(estId, storeId) {
      const res = await storeService.fetchStoreList(estId, storeId);
      if (res) this.storeList = res;
    },

    async fetchStoreById(storeId) {
      const store = await storeService.fetchStoreById(storeId);
      if (store) this.selectedStore = store;
      return store;
    },

    async updateStoreById(id, payload) {
      const config = useRuntimeConfig();

      const { error } = await apiFetch(
        `${config.public.apiBaseUrl}/stores/${id}`,
        {
          method: "PUT",
          body: payload,
        }
      );

      // also update selectedStore if it's the same store
      if (this.selectedStore?.id === id) {
        this.selectedStore = {
          ...this.selectedStore,
          ...payload,
        };
      }

      if (error.value) {
        throw error.value;
      }
    },

    addStore(item) {
      this.storeList.push(item);
    },

    async removeStore(id) {
      this.storeList = this.storeList.filter((store) => store.id !== id);
      const config = useRuntimeConfig();

      await apiFetch(
        `${config.public.apiBaseUrl}/stores/${id}`,
        {
          method: "DELETE",
        }
      );
    },

    editStore(updatedItem) {
      const index = this.storeList.findIndex(
        (store) => store.id === updatedItem.id
      );
      if (index !== -1) {
        this.storeList[index] = { ...updatedItem };
      }
    },

    async updateStoreInfo(id, payload) {
      const { $firebaseAuth } = useNuxtApp();
      const token = await $firebaseAuth.currentUser.getIdToken();
      await storeService.updateStoreInfo(id, payload, token);

      const index = this.storeList.findIndex((store) => store.id === id);
      if (index !== -1) {
        this.storeList[index] = {
          ...this.storeList[index],
          ...payload,
        };
      }

      // also update selectedStore if it's the same store
      if (this.selectedStore?.id === id) {
        this.selectedStore = {
          ...this.selectedStore,
          ...payload,
        };
      }
    },

    async updateStoreTax(id, taxInfo) {
      const { $firebaseAuth } = useNuxtApp();
      const token = await $firebaseAuth.currentUser.getIdToken();
      await storeService.updateStoreTax(id, taxInfo, token);

      // also update selectedStore if it's the same store
      if (this.selectedStore?.id === id) {
        this.selectedStore = {
          ...this.selectedStore,
          taxInfo,
        };
      }
      // location.reload();
    },

    async updateStoreOpeningHours(id, openingHours) {
      const { $firebaseAuth } = useNuxtApp();
      const token = await $firebaseAuth.currentUser.getIdToken();
      await storeService.updateStoreOpeningHours(id, openingHours, token);
    },

    async updateStoreReceipt(id, receiptSettings) {
      const { $firebaseAuth } = useNuxtApp();
      const token = await $firebaseAuth.currentUser.getIdToken();
      await storeService.updateStoreReceipt(id, receiptSettings, token);

      // also update selectedStore if it's the same store
      if (this.selectedStore?.id === id) {
        this.selectedStore = {
          ...this.selectedStore,
          receiptSettings,
        };
      }
    },

    setActiveSection(section) {
      this.activeSection = section;
    },

    displayStoreModal() {
      this.displayModal = !this.displayModal;
    },
  },
});
