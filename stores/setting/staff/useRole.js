import { useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import { useAdmin } from "~/stores/admin/useAdmin";
import { generateId } from "~/utils/generateId";

export const useRole = defineStore("role", {
  state: () => ({
    roleList: [],
  }),

  getters: {
    getRoleById: (state) => (id) => {
      return state.roleList.find((role) => role.id === id);
    },
    getRolesByStore: (state) => (storeId) => {
      return state.roleList.filter((role) => role.storeId === storeId);
    },
    getStaffIdsByRole: (state) => (roleId) => {
      const role = state.roleList.find((r) => r.id === roleId);
      return role?.staffIds || [];
    },
  },

  actions: {
    async fetchRoles() {
      const config = useRuntimeConfig();
      const admin = useAdmin();

      const res = await apiFetch(
        `${config.public.apiBaseUrl}/roles?establishmentId=${admin.estId}` // &storeIds=${admin.storeId}
      );

      this.roleList = res || [];
    },

    async addRole(role) {
      const config = useRuntimeConfig();

      const res = await apiFetch(
        `${config.public.apiBaseUrl}/roles`,
        {
          method: "POST",
          body: role,
        }
      );

      this.roleList.push(res);
    },

    async updateRoleById(id, updatedRole) {
      const config = useRuntimeConfig();

      const res = await apiFetch(
        `${config.public.apiBaseUrl}/roles/${id}`,
        {
          method: "PUT",
          body: updatedRole,
        }
      );

      const index = this.roleList.findIndex((role) => role.id === id);
      if (index !== -1) {
        this.roleList[index] = { ...this.roleList[index], ...updatedRole };
      }
    },

    removeRole(id) {
      this.roleList = this.roleList.filter((role) => role.id !== id);
    },
  },
});
