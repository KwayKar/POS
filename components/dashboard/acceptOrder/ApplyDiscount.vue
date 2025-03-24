<template>
  <div class="apply-discount-container space-y-4">
    <!-- Input and Apply Button -->
    <FormTitle>Apply Discount</FormTitle>
    <div class="flex items-center space-x-4">
      <Input
        v-model="discountCode"
        type="text"
        placeholder="Enter discount code"
        class="px-4 py-2 flex-1"
      />
      <Button @click="applyDiscount" class="px-4 py-2">
        Apply 
      </Button>
    </div>

    <!-- Border Line -->
    <div class="border-b my-4"></div>

    <!-- Seasonal Discount Section -->
    <div class="pb-4">
      <FormTitle>Seasonal Discounts</FormTitle>
      <div class="mt-4">
        <RadioInput
            :value="selectedDiscount"
            :options="discountOptions"
            @updateValue="updateSelectedDiscount"
            id="seasonal-discounts"
        />
     </div>
    </div>
  </div>
</template>

<script>
import FormTitle from "~/components/reuse/general/formTitle/FormTitle.vue";
import Button from "~/components/reuse/ui/Button.vue";
import Input from "~/components/reuse/ui/Input.vue";
import RadioInput from "~/components/reuse/ui/RadioInput.vue";

export default {
  components: {
    RadioInput,
    Button,
    Input,
    FormTitle
  },
  data() {
    return {
      discountCode: "",
      selectedDiscount: null,
      discountOptions: [
        { display: "Black Friday Sale", id: "black-friday" },
        { display: "New Year Offer", id: "new-year" },
        { display: "Summer Discount", id: "summer" },
      ],
    };
  },
  methods: {
    applyDiscount() {
      if (this.discountCode.trim() !== "") {
        this.discountCode = "";
      } else {
        alert("Please enter a discount code.");
      }
    },
    updateSelectedDiscount(value) {
      this.selectedDiscount = value;
    },
  },
};
</script>

<style>
.apply-discount-container {
  margin: 0 auto;
  padding: 12px;
  box-sizing: border-box;
}
.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
.btn-primary:hover {
  background-color: #0056b3;
}
</style>
