<template>
  <div class="product-info-layout flex flex-col h-full">
    <div class="header-section">
      <h2 class="header2">Item Information</h2>
    </div>

    <div class="panel-section">
      <!-- Left Panel - Image and Title -->
      <div class="left-panel">
        <div class="image-container">
          <img
            v-if="selectedItem?.images.length"
            :src="selectedItem?.images[0]"
            alt="Item Image"
            class="item-image"
          />

          <div class="edit-button">
            <EditPencil2 />
          </div>
        </div>
      </div>

      <!-- Right Panel  Item Info -->
      <div class="right-panel">
        <div class="form-group">
          <label for="title" class="form-label">Title</label>
          <Input
            type="text"
            v-model="selectedItem.title"
            placeholder="Enter Title"
            :class="['form-input', errors.title ? 'input-error' : '']"
            id="title"
          />
        </div>

        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <Textarea
            v-model="selectedItem.description"
            placeholder="Enter Description"
            :rows="3"
          />
        </div>

        <div class="form-group">
          <div class="flex items-center justify-between mb-1">
            <label for="category" class="form-label">Category</label>
            <button
              @click="openAddCategoryModal"
              class="text-gray-500 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
          <MultiSelect
            v-model="selectedItem.categories"
            :options="categoryOptions"
          />
        </div>

        <div class="flex gap-4">
          <div :class="['form-group w-1/2']">
            <label for="basePrice" class="form-label">Price</label>
            <Input
              type="number"
              v-model="selectedItem.basePrice"
              placeholder="Enter Price"
              :class="['form-input', errors.price ? 'input-error' : '']"
              id="basePrice"
            />
          </div>

          <div
            :class="['form-group w-1/2', hasSizes ? 'invisible' : 'visible']"
          >
            <label for="quantity" class="form-label">Quantity</label>
            <Input
              type="number"
              v-model="selectedItem.quantity"
              :min="1"
              :max="10"
              placeholder="Edit Quantity"
              :class="['form-input', errors.price ? 'input-error' : '']"
              id="quantity"
            />
          </div>
        </div>

        <ProductSizes
          v-model="selectedItem.sizes"
          :hasSizes="hasSizes"
          @update:hasSizes="(val) => (hasSizes = val)"
          label="Product has different sizes?"
          secondLabel="Stock"
          secondKey="quantity"
          secondType="number"
        />

        <SelectProductColors
          v-model:modelValue="selectedItem.colorVariants"
          @update:modelValue="handleColorsUpdate"
        />
      </div>
    </div>

    <!-- Bottom Panel / Edit and Remove Buttons -->
    <div class="bottom-panel">
      <Button
        @click="() => emit('remove-item', selectedItem.id)"
        style="
          border: 1px solid var(--black-1);
          background: var(--red-1);
          color: var(--white-1);
          height: 40px;
        "
      >
        Delete
      </Button>
      <div class="submit-section">
        <p class="error-message">{{ error }}</p>
        <Button
          @click="submitForm"
          class="edit-btn"
          :applyShadow="'true'"
          style="
            border: 1px solid var(--black-1);
            background: var(--primary-text-color-1);
            color: var(--white-1);
            height: 40px;
          "
        >
          {{ mode === "edit" ? "Update" : "Create" }}
        </Button>
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'category'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <CreateCategory @close="closeModal" />
  </Modal>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from "vue";
import EditPencil2 from "~/components/reuse/icons/EditPencil2.vue";
import Button from "~/components/reuse/ui/Button.vue";
import Input from "~/components/reuse/ui/Input.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import Textarea from "~/components/reuse/ui/Textarea.vue";
import { useCategory } from "~/stores/product/category/useCategory";
import CreateCategory from "./categories/CreateCategory.vue";
import ProductSizes from "./general/ProductSizes.vue";
import SelectProductColors from "./general/SelectProductColors.vue";
import { useProduct } from "~/stores/product/useProduct";
import MultiSelect from "~/components/reuse/ui/MultiSelect.vue";
import { useAdmin } from "~/stores/admin/useAdmin";

