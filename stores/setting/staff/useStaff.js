import { defineStore } from "pinia";
import { useAdmin } from "~/stores/admin/useAdmin";
import { apiFetch } from "~/utils/apiFetch";

export const useStaff = defineStore("staff", {
  state: () => ({
    staffList: [],
    roles: [],
    stores: []
  }),
  actions: {
    async fetchStaffList() {
      const config = useRuntimeConfig();
      const admin = useAdmin();

      const res = await apiFetch(
        `${config.public.apiBaseUrl}/staff?establishmentId=${admin.estId}&userId=${admin.userId}`
      );
     
      this.staffList = res || [];
    },
     async getStaffById(id) {
      const config = useRuntimeConfig();
      const res = await apiFetch(`${config.public.apiBaseUrl}/staff/${id}`, {
        method: "GET",
      })
      this.staff = res;
      return res;
    },
    async addStaff(item) {
      try {
        const config = useRuntimeConfig();
        const { name, email, roleId, storeIds, phoneNumber } = item;
        const admin = useAdmin();

        const res = await apiFetch(`${config.public.apiBaseUrl}/staff/register`, {
          method: "POST",
          body: {
            name,
            email,
            phoneNumber,
            roleId,
            storeIds,
            establishmentId: admin.estId,
          }
        })

        this.staffList.push(res.data);
        return res;
      } catch (e) {
        throw err;
      }
    },
    removeStaff(id) {
      this.staffList = this.staffList.filter((staff) => staff.id !== id);
    },
    async editStaff(updatedItem) {
      const index = this.staffList.findIndex((staff) => staff.id === updatedItem.id);
      const config = useRuntimeConfig();

      const res = await apiFetch(`${config.public.apiBaseUrl}/staff/${updatedItem.id}`, {
        method: "PUT",
        body: {
          ...updatedItem
        }
      });

      if (!res || res.error) {
        throw new Error(res?.error || "Failed to update");
      }

      if (index !== -1) {
        this.staffList[index] = res;
      };

      return res;
    },
  },
});
