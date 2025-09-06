<template>
  <div class="setting-header-section">
    <div class="setting-container">
      <h3 class="header3">Organization</h3>

      <div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Organization Name</label>
            <div>
              <Input
                v-model="orgInfo.name"
                type="text"
                placeholder="Organization Name"
                class="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="orgInfo.stores.length" class="table-container overflow-x-auto">
        <label class="form-label">Stores</label>
        <table class="table" style="border: 1px solid #cfcfcf !important">
          <thead class="tableHeader bg-gray-100">
            <tr>
              <th class="tableHeaderCol">Name</th>
              <th class="tableHeaderCol">Address</th>
            </tr>
          </thead>
          <tbody class="scrollable-tbody">
            <tr v-for="store in orgInfo.stores" :key="store.id">
              <td class="row-cell">{{ store.name }}</td>
              <td class="row-cell">
                {{ store.address?.street }}, {{ store.address?.city }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel-bottom">
      <div class="error-message" v-if="formError.length">{{ formError }}</div>
      <div class="success-message" v-if="successMessage.length">
        {{ successMessage }}
      </div>
      <div v-if="!formError.length || !successMessage.length" />
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
import { ref } from "vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import Input from "~/components/reuse/ui/Input.vue";
import { useAdmin } from "~/stores/admin/useAdmin";
import { apiFetch } from "~/utils/apiFetch";
import { useSetting } from "~/stores/setting/useSetting";
import './../css/settingStyles.css'

const adminStore = useAdmin();
const settingStore = useSetting();
const orgInfo = settingStore.orgInfo;

const formError = ref("");
const successMessage = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  successMessage.value = "";
  try {
    if (!orgInfo.name) {
      formError.value = "Please fill the organization name.";
      return;
    }

    formError.value = "";
    loading.value = true;

    const config = useRuntimeConfig();
    await apiFetch(
      `${config.public.apiBaseUrl}/establishments/${adminStore.estId}`,
      {
        method: "PUT",
        body: { name: orgInfo.name },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    successMessage.value = "Successfully Updated";
    loading.value = false;
  } catch (e) {
    formError.value = "Failed to update.";
    loading.value = false;
  }
};
</script>

<style scoped>
</style>
