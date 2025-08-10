<template>
  <div class="add-order-layout">
    <div class="modal-title">
      <div class="item-name-price">
        <h2 class="header2">{{ selectedItem?.title }}</h2>

        <h3 class="text-lg font-bold text-center lg:text-left item-title">
          <span class="text-lg text-center lg:text-left">
            Unit Price - {{ calculatedPrice }} /
          </span>
        </h3>
      </div>
    </div>

    <div class="item-content flex layout">
      <!-- Left Panel -->
      <div class="left-panel">
        <img :src="selectedItem?.images?.[0]" alt="" class="rounded item-image" />
      </div>

      <!-- Right Panel -->
      <div class="right-panel w-full p-4">
        <div class="mb-8 max-w-[250px]">
          <label for="quantity" class="form-label"> Quantity </label>
          <div class="w-full">
            <QuantitySelector
              :value="formData?.quantity"
              :min="1"
              @updateValue="updateQuantity"
            />
          </div>
        </div>

        <p v-if="offerPrompt" class="discountMessage" style="margin-bottom: 18px">{{ offerPrompt }}</p>

        <!-- Sizes -->
        <div v-if="selectedItem?.sizes?.length" class="mb-8">
          <label for="sizes" class="form-label"> Sizes </label>
          <SelectSize
            :sizes="selectedItem?.sizes"
            :modelValue="formData?.selectedSize"
            :itemPrice="selectedItem.basePrice"
            @update:selectedSize="handleSelectedSize"
          />
        </div>

        <div v-if="categorizedOptions?.addons?.length" class="mb-8">
          <label for="addons" class="form-label"> Addon </label>
          <Addon
            :addons="categorizedOptions?.addons"
            :selectdValues="formData?.selectedAddons"
            @updateValue="handleAddons"
          />
        </div>

        <div v-if="categorizedOptions?.choices?.length" class="mb-8">
          <label for="addons" class="form-label"> Choices </label>
          <FreeChoice
            :choices="categorizedOptions.choices"
            :maxChoice="selectedItem.maxChoice"
            :selectdValues="formData?.selectedChoices"
            @updateValue="handleChoices"
          />
        </div>

        <div v-if="categorizedOptions?.removals?.length" class="mb-8">
          <label for="removals" class="form-label"> Removals </label>
          <ToggleOptions
            :items="categorizedOptions.removals"
            :selectdValues="formData?.selectedRemovals"
            @updateValue="handleRemovalOptions"
          />
        </div>

        <!-- Preferences -->
        <div class="mb-4">
          <label for="preferences" class="form-label"> Preferences </label>
          <Textarea
            v-model="formData.preferences"
            :rows="2"
            placeholder="Add Preferences"
          />
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="modal-submit-section">
      <div>
        <div class="modal-submit-section-btn flex">
          <Button
            v-if="modalType === 'edit'"
            @click="emit('delete-item', selectedItem.id)"
            variant="danger"
            :style="{ height: '42px', marginRight: '14px' }"
          >
            Remove
          </Button>

          <div v-if="promotionMessage" class="discountMessage">
            {{ promotionMessage }}
          </div>
        </div>
      </div>

      <div
        class="modal-submit-section-btn flex justify-end"
        style="width: auto"
      >
        <div>{{ subtotal }}</div>
        <div class="total-price-per-unit">{{ totalPrice }}</div>
        <SubmitButton
          type="submit"
          @click="updateOrder"
          :applyShadow="true"
          :style="{ padding: '0 62px' }"
        >
          {{ modalType === 'edit' ? 'Update' : 'Add' }}
        </SubmitButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import Addon from "~/components/dashboard/products/customizations/types/Addon.vue";
import Button from "~/components/reuse/ui/Button.vue";
import QuantitySelector from "~/components/reuse/ui/QuantitySelector.vue";
import SelectSize from "~/components/dashboard/products/customizations/types/SelectSize.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import Textarea from "~/components/reuse/ui/Textarea.vue";
import ToggleOptions from "~/components/dashboard/products/customizations/types/ToggleOptions.vue";
import FreeChoice from "../products/customizations/types/FreeChoice.vue";
import { computed } from "vue";
import { usePosStore } from "~/stores/pos/usePOS";
import { toRaw } from "vue";

