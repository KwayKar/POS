<template>
  <div>
    <div class="modal-content store-form">
      <h4 class="form-section-header">Business Information</h4>
      <p class="label-description" :style="{ padding: '6px 0 6px' }">
        This information will be shown on customer receipts.
      </p>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Logo Upload</label>
          <div class="upload-container">
            <label class="upload-box" for="fileInput" id="uploadLabel">
              <template v-if="store.logoPreview">
                <img :src="store.logoPreview" alt="Logo Preview" />
              </template>
              <template v-else> I </template>
            </label>
            <input type="file" id="fileInput" accept="image/*" />
            <div class="description">Upload an image</div>
          </div>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Business Name</label>
          <Input
            v-model="store.name"
            type="text"
            placeholder="Business Name"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Tax ID</label>
          <Input
            v-model="store.taxId"
            type="text"
            placeholder="Tax ID / VAT ID"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <!-- Additonal Information -->
      <h4 class="form-section-header">
        Additional Info <span>(Optional)</span>
      </h4>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Phone Number</label>
          <Input
            v-model="store.phoneNumber"
            type="text"
            placeholder="Phone Number"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Website</label>
          <Input
            v-model="store.website"
            type="text"
            placeholder="Website"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Wi-Fi Name</label>
          <Input
            v-model="store.wifiName"
            type="text"
            placeholder="Wi-Fi Name"
            class="w-full p-2 border rounded"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Wi-Fi Password</label>
          <Input
            v-model="store.wifiPassword"
            type="text"
            placeholder="Wi-Fi Password"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>

    <!-- Modal Footer -->
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
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { useStoreLocation } from "../../../../stores/storeLocation/useStoreLocation";

const props = defineProps({
  panelHeight: { type: Number, default: 500 },
  selectedStoreId: {
    type: String,
  },
});
const emit = defineEmits(["close"]);

const storeStore = useStoreLocation();

const formError = ref("");
const loading = ref(false);
const isSubmitting = ref(false);
const store = ref({
  name: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  phoneNumber: "",
  email: "",
  logoFile: null,
  logoPreview:
    "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702672435/gravy/production/Gravy::MasterProduct/Q423_OLO_MisoSalmonGlazedPlate_3600x2400_2_orq1kg",
  taxId: "",
  website: "",
  wifiName: "",
  wifiPassword: "",
});
const selectedStore = computed(() => storeStore.selectedStore);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    logoPreview.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  // Validate required fields
  if (!store.value.name || !store.value.street) {
    formError.value = "Please fill in required fields (name & street).";
    return;
  }

  formError.value = "";
  loading.value = true;
  isSubmitting.value = true;

  try {
    await storeStore.updateStoreReceipt(
      props.selectedStoreId,
      selectedStore.value
    );
    emit("close");
  } catch (err) {
    formError.value = "Failed to save receipt info.";
  } finally {
    loading.value = false;
    isSubmitting.value = false;
  }
};

onMounted(() => {
  if (selectedStore.value?.receiptSettings) {
    store.value = { ...selectedStore.value?.receiptSettings };
  }
});
</script>

<style scoped>
.store-form {
  width: 100%;
  padding: 24px 24px 0;
  height: 540px;
  overflow-y: scroll;
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

.upload-container {
  display: inline-block;
  text-align: center;
  font-family: Arial, sans-serif;
}

/* Hide the default input */
.upload-container input[type="file"] {
  display: none;
}

.upload-box {
  width: 150px;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  background-color: #fafafa;
  transition: border-color 0.3s ease;
}

.upload-box:hover {
  border-color: #666;
}

/* Icon I in a box */
.upload-icon {
  font-size: 48px;
  font-weight: bold;
  color: #999;
  pointer-events: none;
}

/* Preview image */
.upload-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.description {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}
</style>
