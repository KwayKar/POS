import { defineStore } from "pinia";
import { generateId } from "~/utils/generateId";

export const useStaff = defineStore("staff", {
  state: () => ({
    staffList: [
      {
        id: 1,
        name: "Alice Johnson",
        role: "manager",
        group: "Operations",
        email: "alice@example.com",
      },
      {
        id: 2,
        name: "Bob Lee",
        role: "designer",
        group: "Creative",
        email: "bob@example.com",
      },
      {
        id: 3,
        name: "Charlie Kim",
        role: "waiter",
        group: "Engineering",
        email: "charlie@example.com",
      },
      {
        id: 4,
        name: "Alice Johnson",
        role: "manager",
        group: "Operations",
        email: "alice@example.com",
      },
      {
        id: 5,
        name: "Bob Lee",
        role: "designer",
        group: "Creative",
        email: "bob@example.com",
      },
      {
        id: 6,
        name: "Charlie Kim",
        role: "waiter",
        group: "Engineering",
        email: "charlie@example.com",
      },
      {
        id: 7,
        name: "Alice Johnson",
        role: "manager",
        group: "Operations",
        email: "alice@example.com",
      },
      {
        id: 8,
        name: "Bob Lee",
        role: "designer",
        group: "Creative",
        email: "bob@example.com",
      },
      {
        id: 9,
        name: "Charlie Kim",
        role: "waiter",
        group: "Engineering",
        email: "charlie@example.com",
      },
    ],
    roles: [
      { label: "Manager", value: "manager" },
      { label: "Cashier", value: "cashier" },
      { label: "Cook", value: "cook" },
      { label: "Waiter", value: "waiter" },
    ],
    groups: [
      { label: "Morning Shift", value: "morning" },
      { label: "Evening Shift", value: "evening" },
      { label: "Admin", value: "admin" },
    ]
  }),

  getters: {
    groupedByGroup: (state) => {
      return state.staffList.reduce((acc, staff) => {
        acc[staff.group] = acc[staff.group] || [];
        acc[staff.group].push(staff);
        return acc;
      }, {});
    },
    getStaffById: (state) => (id) => {
      return state.staffList.find((staff) => staff.id === id);
    },
  },

  actions: {
    addStaff(item) {
      item.id = generateId();
      this.staffList.push(item);
    },
    removeStaff(id) {
      this.staffList = this.staffList.filter((staff) => staff.id !== id);
    },
    editStaff(updatedItem) {
      const index = this.staffList.findIndex((staff) => staff.id === updatedItem.id);
      if (index !== -1) {
        this.staffList[index] = { ...updatedItem };
      }
    },
  },
});
