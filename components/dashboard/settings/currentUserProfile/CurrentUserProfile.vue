<template>
  <div
    class="setting-header-section"
    ref="panelRef"
  >
    <div class="setting-container" v-if="staff?.name || staff?.email">
      <h3 class="header3">User Profile</h3>

      <div class="form-grid" style="padding-bottom: 10rem">
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

        <div />

        <div class="form-group">
          <label class="form-label">Stores</label>
          <div class="selected-items">
            <span
              v-for="item in staff.staffStores"
              :key="item"
              class="selected-item"
            >
              {{ item.store.name }}
            </span>
          </div>
        </div>

        <div />

        <div class="form-group">
          <label class="form-label">Assigned Role</label>
          <div class="selected-items">
            <span class="selected-item">
              {{ staff.role.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-bottom">
      <div>
        <div class="error-message" v-if="formError">{{ formError }}</div>
        <div class="success-message" v-if="successMessage">
          {{ successMessage }}
        </div>
      </div>
      <SubmitButton
        :applyShadow="true"
        @click="handleSubmit"
        :style="{
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? 'none' : 'auto',
        }"
      >
        Update
      </SubmitButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import Input from "~/components/reuse/ui/Input.vue";
import { useStaff } from "~/stores/setting/staff/useStaff";
import { useSetting } from "~/stores/setting/useSetting";
import './../css/settingStyles.css'
import { watch } from "vue";

const staffStore = useStaff();
const settingStore = useSetting();

const staff = settingStore.currentUser;
const panelRef = ref(null);
const panelHeight = ref(0);
const formError = ref("");
const successMessage = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  successMessage.value = "";
  try {
    if (!staff.name && !staff.email) {
      formError.value = "Please fill the required fields.";
      return;
    }

    formError.value = "";
    loading.value = true;

    const payload = {
      id: staff.id,
      name: staff.name,
      email: staff.email,
      phoneNumber: staff.phoneNumber,
    };
    await staffStore.editStaff(payload);

    successMessage.value = "Successfully Updated";
    loading.value = false;
  } catch (e) {
    formError.value = e.message || "Failed to submit";
    loading.value = false;
  }
};

const calculateHeight = () => {
  if (!panelRef.value) return;
  const viewportHeight = window.innerHeight;
  const topOffset = panelRef.value.getBoundingClientRect().top;
  const bottomMargin = 80;
  panelHeight.value = viewportHeight - topOffset - bottomMargin;
};

onMounted(async () => {
  calculateHeight();
  window.addEventListener("resize", calculateHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateHeight);
});

watch(
  () => settingStore.currentUser,
  (newUser) => {
    Object.assign(staff, newUser);
  }
);
</script>

<style scoped>

</style>
