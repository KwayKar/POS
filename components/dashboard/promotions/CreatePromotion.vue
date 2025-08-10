<template>
  <h3 class="modal-title">{{ isEditMode ? "Update" : "Create" }} Promotion</h3>

  <div class="promotion-form modal-content">
    <div class="wrap-form-group" :style="{ height: height + 'px' }">
      <div v-if="!isEditMode" class="form-group">
        <label class="form-label mb-2">Promotion Type</label>
        <div class="discount-type flex gap-4">
          <Radio
            v-for="option in promotionOptions"
            :key="option.value"
            v-model="form.type"
            :value="option.value"
            :label="option.label"
          />
        </div>
      </div>

      <div>
        <div v-if="form.type === 'coupon'" class="form-group">
          <label class="form-label">Code</label>
          <Input v-model="form.code" type="text" placeholder="Enter code" />
        </div>

        <div class="form-group flex gap-4">
          <div class="w-1/2">
            <label class="form-label">Promotion Method</label>
            <Select v-model="form.subtype" :options="promotionTypes" />
          </div>

          <div v-if="!['buy_x_get_y', 'buy_one_get_one'].includes(form.subtype)" class="w-1/2">
            <label class="form-label">Value</label>
            <Input v-model.number="form.value" type="number" placeholder="10" />
          </div>

          <div v-if="form.subtype === 'buy_x_get_y'" class="w-1/2">
            <label class="form-label">Get Type</label>
            <Select
              v-model="form.valueType"
              :options="[
                { label: 'Percentage Discount', value: 'percentage' },
                { label: 'Fixed Discount', value: 'fixed' },
                { label: 'Free Quantity', value: 'quantity' },
              ]"
            />
          </div>
        </div>

        <div
          v-if="form.subtype === 'buy_x_get_y'"
          class="form-group flex gap-4"
        >
          <div
            v-if="
              form.subtype === 'buy_x_get_y' 
            "
            class="w-1/2"
          >
            <label class="form-label">Buy Quantity</label>
            <Input v-model.number="form.buyQuantity" type="number" placeholder="10" />
          </div>

          <div
            v-if="
              form.subtype === 'buy_x_get_y' && form.valueType !== 'quantity'
            "
            class="w-1/2"
          >
            <label class="form-label">Value</label>
            <Input v-model.number="form.value" type="number" placeholder="10" />
          </div>

          <div
            v-if="
              form.subtype === 'buy_x_get_y' && form.valueType === 'quantity'
            "
            class="w-1/2"
          >
            <label class="form-label">Get Quantity</label>
            <Input
              v-model.number="form.getQuantity"
              type="number"
              placeholder="10"
            />
          </div>
        </div>

        <div v-if="form.type === 'product'" class="form-group">
          <label class="form-label">Products</label>
          <div class="select-product-header">
            <Button
              type="button"
              class="custom-btn-primary"
              @click="openModal('select-products')"
            >
              <strong style="font-size: 20px; margin-right: 7px">+</strong>
              Select
            </Button>
            <p class="form-description">
              Please select the products you want this discount to apply to.
            </p>
          </div>

          <div class="product-scroll-container">
            <div
              v-for="(product, index) in form.eligibleGetItems"
              :key="index"
              class="product-chip"
            >
              <img
                :src="product.images[0]"
                :alt="product.title"
                class="product-image"
              />
              <span class="product-name">{{ product.title }}</span>
              <button
                type="button"
                class="remove-btn text-red-500 font-bold"
                @click="confirmDeleteModal('delete', product.id)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <Textarea
            v-model="form.description"
            rows="2"
            placeholder="Short description"
          ></Textarea>
        </div>

        <div class="form-group flex gap-4">
          <div class="w-1/2">
            <label class="form-label">Expiry Date</label>
            <!-- Date Filter -->
            <client-only>
              <VDatePicker
                v-model="form.endsAt"
                :popover="{ visibility: 'click' }"
              >
                <template #default="{ inputValue, togglePopover }">
                  <input
                    :value="inputValue"
                    @click="togglePopover"
                    readonly
                    placeholder="Select date range"
                    class="date-input"
                  />
                </template>
              </VDatePicker>
            </client-only>
          </div>

          <div class="w-1/2" v-if="isEditMode">
            <label class="form-label">isActive</label>
            <Toggle v-model="form.isActive" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-submit-section">
    <div class="modal-submit-section-btn">
      <div class="flex-1">
        <p v-if="formError" class="text-red-500 mt-2">
          {{ formError }}
        </p>
      </div>

      <SubmitButton
        @click="handleSubmit"
        :applyShadow="true"
        style="height: 40px"
      >
        {{ isEditMode ? "Update" : "Create" }}
      </SubmitButton>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'select-products'"
    @close="emit('close')"
    :width="modalWidth"
    :height="modalHeight + 'px'"
    :minHeight="'400px'"
    :isFullScreenMobile="true"
  >
    <SelectProducts
      :initial-selected="form.products"
      @add-selected-items="handleSelectedProducts"
      @close="emit('close')"
    />
  </Modal>

  <Modal
    v-if="modal.isOpen && modal.type === 'delete'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <ConfirmDelete @remove-item="removeFromEligibleProduct" @close="closeModal">
      Are you sure you want to delete?
    </ConfirmDelete>
  </Modal>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import Button from "~/components/reuse/ui/Button.vue";
