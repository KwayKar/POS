<template>
  <div style="height: 100%">
    <div class="modal-content container-form">
      <h4 class="form-section-header">Tax Information</h4>
      <p class="label-description" :style="{ padding: '6px 0 16px' }">
        Add tax types and amounts based on your business requirements.
      </p>

      <div v-for="(tax, index) in taxes" :key="index" class="flex gap-4 mb-3">
        <!-- Tax Type -->
        <div class="flex-1">
          <Input
            v-model="tax.type"
            placeholder="Tax Type (e.g., Takeaway)"
            class="form-input w-full"
          />
        </div>

        <!-- Tax Amount -->
        <div class="flex-1">
          <Input
            type="number"
            v-model="tax.amount"
            placeholder="Amount (%)"
            min="0"
            class="form-input w-full"
          />
        </div>

        <!-- Remove Button -->
        <button
          type="button"
          class="remove-btn text-red-500 font-bold"
          @click="removeTax(index)"
        >
          ✕
        </button>
      </div>

      <Button
        variant="primary"
        @click="addTax"
        style="
          font-size: 0.9rem;
          height: 34px;
          border: 1px solid var(--black-1);
        "
      >
        Add
      </Button>
    </div>

    <div class="modal-footer" :style="{ margin: '10px 20px 10px' }">
      <div>
        <p v-if="formError" class="text-red-500 mt-2">{{ formError }}</p>
      </div>

      <div class="flex justify-end my-2">
        <SubmitButton
          @click="handleSubmit"
          :apply-shadow="true"
          :isProcessing="isSubmitting"
        >
          {{ "Submit" }}
        </SubmitButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Input from "~/components/reuse/ui/Input.vue";
import Button from "~/components/reuse/ui/Button.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { useStoreLocation } from "../../../../stores/storeLocation/useStoreLocation";

const storeStore = useStoreLocation();
const selectedStore = computed(() => storeStore.selectedStore);

const formError = ref("");
const isSubmitting = ref(false);
const taxes = ref([{ type: "", amount: "" }]);
const emit = defineEmits(["close"]);

const addTax = () => {
  taxes.value = [...taxes.value, { type: "", amount: "" }];
};

const removeTax = (index) => {
  taxes.value.splice(index, 1);
};

const handleSubmit = async () => {
  // Validation - all tax entries must have type & amount
  const invalid = taxes.value.some(
    (tax) => !tax.type?.trim() || tax.amount === "" || tax.amount === null
  );

  if (invalid) {
    formError.value = "Please fill in all tax types and amounts.";
    return;
  }

  formError.value = "";
  isSubmitting.value = true;

  try {
    await storeStore.updateStoreTax(selectedStore.value?.id, taxes.value);
    emit("close");
  } catch (err) {
    formError.value = "Failed to update tax info.";
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  if (selectedStore.value?.taxInfo) {
    taxes.value = [...selectedStore.value?.taxInfo];
  }
});
</script>

<style scoped>
.container-form {
  padding: 24px 24px 0;
  height: 545px;
  overflow-y: auto;
}
</style>
