<template>
    <h3 class="modal-title">Payment Details</h3>

    <div class="form-control mt-2">
      <label>Payment Method</label>
      <Select v-model="selectedPaymentMethod" :options="paymentMethods" />
    </div>

    <div class="form-control">
      <label>Payment Status</label>
      <Select v-model="selectedPaymentStatus" :options="paymentStatuses" />
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
import Select from "~/components/reuse/ui/Select.vue";
import { useOrder } from "~/stores/order/useOrder";
import './modalStyles.css'; 

export default {
  components: {
    Select,
    Button,
  },
  props: {
    isOpen: Boolean,
    order: Object,
  },
  data() {
    return {
      orderStore: useOrder(),
      paymentMethods: [
        { label: "Credit Card", value: "credit" },
        { label: "PayPal", value: "paypal" },
        { label: "Bank Transfer", value: "bank" },
      ],
      paymentStatuses: [
        { label: "Pending", value: "pending" },
        { label: "Paid", value: "paid" },
        { label: "Failed", value: "failed" },
      ],
      selectedPaymentMethod: null,
      selectedPaymentStatus: null,
    };
  },
  mounted() {
    if (this.order) {
      this.selectedPaymentMethod = this.paymentMethods.find(
        (item) => item.value === this.order.paymentMethod
      );
      this.selectedPaymentStatus = this.paymentStatuses.find(
        (item) => item.value === this.order.paymentStatus
      );
    }
  },
  methods: {
    confirmUpdate() {
      this.orderStore.updatePaymentDetails({
        orderId: 'ORD001',
        paymentMethod: this.selectedPaymentMethod,
        paymentStatus: this.selectedPaymentStatus,
      });

      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>

</style>
