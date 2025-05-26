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
            placeholder="Enter staff name"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div v-if="mode === 'edit'" class="form-group">
        <label class="form-label">ID</label>
        <div style="opacity: 0.7; pointer-events: none;">
          <Input
            v-model="staff.id"
            type="text"
            placeholder="Enter staff name"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <!-- Role Select -->
      <div class="form-group">
        <label class="form-label">Role</label>
        <Select v-model="staff.role" :options="roles" />
      </div>

      <!-- Group Select -->
      <div class="form-group">
        <label class="form-label">Group</label>
        <Select v-model="staff.group" :options="groups" />
      </div>
    </div>
  </div>

  <div class="modal-footer">
    <div>
      <p v-if="formError" class="text-red-500 mt-2">{{ formError }}</p>
    </div>

    <div class="flex justify-end my-2">
      <SubmitButton @click="handleSubmit" :apply-shadow="true">
        {{ mode === "edit" ? "Update" : "Create" }}
      </SubmitButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineProps, defineEmits } from "vue";
import Input from "~/components/reuse/ui/Input.vue";
import Select from "~/components/reuse/ui/Select.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { useStaff } from "~/stores/setting/staff/useStaff";

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
const staffStore = useStaff();
const roles = staffStore.roles;
const groups = staffStore.groups;

const staff = ref({
  id: "",
  name: "",
  role: "",
  group: "",
});

const handleSubmit = () => {
  if (!staff.value.name || !staff.value.role || !staff.value.group) {
    formError.value = "Please fill all fields.";
    return;
  } 
  formError.value = '';

  if (props.mode === "edit") {
    staffStore.editStaff(staff.value);
  } else {
    staffStore.addStaff(staff.value);
  }

  emit("close");
};

onMounted(() => {
  if (props.mode === "edit" && props.item) {
    staff.value = { ...props.item };
  }
});
</script>

<style scoped>
.staff-form {
  width: 100%;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr; /* mobile */
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 per row on desktop */
  }
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  border-radius: 0 0 8px 8px;
  background: var(--primary-bg-color-1);
  margin: 0 32px 20px;
}
</style>
