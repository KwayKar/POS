<template>
  <h3 class="modal-title">Update Delivery Address</h3>

  <div class="form-control mt-2">
    <label for="address">Delivery Address</label>
    <Input v-model="address" type="text" />
  </div>

  <div class="modal-submit-section">
    <Button
      @click="confirmUpdate"
      color="var(--white-1)"
      background="var(--primary-btn-color)"
      :applyShadow="true"
    >
      Update
    </Button>
  </div>
</template>

<script>
import Button from "~/components/reuse/ui/Button.vue";
import "./modalStyles.css";
import Input from "~/components/reuse/ui/Input.vue";
import { useOrder } from "~/stores/order/useOrder";

export default {
  components: {
    Button,
    Input,
  },
  props: {
    isOpen: Boolean,
    currentAddress: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      address: this.currentAddress,
      orderStore: useOrder(),
    };
  },
  watch: {
    currentAddress(newVal) {
      this.address = newVal;
    },
  },
  methods: {
    confirmUpdate() {
      this.orderStore.updateDeliveryAddress(this.address);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped></style>
