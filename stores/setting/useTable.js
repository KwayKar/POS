import { defineStore } from "pinia";
import { useRuntimeConfig } from "nuxt/app";
import { useAdmin } from "~/stores/admin/useAdmin";
import { apiFetch } from "~/utils/apiFetch";

export const useTable = defineStore("table", {
  state: () => ({
    floors: [
      // {
      //   id: 1,
      //   name: 1,
      //   tables: [
      //     // { id: 1, name: "Table 1", capacity: 2 },
      //     // { id: 2, name: "Table 2", capacity: 2 },
      //     // { id: 3, name: "Table 3", capacity: 2 },
      //     // { id: 4, name: "Table 4", capacity: 2 },
      //     // { id: 5, name: "Table 5", capacity: 2 },
      //     // { id: 6, name: "Table 6", capacity: 2 },
      //     // { id: 7, name: "Table 7", capacity: 2 },
      //   ],
      // },
      // { id: 2, name: 2, tables: [] },
      // { id: 3, name: 2, tables: [] },
      // { id: 4, name: 2, tables: [] },
      // { id: 5, name: 2, tables: [] },
      // { id: 6, name: 2, tables: [] },
      // { id: 7, name: 2, tables: [] },
      // { id: 8, name: 2, tables: [] },
    ],
    selectedFloorID: 1,
    filteredFloors: [],
  }),

  getters: {
    getFloorList: (state) => state.floors,
    getSelectedFloor: (state) =>
      state.floors.find((f) => f.id === state.selectedFloorID) ?? {},
  },

  actions: {
    async fetchFloors() {
      try {
        const admin = useAdmin();
        const config = useRuntimeConfig();

        const data = await apiFetch(
          `${config.public.apiBaseUrl}/stores/${admin.storeId}/tables`
        );
        this.floors = data;
      } catch (error) {
      }
    },

    setSelectedFloorID(id) {
      this.selectedFloorID = id;
    },

    getFloorDetails(id) {
      return this.floors.find((f) => f.id === id);
    },

    async createFloor() {
      try {
        const admin = useAdmin();
        const config = useRuntimeConfig();

        if (admin.businessType === "restaurant") {
          const res = await apiFetch(
            `${config.public.apiBaseUrl}/stores/${admin.storeId}/floors`,
            {
              method: "POST",
            }
          );
          this.floors = [...this.floors, { id: res.id, name: res.name }];
        }
      } catch (error) {
      }
    },

    async updateFloor(id, updates) {
      try {
        const admin = useAdmin();
        const config = useRuntimeConfig();

        if (admin.businessType === "restaurant") {
          const payload = {
            name: updates?.name,
            tables: updates?.tables,
          };
          await apiFetch(`${config.public.apiBaseUrl}/tables/${id}`, {
            method: "PUT",
            body: payload,
          });
        }

        const index = this.floors.findIndex((f) => f.id === id);
        if (index !== -1) {
          this.floors[index] = { ...this.floors[index], ...updates };
        }
      } catch (error) {
      }
    },

    async deleteFloor(id) {
      try {
        const admin = useAdmin();
        const config = useRuntimeConfig();

        if (admin.businessType === "restaurant") {
          await apiFetch(`${config.public.apiBaseUrl}/stores/${admin.storeId}/floors/${id}`, {
            method: "DELETE",
          });
        }

        this.floors = this.floors.filter((f) => f.id !== id);
      } catch (error) {
      }
    },

    filterFloors(keyword) {
      this.filteredFloors = this.floors.filter((f) =>
        f.name.toLowerCase().includes(keyword.toLowerCase())
      );
    },

    async createTables({prefix = "T", count = 1 }) {
      const floor = this.floors.find(f => f.id === this.selectedFloorID);
      if (!floor) return;

      try {
        const admin = useAdmin();
        const config = useRuntimeConfig();
        const createdTables = await apiFetch(
          `${config.public.apiBaseUrl}/stores/${admin.storeId}/floors/${this.selectedFloorID}/tables`,
          {
            method: "POST",
            body:  {
              prefix,
              count,
            },
          }
        );
        floor.tables = createdTables.allTables; 
      } catch (error) {
      }
    },

    async updateTable({ tableId, capacity }) {
      const floor = this.floors.find(f => f.id === this.selectedFloorID);
      if (!floor) return;

      const index = floor.tables.findIndex(t => t.id === tableId);
      if (index === -1) return;
      floor.tables[index] = { ...floor.tables[index], capacity };

      try {
        const admin = useAdmin();
        const config = useRuntimeConfig();
        await apiFetch(`${config.public.apiBaseUrl}/stores/${admin.storeId}/floors/${this.selectedFloorID}/tables/${tableId}`, {
          method: "PUT",
          body: {
            capacity,
          }
        });
      } catch (error) {
      }
    },

    async deleteTable(tableId) {
      const admin = useAdmin();
      const floor = this.floors.find(f => f.id === this.selectedFloorID);
      if (!floor) return;

      floor.tables = floor.tables.filter(t => t.id !== tableId);
      try {
        const config = useRuntimeConfig();
        await apiFetch(`${config.public.apiBaseUrl}/stores/${admin.storeId}/floors/${this.selectedFloorID}/tables/${tableId}`, {
          method: "DELETE",
        });

        this.selectedFloorID = this.floors[0]?.id || null;
      } catch (error) {
      }
    },
  },
});