const props = defineProps({
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
const selectedItem = ref(__props.item);
const extraPrice = ref(0);
const eligiblePromo = ref(null);
const offerPrompt = ref("");

const formData = reactive({
  quantity: 1,
});
const pos = usePosStore();

watch(
  () => __props.item,
  (newItem) => {
    selectedItem.value = newItem;
  },
  { immediate: true }
);

const updateOrder = () => {
  const order = {
    item: {
      ...selectedItem.value,
      basePrice: selectedItem.value.basePrice,
    },
    quantity: formData.quantity,
  };

  if (formData.selectedSize) {
    order.size = formData.selectedSize;
  }

  if (formData.preferences) {
    order.preferences = formData.preferences;
  }

  if (formData.selectedAddons?.length) {
    order.addons = formData.selectedAddons;
  }

  if (formData.selectedChoices?.length) {
    order.choices = formData.selectedChoices;
  }

  if (formData.selectedRemovals?.length) {
    order.removals = formData.selectedRemovals;
  }

  order.unitPrice = unitPrice.value;
  order.subtotal = subtotalPrice.value;
  order.total = totalPrice.value;
  order.promoValue = eligiblePromo.value;

  emit("update-item", order);
};

const updateQuantity = (newQuantity) => {
  formData.quantity = newQuantity;
};

const calculatedPrice = computed(() => {
  return (selectedItem.value.basePrice + extraPrice.value).toFixed(2);
});

const categorizedOptions = computed(() => {
  const removals = [];
  const addons = [];
  const choices = [];

  const options = selectedItem?.value ? selectedItem.value?.customizations : [];

  options &&
    options.forEach((mod) => {
      if (mod.type === "removal") removals.push(mod);
      if (mod.type === "addon") addons.push(mod);
      if (mod.type === "choice") choices.push(mod);
    });

  return { removals, addons, choices };
});

onMounted(async () => {
  if (props.modalType === "edit") {
    const match = pos.cartItems.find(
      (item) => item.cartId === pos.selectedCartId
    );

    if (match) {
      const originalCustomizations = toRaw(match.item?.customizations || []);

      const addons = match.addons || [];
      const choices = match.choices || [];
      const removals = match.removals || [];

      const mergedCustomizations = [...addons, ...choices, ...removals];
      const overrideMap = new Map(mergedCustomizations.map((c) => [c.id, c]));

      // Merge mergedCustomizations, otherwise keep original
      const finalCustomizations = originalCustomizations.map((item) => {
        return overrideMap.has(item.id)
          ? { ...item, ...overrideMap.get(item.id) }
          : item;
      });

      for (const item of mergedCustomizations) {
        if (!finalCustomizations.find((c) => c.id === item.id)) {
          finalCustomizations.push({ ...item });
        }
      }

      selectedItem.value.customizations = finalCustomizations;

      formData.selectedAddons = addons.map((c) => c);
      formData.selectedChoices = choices.map((c) => c);
      formData.selectedRemovals = removals.map((c) => c);

      if (formData.selectedSize) {
        handleSelectedSize(formData.selectedSize);
      }

      formData.selectedSize = match.size;
      formData.quantity = match.quantity || 1;
      formData.preferences = match.preferences || "";
    }
  } else {
    if (selectedItem.value?.selectedSize) {
      formData.selectedSize = selectedItem.value.selectedSize;
    }

    if (selectedItem.value?.quantity) {
      formData.quantity = selectedItem.value.quantity;
    }

    if (selectedItem.value?.preferences) {
      formData.preferences = selectedItem.value.preferences;
    }
  }


  const product = selectedItem.value;
  const cartItems = pos.cartItems;

  if (!product?.eligibleFor?.length) return;

  product.eligibleFor.forEach((promo) => {
    const eligibleGetItems = promo.eligibleGetItems;

    if (!eligibleGetItems?.length) return;

    eligibleGetItems.forEach((getItem) => {
      const { subtype, valueType, buyQuantity, getQuantity } = promo;

      const isB1G1 = subtype === "buy_1_get_1";
      const isBuyXGetY = subtype === "buy_x_get_y";

      if (!isB1G1 && !isBuyXGetY) return;

      // Total cart qty that qualifies for this promo
      const totalQty = cartItems.reduce((sum, item) => {
        const itemPromos = item.item?.eligibleFor || [];
        const isMatch = itemPromos.some(p => 
          p.eligibleGetItems?.some(g => g.id === getItem.id)
        );
        return isMatch ? sum + item.quantity : sum;
      }, 0);

      if (isB1G1) {
        const needed = totalQty % 2 === 0 ? 1 : 0;
        if (needed > 0) {
          offerPrompt.value = `Add ${needed} more to get 1 free (Buy 1 Get 1)!`;
        }
      }

      if (isBuyXGetY) {
        const groupSize = buyQuantity + getQuantity;
        const remainder = totalQty % groupSize;

        if (remainder < buyQuantity) {
          const needed = buyQuantity - remainder;

          if (valueType === "fixed") {
            offerPrompt.value = `Add ${needed} more to unlock amount ${promo.value} off!`;
          } else if (valueType === "percentage") {
            offerPrompt.value = `Add ${needed} more to get ${promo.value}% off!`;
          } else if (valueType === "quantity") {
            offerPrompt.value = `Add ${needed} more to get ${getQuantity} free!`;
          }
        }
      }
    });
  });
});

const handleSelectedSize = (size) => {
  formData.selectedSize = size;
  extraPrice.value = size?.extraPrice;
};

const handleAddons = (addons) => {
  formData.selectedAddons = addons;
};

const handleChoices = (choices) => {
  formData.selectedChoices = choices;
};

const handleRemovalOptions = (removals) => {
  formData.selectedRemovals = removals;
};

const unitPrice = computed(() => {
  const basePrice = Number(selectedItem.value.basePrice || 0);

  const selectedSize = selectedItem.value.sizes?.find(
    (s) => s.sizeId === formData?.selectedSize?.sizeId
  );
  const extraSizePrice = selectedSize?.extraPrice || 0;

  const addonTotal = (formData.selectedAddons || [])
    .filter((c) => c.type === "addon")
    .reduce((sum, c) => {
      const price = Number(c.price || 0);
      const addonQty = Number(c.quantity ?? 0);
      return sum + price * addonQty;
    }, 0);

  return basePrice + extraSizePrice + addonTotal;
});

// Calculate discounted price
const totalPrice = computed(() => {
  const product = selectedItem.value;
  const quantity = formData.quantity;
  const selectedSize = selectedItem.value?.sizes?.find(
    (s) => s.sizeId === formData?.selectedSize?.sizeId
  );
  const addonTotal = (formData?.selectedAddons || [])
    .filter((c) => c.type === "addon")
    .reduce((sum, c) => {
      const price = Number(c.price || 0);
      const addonQty = Number(c.quantity ?? 0);
      return sum + price * addonQty;
    }, 0);

  const basePrice =
    selectedSize?.extraPrice + addonTotal + product?.basePrice ??
    product?.basePrice ??
    0;

  if (!product?.eligibleFor?.length || quantity <= 0) {
    return basePrice * quantity;
  }

  const promo = product.eligibleFor[0];
  const { value, valueType, subtype, buyQuantity = 1, getQuantity = 0 } = promo;
  eligiblePromo.value = {
    id: promo.id,
    type: promo.type,
    subtype: subtype,
    label: promotionMessage.value,
    value, 
    valueType,
  }

  // Percentage Discount
  if (subtype === "percentage") {
    const discountedUnit = basePrice - (basePrice * value) / 100;
    return discountedUnit * quantity;
  }

  // Fixed Discount
  if (subtype === "fixed") {
    const discountedUnit = Math.max(0, basePrice - value);
    return discountedUnit * quantity;
  }

  // Buy One Get One (same as Buy 1 Get 1)
  if (subtype === "buy_one_get_one") {
    const chargeableQty = Math.ceil(quantity / 2); // buy 1 get 1 free
    return chargeableQty * basePrice;
  }

  // Buy X Get Y
  if (subtype === "buy_x_get_y") {
    if (valueType === "quantity") {
      if (quantity < buyQuantity) {
        return basePrice * quantity;
      }

      const groupSize = buyQuantity + getQuantity;
      const fullGroups = Math.floor(quantity / groupSize);
      const remainingItems = quantity % groupSize;

      const chargeableQty =
        fullGroups * buyQuantity + Math.min(remainingItems, buyQuantity);

      return chargeableQty * basePrice;
    } else {
      // percentage or fixed
      const total = basePrice * quantity;

      if (quantity < buyQuantity) {
        return total; // No discount
      }

      let discount = 0;
      const discountGroups = Math.floor(quantity / buyQuantity);
      const discountedQty = discountGroups * buyQuantity;
      const discountBase = basePrice * discountedQty;

      if (valueType === "percentage") {
        discount = discountBase * (value / 100);
      } else if (valueType === "fixed") {
        discount = discountGroups * value; // fixed value per group
      }

      return total - discount;
    }
  }

  return basePrice * quantity;
});

const subtotalPrice = computed(() => {
  const quantity = Number(formData.quantity || 0);
  return unitPrice.value * quantity;
});

const promotionMessage = computed(() => {
  const promo = selectedItem.value?.eligibleFor?.find(
    (p) => p.type === "product" && p.id
  );
  if (!promo) return null;

  if (promo.subtype === "percentage") {
    return `Get ${promo.value}% off!`;
  }
  if (promo.subtype === "fixed") {
    return `Save ฿${promo.value} on this item!`;
  }
  if (promo.subtype === "buy_one_get_one") {
    return "Buy 1 Get 1 Free!";
  }
  if (promo.subtype === "buy_x_get_y") {
    if (promo.valueType === "quantity") {
      return `Buy ${promo.buyQuantity}, Get ${promo.getQuantity} Free`;
    } else {
      if (promo.valueType === "percentage") {
        return `Buy ${promo.buyQuantity}, Get ${promo.value}% off`;
      } else if (promo.valueType === "fixed") {
        return `Buy ${promo.buyQuantity}, Get ${promo.value} amount`;
      }
    }
  }

  return "Promotion available!";
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
    width: 45%;
  }
}

.right-panel {
  background: var(--primary-bg-color-1);
  overflow-y: auto;
  height: 500px;
  width: 55%;
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

.total-price-per-unit {
  padding-right: 25px;
  font-size: 1.25rem;
  font-weight: 600;
}

.discountMessage {
  background: #f2f2ff;
  border: 1px solid #478aff;
  border-radius: 8px;
  padding: 8px 26px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #5c67ac;
}
</style>
