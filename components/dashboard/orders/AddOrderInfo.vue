<template>
  <div class="p-4 flex flex-col lg:flex-row gap-4">
    <!-- Left Panel -->
    <div class="flex flex-col w-full lg:w-1/2">
      <img :src="selectedItem?.image" alt="" class="w-full h-auto rounded" />
      <h3 class="text-lg font-bold mt-4 text-center lg:text-left">
        {{ selectedItem?.title }}
      </h3>
    </div>

    <!-- Right Panel -->
    <div class="w-full lg:w-1/2 bg-gray-100 p-4 rounded">
      <h4 class="text-md font-semibold mb-2">Order Information</h4>
      <!-- Quantity Selector -->
      <div class="mb-4">
        <label for="quantity" class="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <QuantitySelector
          :value="quantity"
          @updateValue="updateQuantity"
        />
      </div>

      <!-- Preferences -->
      <div class="mb-4">
        <label
          for="preferences"
          class="block text-sm font-medium text-gray-700"
        >
          Preferences
        </label>
        <Textarea
          :value="preferences"
          @input="updatePreferences"
          id="preferences"
          rows="3"
          placeholder="Add Preferences"
        />
      </div>

      <!-- Submit Button -->
      <Button
        type="submit"
        @click="updateOrder"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add
      </Button>
      <Button @click="removeItemFromOrder(item.id)">
        Delete
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "~/components/reuse/ui/Button.vue";
import QuantitySelector from "~/components/reuse/ui/QuantitySelector.vue";
import Textarea from "~/components/reuse/ui/Textarea.vue";

export default {
  components: {
    QuantitySelector,
    Button,
    Textarea,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isModalOpen: false,
      selectedItem: null,
      quantity: this.quantity,
      preferences: "",
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(item) {
        this.selectedItem = item;
      },
    },
  },
  methods: {
    updateOrder() {
      const order = {
        item: this.selectedItem,
        quantity: this.quantity,
        preferences: this.preferences,
      };
      this.$emit("update-order-item", order);
    },
    removeItemFromOrder(id) {
      this.$emit("delete-order-item", id);
    },
    updateQuantity(newQuantity) {
      this.quantity = newQuantity;
    },
    updatePreferences(newValue) {
      this.preferences = newValue;
    },
  },
};
</script>
