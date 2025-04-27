<template>
  <div class="add-order-layout">
    <div class="modal-title">
      <div class="item-name-price">
        <h2 class="header2">{{ selectedItem?.title }}</h2>

        <h3 class="text-lg font-bold text-center lg:text-left item-title">
          <span class="text-lg text-center lg:text-left">
            ${{ calculatedPrice }}
          </span>
        </h3>
      </div>
    </div>

    <div class="item-content flex layout">
      <!-- Left Panel -->
      <div class="left-panel">
        <img :src="selectedItem?.images[0]" alt="" class="rounded item-image" />
      </div>

      <!-- Right Panel -->
      <div class="right-panel w-full lg:w-1/2 p-4">
        <div class="mb-8">
          <label for="quantity" class="form-label"> Quantity </label>
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
          <label for="sizes" class="form-label"> Sizes </label>
          <SelectSize
            :sizes="selectedItem?.sizes"
            @update:extraPrice="handleExtraPrice"
          />
        </div>

        <div v-if="selectedItem?.sizes" class="mb-8">
          <label for="removals" class="form-label"> Removals </label>
          <ToggleOptions
            :items="categorizedOptions.removal"
            @update:extraPrice="handleExtraPrice"
          />
        </div>

        <div v-if="selectedItem?.sizes" class="mb-8">
          <label for="addons" class="form-label"> Addon </label>
          <Addon
            :addons="categorizedOptions.addon"
            @update:extraPrice="handleExtraPrice"
          />
        </div>

        <div v-if="selectedItem?.sizes" class="mb-8">
          <label for="addons" class="form-label"> Choices </label>
          <SelectSize
            :sizes="categorizedOptions.choices"
            @update:extraPrice="handleExtraPrice"
          />
        </div>

        <!-- Preferences -->
        <div class="mb-4">
          <label for="preferences" class="form-label"> Preferences </label>
          <Textarea
            v-model="form.preferences"
            :rows="2"
            placeholder="Add Preferences"
          />
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="modal-submit-section">
      <div class="modal-submit-section-btn flex">
        <Button
          @click="emit('delete-item', selectedItem.id)"
          variant="danger"
          :style="'height: 42px'"
        >
          Remove
        </Button>
      </div>
      <div class="modal-submit-section-btn flex justify-end">
        <SubmitButton
          type="submit"
          @click="updateOrder"
          :applyShadow="true"
          :style="'padding: 0 62px'"
        >
          Add
        </SubmitButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Addon from "~/components/reuse/ui/Addon.vue";
import Button from "~/components/reuse/ui/Button.vue";
import QuantitySelector from "~/components/reuse/ui/QuantitySelector.vue";
import SelectSize from "~/components/reuse/ui/SelectSize.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import Textarea from "~/components/reuse/ui/Textarea.vue";
import ToggleOptions from "~/components/reuse/ui/ToggleOptions.vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  modalType: {
    type: String,
    required: true,
  },
  value: {
    type: Object,
    default: () => ({
      quantity: 1,
      preferences: "",
      size: null,
    }),
  },
});

const emit = defineEmits(["update-item", "delete-item"]);
const form = ref({ ...__props.value });
const selectedItem = ref(__props.item);
const extraPrice = ref(0); // for sides and sizes

watch(
  () => __props.modalType,
  (newType) => {
    if (newType === "edit") {
      form.value = { ...__props.value };
    } else {
      form.value = {
        quantity: 1,
        preferences: "",
        size: null,
      };
    }
  },
  { immediate: true }
);

watch(
  () => __props.item,
  (newItem) => {
    selectedItem.value = newItem;
  },
  { immediate: true }
);

// onMounted(() => {
//   console.log(selectedItem);
// });

const updateOrder = () => {
  const order = {
    item: selectedItem.value,
    quantity: form.value.quantity,
  };
  if (form.value.size) order.size = form.value.size;
  if (form.value.preferences) order.preferences = form.value.preferences;
  emit("update-item", order);
};

const updateQuantity = (newQuantity) => {
  form.value.quantity = newQuantity;
};

const handleExtraPrice = (price) => {
  extraPrice.value = price;
};

const calculatedPrice = computed(() => {
  return (selectedItem.value.price + extraPrice.value).toFixed(2);
});

const categorizedOptions = computed(() => {
  const removal = [];
  const addon = [];
  const choices = [];

  selectedItem?.value?.options.forEach((mod) => {
    if (mod.type === 'removal') removal.push(mod);
    if (mod.type === 'addon') addon.push(mod);
    if (mod.type === 'choices') choices.push(mod);
  });

  return { removal, addon, choices };
});
</script>

<style scoped>
.add-order-layout {
  border-radius: 16px;
  overflow: hidden;
}

.item-name-price {
  display: flex;
  justify-content: space-between;
}

.left-panel {
  border-right: 1px solid var(--gray-2);
  background: var(--primary-bg-color-1);
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
}
@media (min-width: 1024px) {
  .left-panel {
    width: 50%;
  }
}

.right-panel {
  background: var(--primary-bg-color-1);
  overflow-y: auto;
  height: 500px;
}

.item-content {
  height: 100%;
}
@media screen and (max-width: 850px) {
  .item-content {
    display: flex;
    flex-direction: column;
    height: 90vh;
    display: flex;
    flex: 1 1 auto;
  }
}

.item-image {
  border-radius: 0.25rem;
  display: block;
  max-width: 100%;
  height: auto;
}
@media screen and (max-width: 850px) {
  .item-image {
    max-height: 350px;
    object-fit: contain;
  }
}
</style>
