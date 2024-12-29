<template>
  <DashboardLayout>
    <NavPanel
      class="fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16 bg-white shadow"
    />
    <div class="w-full px-4 py-8">
      <div class="flex justify-between items-center mb-4">
        <div class="flex-grow"></div>
        <button
          @click="openModal('create', null)"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Staff
        </button>
      </div>

      <div class="bg-white shadow rounded-md overflow-hidden">
        <table class="table-auto w-full text-left">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-gray-600 font-medium">Name</th>
              <th class="px-6 py-3 text-gray-600 font-medium">Email</th>
              <th class="px-6 py-3 text-gray-600 font-medium">Phone</th>
              <th class="px-6 py-3 text-gray-600 font-medium">Role</th>
              <th
                class="px-6 py-3 text-gray-600 font-medium"
                style="text-align: right"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in staff"
              :key="user.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="px-6 py-3">{{ user.name }}</td>
              <td class="px-6 py-3">{{ user.email }}</td>
              <td class="px-6 py-3">{{ user.phone }}</td>
              <td class="px-6 py-3">{{ user.role }}</td>
              <td class="px-6 py-3" style="text-align: right">
                <button
                  @click="openModal('edit', user)"
                  class="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  @click="openModal('delete', user)"
                  class="ml-4 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="staff.length === 0">
              <td colspan="4" class="px-9 py-9 text-center text-gray-500">
                No Users
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal
      v-if="modal.isOpen && (modal.type === 'edit' || modal.type === 'create')"
      width="560px"
      @close="closeModal"
    >
      <EditStaff
        :mode="modal.type"
        :staff="selectedItem"
        @save-staff="updateStaff"
        @close="closeModal"
      />
    </Modal>

    <Modal
      v-if="modal.isOpen && modal.type === 'delete'"
      width="420px"
      height="170px"
      @close="closeModal"
    >
      <ConfirmDelete @remove-item="removeStaff" @close="closeModal">
        Are you sure you want to delete {{ selectedItem.name }}?
      </ConfirmDelete>
    </Modal>
  </DashboardLayout>
</template>

<script>
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import EditStaff from "~/components/dashboard/staff/EditStaff.vue";
import { validateEmail } from "@/utils/validateEmail";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import bcrypt from 'bcryptjs';

export default {
  components: {
    DashboardLayout,
    NavPanel,
    Modal,
    EditStaff,
    ConfirmDelete,
  },
  data() {
    return {
      selectedItem: null,
      staff: [
        {
          id: 1,
          name: "Akira",
          phone: "09321312",
          role: "Admin",
          email: "akira@gmail.com",
          passcode: '',
        },
      ],
      modal: {
        type: "",
        isOpen: false,
      },
    };
  },
  methods: {
    updateStaff(item) {
      if (this.modal.type === "create") {
        this.staff = [...this.staff, item];
      } else if (this.modal.type === "edit") {
        const index = this.staff.findIndex((user) => user.id === item.id);
        if (index !== -1) {
          this.staff[index] = { ...item };
        }
      }
      this.closeModal();
    },
    removeStaff() {
      this.staff = this.staff.filter((user) => user.id !== this.selectedItem.id);
      this.closeModal();
    },
    openModal(type, item) {
      this.modal = {
        type,
        isOpen: true,
      };
      this.selectedItem = { ...item };
    },
    closeModal() {
      this.modal = {
        type: null,
        isOpen: false,
      };
    },
    checkEmail() {
      this.isValid = validateEmail(this.email);
    },
  },
};
</script>

<style scoped></style>
