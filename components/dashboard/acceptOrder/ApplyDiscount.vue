<template>
  <div class="apply-discount-container">
    <div class="modal-title">
      <h3 class="header3">Apply Discount</h3>
    </div>

    <div class="modal-content modal-body">
      <div class="">
        <label for="code" class="form-label">Code</label>
        <Input
          v-model="couponCode"
          type="text"
          placeholder="Coupon code"
        />
      </div>
    </div>

    <div class="footer">
      <div class="modal-submit-section-btn flex justify-end">
        <div class="flex-1">
        <p v-if="formError" class="text-red-500 mt-2">
          {{ formError }}
        </p>
      </div>
        <SubmitButton @click="applyDiscount" :applyShadow="true">
          Apply 
        </SubmitButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Input from "~/components/reuse/ui/Input.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { usePosStore } from "~/stores/pos/usePOS";

const couponCode = ref("");
const formError = ref("");
const pos = usePosStore();

const emit = defineEmits(["close"]);

function applyDiscount() {
  if (couponCode.value.trim() !== "") {
    pos.applyCoupon(couponCode.value);
    couponCode.value = "";
    formError.value = "";
    emit("close");
  } else {
    formError.value = "Please enter a discount code.";
  }
}
</script>


<style>
.modal-body {
  padding: 6px 16px 0px;
  margin-bottom: 20px;
}

.footer {
  margin: 12px 0 18px;
}

.apply-discount-container {
  margin: 0 auto;
  box-sizing: border-box;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
}

</style>
