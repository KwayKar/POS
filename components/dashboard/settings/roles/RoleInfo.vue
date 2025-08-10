<template>
  <h3 class="modal-title">{{ mode === "edit" ? "Update" : "Create" }} Staff</h3>

  <form class="form-container">
    <!-- First Row: Role Name & Summary -->
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Role Name</label>
        <Input
          v-model="role.name"
          type="text"
          placeholder="Role Title"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Summary</label>
        <Textarea
          v-model="role.summary"
          :rows="3"
          placeholder="Enter summary"
        />
      </div>
    </div>

    <div v-for="section in sections" :key="section" class="checkbox-row">
      <div class="section-label">
        <label class="form-label">{{ section }}</label>
      </div>

      <div class="checkbox-wrapper">
        <Checkbox
          v-for="action in actions"
          :key="`${section}-${action}`"
          :id="`${section}-${action}`"
          v-model="selectedPermissions[section][action]"
          class="checkbox-item"
        >
          {{ action }}
        </Checkbox>
      </div>
    </div>
  </form>

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
import { reactive } from "vue";
import Checkbox from "~/components/reuse/ui/Checkbox.vue";
import Input from "~/components/reuse/ui/Input.vue";
import Textarea from "~/components/reuse/ui/Textarea.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { useRole } from "../../../../stores/setting/staff/useRole";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["close"]);
const formError = ref("");
const loading = ref(false);

const role = reactive({
  id: props.item?.id || undefined,
  name: props.item.name || "",
  summary: props.item?.summary || "",
  permissions: props.item.permissions || {},
});
const sections = ["Product", "Order", "Staff"];
const actions = ["create", "read", "update", "delete"];

const roleStore = useRole();
const selectedPermissions = reactive({});

for (const section of sections) {
  selectedPermissions[section] = {};
  for (const action of actions) {
    selectedPermissions[section][action] =
      props.item.permissions?.[section]?.includes(action) || false;
  }
}

const handleSubmit = async () => {
  if (!role.name) {
    formError.value = "Please fill the required fields.";
    return;
  }

  role.permissions = {};

  for (const section of sections) {
    role.permissions[section] = [];
    for (const action of actions) {
      if (selectedPermissions[section][action]) {
        role.permissions[section].push(action);
      }
    }

    if (role.permissions[section].length === 0) {
      delete role.permissions[section];
    }
  }

  loading.value = true;
  if (props.mode === "edit") {
    await roleStore.updateRoleById(role.id, role);
  } else {
    await roleStore.addRole(role);
  }

  loading.value = false;
  emit("close");
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  padding: 20px 24px;
  max-height: 400px;
  overflow-y: auto;
}
@media (max-width: 768px) {
  .form-container {
    max-height: 66.5vh;
  }
}


.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.section-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
}

.checkbox-row {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 16px;
  margin-top: 1rem;
}
@media (min-width: 768px) {
  .checkbox-row {
    flex-direction: row;
  }
}

.section-label {
  flex: 1;
}

@media (min-width: 768px) {
  .section-label {
    flex: 1;
    max-width: 160px;
  }

  .checkbox-wrapper {
    flex: 2 1 0%;
  }
}

.section-label .form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

.checkbox-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  width: 100%;
}

@media (max-width: 768px) {
  .checkbox-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

.checkbox-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  border-radius: 0 0 8px 8px;
  background: var(--primary-bg-color-1);
  margin: 0 24px 20px;
}
</style>
