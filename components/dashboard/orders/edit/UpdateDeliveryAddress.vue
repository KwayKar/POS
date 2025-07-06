<template>
  <h3 class="modal-title">Update Delivery</h3>

  <div class="modal-content">
    <div class="form-group">
      <label for="address" class="form-label">Delivery Address</label>
      <Textarea v-model="address" :rows="2" placeholder="Address" />
    </div>

    <div class="form-field">
      <label for="phoneNumber" class="form-label">Phone Number</label>
      <Input v-model="phoneNumber" type="text" placeholder="Phone number" />
    </div>
  </div>

  <div class="modal-submit-section">
    <Button
      @click="confirmUpdate"
      color="var(--white-1)"
      :applyShadow="true"
      variant="primary"
    >
      Update
    </Button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useOrder } from "~/stores/order/useOrder";

import Button from "~/components/reuse/ui/Button.vue";
import Input from "~/components/reuse/ui/Input.vue";
import Textarea from "~/components/reuse/ui/Textarea.vue";

const props = defineProps({
  isOpen: Boolean,
  address: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

const address = ref(props.address);
const phoneNumber = ref(props.phoneNumber);

const orderStore = useOrder();

watch(
  () => props.address,
  (newVal) => {
    address.value = newVal;
  }
);

watch(
  () => props.phoneNumber,
  (newVal) => {
    phoneNumber.value = newVal;
  }
);

function confirmUpdate() {
  orderStore.updateDeliveryInfo(address.value, phoneNumber.value);
  emit("close");
}
</script>

<style scoped>
.modal-title {
  font-size: 18px;
  margin-bottom: 12px;
}

.form-control label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

.modal-submit-section {
  text-align: right;
  margin-top: 24px;
}
</style>
