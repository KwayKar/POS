<template>
  <h3 class="modal-title">{{ mode === "edit" ? "Update" : "Create" }} Store Location</h3>

  <div class="modal-content store-form">
    <div class="form-grid">
      <!-- Store Name -->
      <div class="form-group">
        <label class="form-label">Store Name</label>
        <Input
          v-model="store.name"
          type="text"
          placeholder="e.g., Downtown Cafe"
          class="w-full p-2 border rounded"
        />
      </div>

      <!-- Physical Address -->
      <div class="form-group">
        <label class="form-label">Street Address</label>
        <Input v-model="store.street" type="text" placeholder="Street Address" class="w-full p-2 border rounded" />
      </div>

      <div class="form-group">
        <label class="form-label">City</label>
        <Input v-model="store.city" type="text" placeholder="City" class="w-full p-2 border rounded" />
      </div>

      <div class="form-group">
        <label class="form-label">State/Province</label>
        <Input v-model="store.state" type="text" placeholder="State or Province" class="w-full p-2 border rounded" />
      </div>

      <div class="form-group">
        <label class="form-label">Postal Code</label>
        <Input v-model="store.postalCode" type="text" placeholder="Postal Code" class="w-full p-2 border rounded" />
      </div>

      <!-- GPS Coordinates -->
      <div class="form-group">
        <label class="form-label">Latitude</label>
        <Input v-model="store.latitude" type="number" step="any" placeholder="Latitude" class="w-full p-2 border rounded" />
      </div>

      <div class="form-group">
        <label class="form-label">Longitude</label>
        <Input v-model="store.longitude" type="number" step="any" placeholder="Longitude" class="w-full p-2 border rounded" />
      </div>

      <!-- Phone -->
      <div class="form-group">
        <label class="form-label">Phone Number</label>
        <Input v-model="store.phoneNumber" type="tel" placeholder="Phone Number" class="w-full p-2 border rounded" />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label class="form-label">Email</label>
        <Input v-model="store.email" type="email" placeholder="Email" class="w-full p-2 border rounded" />
      </div>

      <!-- Store Type -->
      <div class="form-group">
        <label class="form-label">Type of Store</label>
        <Select
          v-model="store.type"
          :options="storeTypes"
          placeholder="Select Store Type"
        />
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
import Input from "~/components/reuse/ui/Input.vue";
import Select from "~/components/reuse/ui/Select.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";

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

const store = ref({
  name: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  latitude: null,
  longitude: null,
  phoneNumber: "",
  email: "",
  type: "",
});

const storeTypes = [
  { label: "Cafe", value: "cafe" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Retail", value: "retail" },
  { label: "Other", value: "other" },
];

const handleSubmit = async () => {
  try {
    if (!store.value.name || !store.value.type) {
      formError.value = "Please fill the required fields.";
      return;
    }
    formError.value = "";
    loading.value = true;

    // Call your store API here for create or update,
    // e.g. await storeLocationStore.addOrUpdateStore(store.value);

    loading.value = false;
    emit("close");
  } catch (e) {
    formError.value = e.message || "Failed to submit";
  }
};

onMounted(() => {
  if (props.mode === "edit" && props.item) {
    store.value = { ...props.item };
  }
});
</script>

<style scoped>
.store-form {
  width: 100%;
  padding: 20px;
}

.form-grid {
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
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
