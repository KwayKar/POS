<template>
  <h3 class="modal-title">{{ mode === "edit" ? "Update" : "Create" }} Staff</h3>

  <div class="modal-content staff-form">
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">Name</label>
        <div>
          <Input
            v-model="staff.name"
            type="text"
            placeholder="Staff Name"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Email</label>
        <div>
          <Input
            v-model="staff.email"
            type="text"
            placeholder="Email"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Phone</label>
        <div>
          <Input
            v-model="staff.phoneNumber"
            type="number"
            placeholder="Phone Number"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <!-- Store Select -->
      <div class="form-group">
        <label class="form-label">Locations</label>
         <MultiSelect
            v-model="staff.storeIds"
            :options="storeList"
          />
      </div>

      <!-- Role Select -->
      <div class="form-group">
        <label class="form-label">Role</label>
        <Select v-model="staff.roleId" :options="roleList" />
      </div>
    </div>
  </div>

  <div>
    <p v-if="formError" class="text-red-500 mt-2 ml-6">{{ formError }}</p>
  </div>

  <div class="modal-footer">
    <div class="flex justify-end my-2">
      <Button variant="danger" @click="onConfirmDelete" :apply-shadow="true">
        Delete
      </Button>
    </div>

    <div class="flex justify-end my-2">
      <SubmitButton @click="handleSubmit" :apply-shadow="true">
        {{ mode === "edit" ? "Update" : "Create" }}
      </SubmitButton>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'remove-staff'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <ConfirmDelete @remove-item="handleRemove" @close="closeModal">
      <div>
        <p style="font-size: 0.95rem">Are you sure you want to delete {{ modal?.selectedItem?.name }}?</p>
      </div>
    </ConfirmDelete>
  </Modal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineProps, defineEmits } from "vue";
import Input from "~/components/reuse/ui/Input.vue";
import Select from "~/components/reuse/ui/Select.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { useStaff } from "~/stores/setting/staff/useStaff";
import { useRole } from "../../../../stores/setting/staff/useRole";
import { useStoreLocation } from "../../../../stores/storeLocation/useStoreLocation";
import MultiSelect from "~/components/reuse/ui/MultiSelect.vue";
import Button from "~/components/reuse/ui/Button.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";

const props = defineProps({
  mode: {
    type: String,
    default: "create", // or "edit"
  },
  item: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);
const formError = ref("");
const loading = ref(false);
const modal = ref({
  type: null,
  isOpen: false,
  selectedItem: null
});

const staffStore = useStaff();
const roleStore = useRole();
const storeLocationStore = useStoreLocation();

const staff = ref({
  id: "",
  name: "",
  email: "", 
  phoneNumber: "",
  roleId: "",
  storeIds: [],
});
const storeList = computed(() =>
  storeLocationStore.storeList.map((r) => ({
    name: r.name, 
    id: r.id,  
  }))
);
const roleList = computed(() =>
  roleStore.roleList.map((r) => ({
    label: r.name, 
    value: r.id,  
  }))
);

const handleSubmit = async () => {
  try {
    if (!staff.value.name || !staff.value.roleId || !staff.value.storeIds) {
      formError.value = "Please fill the required fields.";
      return;
    } 
    formError.value = '';
    loading.value = true;

    if (props.mode === "edit") {
      await staffStore.editStaff(staff.value);
    } else {
      await staffStore.addStaff(staff.value);
    }

    loading.value = false;
    emit("close");
  } catch (e) {
    formError.value = e.message || "Failed to submit";
  }
};

onMounted(() => {
  if (props.mode === "edit" && props.item) {
    staff.value = { ...props.item };
    staff.value.storeIds = (staff.value.staffStores || []).map((s) => s.storeId);
  }
});

const onConfirmDelete = () => {
  modal.value = {
    type: "remove-staff",
    isOpen: true,
    selectedItem: props.item
  };
}

const handleRemove = () => {
  staffStore.removeStaff(modal.value.selectedItem?.id);
  closeModal();
  emit("close");
}

const closeModal = () => {
  modal.value = {
    type: null,
    isOpen: false,
    selectedItem: null
  };
};
</script>

<style scoped>
.staff-form {
  width: 100%;
  padding: 10px 20px 20px;
}

.form-grid {
  display: grid;
  column-gap: 1rem; 
  grid-template-columns: 1fr; /* mobile */
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 per row on desktop */
  }
}

</style>