const categoryStore = useCategory();
const productStore = useProduct();
const adminStore = useAdmin();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    default: "create",
  },
});
const emit = defineEmits([
  "create-item",
  "edit-item",
  "remove-item",
  "close-modal",
]);
const errors = reactive({});
const modal = reactive({
  isOpen: false,
  type: null,
});
const selectedItem = ref({
  title: "",
  categories: [],
  quantity: "",
  basePrice: "",
  description: "",
  sizes: [],
  images: [
    "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702672435/gravy/production/Gravy::MasterProduct/Q423_OLO_MisoSalmonGlazedPlate_3600x2400_2_orq1kg",
  ],
  ...props.item,
  colorVariants: [],
});
const hasSizes = ref(selectedItem.value.sizes?.length > 0);
const loading = ref(false);
const error = ref(null);

const submitForm = async () => {
  if (props.mode === "edit") {
    // emit("edit-item", {
    //   ...selectedItem.value,
    //   title: selectedItem.value.title,
    //   description: selectedItem.value.description,
    //   quantity: selectedItem.value.quantity,
    //   price: selectedItem.value.price,
    //   sizes: selectedItem.value.sizes,
    // });
    loading.value = true;
    error.value = null;

    console.log(selectedItem.value.colorVariants, "catt");

    const productInfo = {
      id: selectedItem.value.id,
      title: selectedItem.value.title,
      description: selectedItem.value.description,
      quantity: selectedItem.value.quantity,
      basePrice: Number(selectedItem.value.basePrice),
      categories: selectedItem.value.categories,
      sizes: hasSizes.value ? selectedItem.value?.sizes : [],
      images: [
        "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702672435/gravy/production/Gravy::MasterProduct/Q423_OLO_MisoSalmonGlazedPlate_3600x2400_2_orq1kg",
      ],
      // storeInventories: {
      //   upsert: {
      //     where: { storeId_productId: { storeId: 'storeId', productId: 'productId' } },
      //     update: { ...updateFields },
      //     create: { store: { connect: { id: 'storeId' } }, ...createFields },
      //   }
      // },
      colorVariants: selectedItem.value.colorVariants.map((variant) => ({
        id: variant.id,
        color: variant.color,
      })),
      // storeInventories are usually not updated this way unless you overwrite or update them separately
    };

    const payload = {
      product: productInfo,
      storeId: adminStore.storeId
    };

    try {
      const result = await productStore.updateProduct(
        selectedItem.value.id,
        payload
      );

      if (!result.success) {
        error.value = result.error || "Failed to update product";
        return;
      }

      emit("close-modal");
    } catch (err) {
      loading.value = false;
      error.value =
        err.response?.data?.error || err.message || "Failed to update product";
    }
  } else if (props.mode === "create") {
    // emit("create-item", {
    //   ...selectedItem.value,
    //   title: selectedItem.value.title,
    //   description: selectedItem.value.description,
    //   quantity: selectedItem.value.quantity,
    //   price: selectedItem.value.price,
    //   sizes: selectedItem.value.sizes,
    // });

    loading.value = true;
    error.value = null;
    const payload = {
      // ...selectedItem.value,
      sku: "SKU-5923",
      title: selectedItem.value.title,
      description: selectedItem.value.description,
      quantity: selectedItem.value.quantity ?? 0,
      basePrice: Number(selectedItem.value.basePrice),
      establishmentId: "74b14d5e-a941-47bf-b103-61b64aea044b",
      categories: selectedItem.value.categories,
      // type: '',
      sizes: selectedItem.value.sizes,
      images: [
        "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702672435/gravy/production/Gravy::MasterProduct/Q423_OLO_MisoSalmonGlazedPlate_3600x2400_2_orq1kg",
      ],
      storedId: "1d6c4a98-ff9a-4edb-b459-57819f2a79b7",
      // storeInventories: {
      //   create: [
      //     {
      //       store: {
      //         connect: { id: "1d6c4a98-ff9a-4edb-b459-57819f2a79b7" },
      //       },
      //       storeInventoryItems: {
      //         create: [
      //           {
      //             sizeId: "sizeId1",
      //             label: "Large",
      //             quantity: 10,
      //           },
      //         ],
      //       },
      //     },
      //   ],
      // },
      colorVariants: selectedItem.value.colorVariants,
    };
    try {
      const result = await productStore.createProduct(payload);

      if (!result.success) {
        error.value = result.error || "Failed to create product";
        return;
      }

      emit("close-modal");
    } catch (err) {
      loading.value = false;
      error.value = err.response?.data?.error || "Failed to create product";
    }
  }
};

