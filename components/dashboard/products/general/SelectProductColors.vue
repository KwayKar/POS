<template>
  <div>
    <div class="section-title">
      <label class="form-label">Product has colors?</label>
      <Toggle v-model="hasColors" />
    </div>

    <div v-if="hasColors">
      <div class="variants-list">
        <button class="add-btn" @click="openModal('select-products')">+</button>

        <div v-for="product in entries" :key="product.id" class="variant-item">
          <button
            class="remove-btn"
            @click="openModal('delete')"
          >
            ✕
          </button>

          <img
            v-if="product.image"
            class="product-color-image"
            :src="product.image"
            :alt="product.name"
          />
          <span>{{ product.name }}</span>
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'select-products'"
    @close="closeModal"
    :width="'1200px'"
    :height="700 + 'px'"
    :minHeight="'400px'"
  >
    <SelectProducts
      :initial-selected="[]"
      :height="700"
      @add-selected-items="handleSelectedProducts"
      @close="closeModal"
    />
  </Modal>

  <Modal
    v-if="modal.isOpen && modal.type === 'delete'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <ConfirmDelete
      @remove-item="removeProductColor"
      @close="closeModal"
    >
      Are you sure you want to delete?
    </ConfirmDelete>
  </Modal>

</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Toggle from "~/components/reuse/ui/Toggle.vue";
import SelectProducts from "../../items/SelectProducts.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);

const modal = ref({ type: "", isOpen: false });
const hasColors = ref(false);
const entries = ref([...props.modelValue]);

const handleSelectedProducts = (selectedProducts) => {};

const removeProduct = (productToRemove) => {
  entries = entries.filter(p => p.id !== productToRemove.id);
};

const openModal = (type) => {
  modal.value = {
    type,
    isOpen: true,
  };
};

const closeModal = () => {
  modal.value = {
    type: "",
    isOpen: false,
  };
};

const removeProductColor = () => {
  console.log('Remove with context')
}

onMounted(() => {
  if (entries.value.length > 0) {
    hasColors.value = true;
  }
});

watch(
  entries,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);
</script>

<style scoped>
.section-title {
  margin: 32px 0 20px;
  display: flex;
  align-items: center;
}
.section-title > label {
  font-size: 1.05rem;
  margin-right: 32px;
}

.variants-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 105px;
  font-size: 2rem;
  background-color: #f7f7f7;
  border: 1px dashed #7f7f7f;
  color: var(--black-2);
  border-radius: 8px;
  margin-right: 8px;
  cursor: pointer;
}

.variant-item {
  position: relative;
  width: auto;
  height: 105px;
  margin-right: 8px;
  background-color: #f7f7f7;
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid var(--gray-1);
}

.variant-item span {
  font-size: 12px;
  color: var(--black-2);
}

.product-color-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
}

.remove-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background: var(--white-1);
  border: 1px solid var(--gray-2);
  font-size: 12px;
  padding: 0px;
  margin: 0px;
  width: 28px;
  height: 28px;
  cursor: pointer;
}
</style>
