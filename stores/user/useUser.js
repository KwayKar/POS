import { defineStore } from "pinia";

export const useUser = defineStore("staff", {
  state: () => ({
    name: "Aung",
    id: null,
    role: "manager",
  }),

  getters: {
    currentUser: (state) => ({
      name: state.name,
      id: state.id,
      role: state.role,
    }),
    getRole: (state) => state.role,
  },

  actions: {
    updateStaff(staff) {
      this.name = staff.name || this.name;
      this.id = staff.id || this.id;
      this.role = staff.role || this.role;
    },
    selectStaff(staff) {
      this.updateStaff(staff);
    },
  },
});