const openAddCategoryModal = () => {
  modal.isOpen = true;
  modal.type = "category";
};

const closeModal = () => {
  modal.isOpen = false;
  modal.type = "";
};

const categoryOptions = computed(() =>
  categoryStore.getCategoryList.map((cat) => ({
    name: cat.name,
    id: cat.id,
  }))
);

onMounted(() => {
  if (props.mode === "edit") {
    selectedItem.value = { ...props.item };
  }
});

const handleColorsUpdate = (newColors) => {
  selectedItem.value.colorVariants = newColors.map((color) => color);
};
</script>

<style scoped>
.header-section {
  margin: 20px 24px;
}

.panel-section {
  display: flex;
  flex-direction: row;
  padding-left: 12px;
  gap: 1rem;
  flex-grow: 1;
}
@media screen and (max-width: 900px) {
  .panel-section {
    overflow-y: scroll;
    flex-direction: column;
    height: calc(var(--max-modal-height-mobile) - 145px);
  }
}

.product-info-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--primary-bg-color-1);
  border-radius: 16px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
}

.image-container {
  position: relative;
}

.image-container > img {
  max-height: 700px;
  object-fit: contain;
  border-radius: 10px;
}
@media screen and (max-width: 900px) {
  .image-container > img {
    max-height: 300px;
  }
}

.item-image {
  width: 100%;
  height: auto;
}

.edit-btn {
  transition: all 0.3s ease !important;
}

.edit-btn:hover {
  background: var(--white-1) !important;
  color: var(--black-1) !important;
}

.right-panel {
  width: 100%;
  flex: 2;
  overflow-y: auto;
  height: 600px;
  max-height: 700px;
  padding: 0 2rem 12rem 1rem;
  border-radius: 8px;
}

@media screen and (max-width: 900px) {
  .right-panel {
    overflow-y: visible;
    height: auto;
    max-height: 100vh;
    margin-bottom: 100px;
  }
  .right-panel > :last-child {
    padding: 50px 0;
  }
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a4a4a;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
}

.input-error {
  border-color: var(--red-1);
}

.bottom-panel {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid var(--black-1);
  border-radius: 0 0 8px 8px;
  background: var(--primary-bg-color-1);
}
@media screen and (max-width: 850px) {
  .bottom-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
  }
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  padding: 0.625rem;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
}

.delete-icon {
  fill: var(--white-1);
  width: 16px;
  height: 16px;
}

.edit-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  width: 50px;
  height: 50px;
  border: 1px solid var(--gray-1);
  background-color: var(--white-1);
  color: var(--white-1);
  padding: 0.75rem;
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  fill: transparent;
  stroke: #777777;
  transition: all 0.2s ease-in-out;
}

.edit-button:hover {
  fill: var(--black-2);
  stroke: var(--white-1);
  background-color: var(--black-2);
}

.submit-section {
  display: flex;
  align-items: center;
}

.submit-section p {
  margin-right: 24px;
}
</style>
