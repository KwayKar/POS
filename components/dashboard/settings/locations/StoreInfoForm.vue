<template>
  <div>
    <div class="modal-content store-form">
      <h4 class="section-title">Basic Information</h4>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Store Name</label>
          <Input
            v-model="store.name"
            type="text"
            placeholder="e.g., Downtown Cafe"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Phone Number</label>
          <Input
            v-model="store.phoneNumber"
            type="tel"
            placeholder="Phone Number"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Email</label>
          <Input
            v-model="store.email"
            type="email"
            placeholder="Email"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Type of Store</label>
          <Select
            v-model="store.type"
            :options="storeTypes"
            placeholder="Select Store Type"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Time Zone</label>
          <Select
            v-model="store.timeZone"
            :options="timeZones"
            placeholder="Select Time Zone"
          />
        </div>
      </div>

      <div class="form-group" style="margin-bottom: 54px;">
        <h4 class="section-title">Payment Flow</h4>
        <div class="toggle-wrapper">
          <label class="toggle-label">Allow customer to pay later after ordering</label>
          <Toggle v-model="payLaterToggle" />
        </div>
      </div>

      <h4 class="section-title">Address Information</h4>
      <div class="form-grid">
        <!-- Physical Address -->
        <div class="form-group">
          <label class="form-label">Street Address</label>
          <Input
            v-model="store.street"
            type="text"
            placeholder="Street Address"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">City</label>
          <Input
            v-model="store.city"
            type="text"
            placeholder="City"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">State/Province</label>
          <Input
            v-model="store.state"
            type="text"
            placeholder="State or Province"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Postal Code</label>
          <Input
            v-model="store.postalCode"
            type="text"
            placeholder="Postal Code"
            class="w-full p-2 border rounded"
          />
        </div>

        <!-- GPS Coordinates -->
        <div class="form-group">
          <label class="form-label">Latitude</label>
          <Input
            v-model="store.latitude"
            type="number"
            step="any"
            placeholder="Latitude"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Longitude</label>
          <Input
            v-model="store.longitude"
            type="number"
            step="any"
            placeholder="Longitude"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <div>
        <p v-if="formError" class="text-red-500 mt-2">{{ formError }}</p>
      </div>

      <div class="flex justify-end my-2">
        <SubmitButton
          @click="handleSubmit"
          :apply-shadow="true"
          :isProcessing="isSubmitting"
        >
          {{ "Update" }}
        </SubmitButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Input from "~/components/reuse/ui/Input.vue";
import Select from "~/components/reuse/ui/Select.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { useStoreLocation } from "../../../../stores/storeLocation/useStoreLocation";
import Toggle from "~/components/reuse/ui/Toggle.vue";

const props = defineProps({
  panelHeight: {
    type: Number,
    default: 500,
  },
  selectedStoreId: {
    type: String,
  },
  selectedStore: {
    type: Object,
  },
});

const emit = defineEmits(["close"]);

const formError = ref("");
const isSubmitting = ref(false);
const storeStore = useStoreLocation();
// const selectedStore = computed(() => storeStore.selectedStore);

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
  timeZone: "",
  paymentConfig: {
    defaultPaymentType: "upfront", // "upfront" | "later"
    allowPartialPayment: false
  }
});

const storeTypes = [
  { label: "Cafe", value: "cafe" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Retail", value: "retail" },
  { label: "Other", value: "other" },
];

const timeZones = [
  { label: "UTC−12:00", value: "Etc/GMT+12" },
  { label: "UTC−11:00", value: "Etc/GMT+11" },
  { label: "UTC−10:00", value: "Etc/GMT+10" },
  { label: "UTC−09:00", value: "Etc/GMT+9" },
  { label: "UTC−08:00 (Pacific Time)", value: "America/Los_Angeles" },
  { label: "UTC−07:00 (Mountain Time)", value: "America/Denver" },
  { label: "UTC−06:00 (Central Time)", value: "America/Chicago" },
  { label: "UTC−05:00 (Eastern Time)", value: "America/New_York" },
  { label: "UTC+00:00 (GMT)", value: "Etc/UTC" },
  { label: "UTC+01:00 (Central European Time)", value: "Europe/Berlin" },
  { label: "UTC+07:00 (Indochina Time)", value: "Asia/Bangkok" },
  { label: "UTC+08:00 (China Standard Time)", value: "Asia/Shanghai" },
  { label: "UTC+09:00 (Japan Standard Time)", value: "Asia/Tokyo" },
  { label: "UTC+10:00 (Australian Eastern Time)", value: "Australia/Sydney" },
];

const handleSubmit = async () => {
  if (!store.value.name || !store.value.type) {
    formError.value = "Please fill the required fields.";
    return;
  }
  formError.value = "";
  isSubmitting.value = true;

  const payload = {
    name: store.value.name,
    storeType: store.value.type,
    phoneNumber: store.value.phoneNumber,
    email: store.value.email,
    timezone: store.value.timeZone,
    address: {
      street: store.value.street,
      city: store.value.city,
      state: store.value.state,
      postalCode: store.value.postalCode,
      geo: {
        lat: store.value.latitude,
        lng: store.value.longitude,
      },
    },
    paymentConfig: {
      defaultPaymentType: store.value.paymentConfig?.defaultPaymentType || "upfront",
      allowPartialPayment: store.value.paymentConfig?.allowPartialPayment || false
    },
  };

  try {
    await storeStore.updateStoreInfo(props.selectedStoreId, payload);
    emit("close");
  } catch (e) {
    formError.value = e.message || "Failed to submit";
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  if (props.selectedStoreId && props.selectedStore?.name) {
    const s = props.selectedStore;

    store.value = {
      name: s.name || "",
      street: s.address?.street || "",
      city: s.address?.city || "",
      state: s.address?.state || "",
      postalCode: s.address?.postalCode || "",
      latitude: s.address?.geo?.lat || null,
      longitude: s.address?.geo?.lng || null,
      phoneNumber: s.phoneNumber || "",
      email: s.email || "",
      type: s.storeType || "",
      timeZone: s.timezone || "",
      paymentConfig: s.paymentConfig || {
        defaultPaymentType: "upfront",
        allowPartialPayment: false,
      },
    };
  }
});

const payLaterToggle = computed({
  get: () => store.value.paymentConfig?.defaultPaymentType === "later",
  set: (val) => {
    store.value.paymentConfig.defaultPaymentType = val ? "later" : "upfront";
  },
});
</script>

<style scoped>
.store-form {
  width: 100%;
  padding: 24px 24px 0;
  height: 540px;
  overflow-y: scroll;
}

.section-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--black-2);
}

.form-grid {
  display: grid;
  column-gap: 1.5rem;
  grid-template-columns: 1fr;
  margin-bottom: 30px;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}


.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem; 
}


.toggle-label {
  font-size: 0.875rem;
  color: #555;
  margin-right: 30px;
}
</style>