import Input from "~/components/reuse/ui/Input.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import Radio from "~/components/reuse/ui/Radio.vue";
import Select from "~/components/reuse/ui/Select.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import Textarea from "~/components/reuse/ui/Textarea.vue";
import SelectProducts from "../items/SelectProducts.vue";
import { usePromotion } from "~/stores/promotion/usePromotion";
import Toggle from "~/components/reuse/ui/Toggle.vue";
import { productBasedOptions } from "./promotionTypes";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";

const emit = defineEmits(["close"]);
const promotionStore = usePromotion();
const { createPromotion, updatePromotion, removeEligibleProduct } =
  usePromotion();
const selectedPromotion = computed(() => promotionStore.getSelectedPromotion);
const isEditMode = computed(() => !!selectedPromotion.value?.id);

const props = defineProps({
  height: {
    type: String,
    required: true,
  },
});

const form = ref({
  id: "",
  type: "coupon",
  subtype: "",
  code: "",
  value: null,
  description: "",
  isActive: false,
  endsAt: "",
  buyQuantity: 2, // for buy_x_get_x -> free qty
  getQuantity: 1, // for buy_x_get_x -> free qty
  eligibleGetItems: [],
});
const formError = ref("");
const modal = ref({ type: "", isOpen: false, selectedProductId: null });
const windowWidth = ref(0);

const promotionOptions = [
  { label: "Coupon", value: "coupon" },
  { label: "Product", value: "product" },
  { label: "Free Delivery", value: "free-delivery" },
];

const couponBasedOptions = [
  { label: "Percentage Discount", value: "percentage" },
  { label: "Fixed Discount", value: "fixed" },
  { label: "Spend X Get Y (Threshold)", value: "threshold" },
];

const deliveryBasedOptions = [
  { label: "Percentage Discount", value: "percentage" },
  { label: "Fixed Discount", value: "fixed" },
];

const promotionTypes = computed(() => {
  switch (form.value.type) {
    case "product":
      return productBasedOptions;
    case "coupon":
      return couponBasedOptions;
    case "free-delivery":
      return deliveryBasedOptions;
    default:
      return [];
  }
});

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const openModal = (type) => {
  modal.value = { type, isOpen: true, selectedProductId: null };
};

const confirmDeleteModal = (type, productId) => {
  modal.value = {
    type,
    isOpen: true,
    selectedProductId: productId,
  };
};

const handleSubmit = async () => {
  if (form.value.type === 'coupon' && !form.value.code) {
    formError.value = "Please fill in all required fields.";
    return;
  } 

  if (!form.value.type || !form.value.subtype) {
    formError.value = "Please fill in all required fields.";
    return;
  }

  const isCoupon = form.value.type === "coupon";
  const isProduct = form.value.type === "product";
  const isFreeDelivery = form.value.type === "free-delivery";

  const payload = {
    type: form.value.type,
    subtype: form.value.subtype,
    value: form.value.value,
    code: form.value.code,
    description: form.value.description,
    isActive: form.value.isActive ?? false,
    ...(form.value.valueType && { valueType: form.value.valueType }),
    ...(form.value.buyQuantity && { buyQuantity: form.value.buyQuantity }),
    ...(form.value.getQuantity && { getQuantity: form.value.getQuantity }),
    ...(form.value.appliesTo?.length > 0 && {
      appliesTo: form.value.appliesTo,
    }),
    ...(form.value.eligibleGetItems?.length > 0 && {
      eligibleGetItems: form.value.eligibleGetItems,
    }),
    ...(form.value.startsAt && { startsAt: form.value.startsAt }),
    ...(form.value.endsAt && { endsAt: form.value.endsAt }),
  };

  try {
    if (!isEditMode.value) {
      form.value.id = `PROMO${Date.now()}`;
      await createPromotion({ ...payload, id: form.value.id });
    } else {
      await updatePromotion(form.value.id, payload);
    }
    emit("close");
  } catch (err) {
    formError.value = "Failed to save promotion.";
  }
};

