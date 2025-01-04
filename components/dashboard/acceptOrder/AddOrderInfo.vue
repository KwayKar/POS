<template>
  <div class="flex flex-col lg:flex-row">
    <!-- Left Panel -->
    <div class="flex flex-col w-full lg:w-1/2 p-4">
      <img :src="selectedItem?.image" alt="" class="w-full h-auto rounded" />
      <h3 class="text-lg font-bold mt-4 text-center lg:text-left">
        {{ selectedItem?.title }}
      </h3>
    </div>

    <!-- Right Panel -->
    <div class="w-full lg:w-1/2 bg-gray-100 p-4 rounded">
      <h4 class="text-md font-semibold mb-6">Order Information</h4>

      <div class="mb-8">
        <label
          for="quantity"
          class="my-3 block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <div class="w-full">
          <QuantitySelector
            :value="form.quantity"
            :min="1"
            @updateValue="updateQuantity"
          />
        </div>
      </div>

      <!-- Sizes -->
      <div v-if="selectedItem?.sizes" class="mb-8">
        <label
          for="preferences"
          class="my-3 block text-sm font-medium text-gray-700"
        >
          Sizes
        </label>
        <RadioInput
          :value="form?.size"
          :options="sizeOptions"
          @updateValue="updateSize"
          id="sizes"
        />
      </div>

      <!-- Preferences -->
      <div class="mb-4">
        <label
          for="preferences"
          class="my-3 block text-sm font-medium text-gray-700"
        >
          Preferences
        </label>
        <Textarea
          :value="form.preferences"
          @input="updatePreferences"
          id="preferences"
          rows="3"
          placeholder="Add Preferences"
        />
      </div>

      <!-- Submit Button -->
      <div class="flex items-center space-x-2 mb-2">
        <Button
          @click="removeItemFromOrder(item.id)"
          class="flex items-center h-10 text-white rounded hover:bg-red-600"
          style="background: var(--red-1)"
        >
          <!-- Delete -->
          <Icons icon="Trash" backgroundColor="'#f0f0f0'" />
        </Button>
        <Button
          type="submit"
          @click="updateOrder"
          class="flex-[2] h-10 text-white py-2 px-4 rounded hover:bg-blue-600"
          style="background: var(--primary-btn-color-2)"
        >
          Add
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "~/components/reuse/icons/Icons.vue";
import Button from "~/components/reuse/ui/Button.vue";
import QuantitySelector from "~/components/reuse/ui/QuantitySelector.vue";
import RadioInput from "~/components/reuse/ui/RadioInput.vue";
import Textarea from "~/components/reuse/ui/Textarea.vue";

export default {
  components: {
    QuantitySelector,
    Button,
    Textarea,
    Icons,
    RadioInput,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    modalType:  {
      type: String,
      required: true,
    },
    orderForm: {
      type: Object,
      default: () => ({
        quantity: 1,
        preferences: "",
        size: null,
      }),
    },
  },
  data() {
    return {
      isModalOpen: false,
      selectedItem: null,
      form: { ...this.orderForm },
      sizeOptions: [
        { id: "1", display: "Small" },
        { id: "2", display: "Medium" },
        { id: "3", display: "Large" },
      ],
    };
  },
  watch: {
    modalType: {
      immediate: true,
      handler(newItem) {
        if (newItem === "edit") {
          this.form = {
            ...this.orderForm,
          };
        } else {
          this.form = {
            quantity: 1,
            preferences: "",
            size: null,
          };
        }
      },
    },
    item: {
      immediate: true,
      handler(newItem) {
        if (this.selectedItem) {
          this.selectedItem = newItem;
        } else {
          this.selectedItem = newItem;
        }
      },
    },
  },
  methods: {
    updateOrder() {
      const order = {
        item: this.selectedItem,
        quantity: this.form.quantity,
      };

      // Include only if they exist
      if (this.form.size) {
        order.size = this.form.size;
      }
      if (this.form.preferences) {
        order.preferences = this.form.preferences;
      }

      this.$emit("update-order-item", order);
    },
    removeItemFromOrder(id) {
      this.$emit("delete-order-item", id);
    },
    updateQuantity(newQuantity) {
      this.form.quantity = newQuantity;
    },
    updatePreferences(newValue) {
      this.form.preferences = newValue;
    },
    updateSize(newValue) {
      this.form.size = newValue;
    },
  },
};
</script>