const modalWidth = computed(() => {
  if (windowWidth.value > 1120) {
    return "1200px";
  } else {
    return `${windowWidth.value - 40}px`;
  }
});

const modalHeight = computed(() => {
  if (window.innerWidth > 850 && window.innerHeight > 800) {
    return 750;
  } else if (window.innerWidth > 850 && window.innerHeight < 700) {
    return window.innerHeight - 120;
  }
});

const handleSelectedProducts = (selectedProducts) => {
  form.value.eligibleGetItems = [];
  const mappedProducts = selectedProducts.map((product) => {
    return {
      ...product,
      image: product?.images?.[0] || product?.image,
    };
  });
  form.value.eligibleGetItems.push(...mappedProducts);
  closeModal();
};

onMounted(() => {
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);
  if (isEditMode.value) {
    form.value = { ...form.value, ...selectedPromotion.value };
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});

const removeFromEligibleProduct = () => {
  removeEligibleProduct(form.value.id, modal.value.selectedProductId);
  closeModal();
};

const closeModal = () => {
  modal.value.status = "";
  modal.value.isOpen = false;
};

watch(
  () => {
    const promo = promotionStore.promotions.find((p) => p.id === form.value.id);
    return promo ? promo.eligibleGetItems : [];
  },
  (newEligibleItems) => {
    form.value.eligibleGetItems = newEligibleItems;
  },
  { deep: true, immediate: true }
);
</script>

<style scoped>
.promotion-form {
  width: 100%;
}

.wrap-form-group {
  overflow-y: auto;
  padding: 20px 20px 50px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.icon-button {
  height: 100%;
  padding: 0.5rem 0.9rem;
  background-color: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 20px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;
}

.icon-button:hover {
  background-color: #eaeaea;
}

.icon-button.active {
  border-color: #333;
  background-color: #333;
  color: white;
}

.submit-button {
  padding: 0.5rem 1.25rem;
  background-color: black;
  color: var(--white-1);
  border-radius: 6px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.product-scroll-container {
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  flex-wrap: wrap;
  margin: 12px 0 26px 0;
  gap: 8px;
}

.icon-button {
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: auto;
  height: 100%;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-product-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0 18px;
}
.product-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f9f9f9;
  border: 1px solid var(--gray-2);
  border-radius: 20px;
  padding: 2px 16px 2px 10px;
  font-size: 14px;
  cursor: default;
}

.product-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}

.product-name {
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}

.date-picker {
  width: 100%;
  font-size: 1rem !important;
  padding: 8px 8px 8px 20px;
  border: 1px solid var(--gray-1);
  border-radius: 7px;
  height: 44px;
  color: var(--black-1);
}
input:focus {
  border-color: rgb(155, 246, 155);
  outline: 2px solid var(--gray-1);
}

.icon-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  background-color: var(--white-1);
  cursor: pointer;
  border-radius: 4px;
}

.icon-button.active {
  border-color: var(--primary-btn-color);
  background-color: var(--primary-btn-bg);
}

.radio-circle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #666;
  display: inline-block;
  position: relative;
}

.radio-circle.selected::after {
  content: "";
  width: 6px;
  height: 6px;
  background-color: #666;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
}
.radio-label {
  font-size: 14px;
  color: #333;
}

input {
  background: var(--white-1);
  color: var(--black-1);
  border: 1px solid var(--gray-1);
  border-radius: 7px;
  outline: none;
  height: 46px;
  padding-left: 16px;
}

input:focus {
  border-color: rgb(107, 179, 107);
}

input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}
</style>
