<template>
  <div>
    <div class="section-title">
      <label class="form-label">Product has colors?</label>
      <div class="wrap-toggle">
        <Toggle v-model="hasColors" />
      </div>
    </div>

    <div v-if="hasColors">
      <div class="variants-list">
        <button class="add-btn" @click="openModal('select-products')">+</button>

        <div v-for="product in entries" :key="product.id" class="variant-item">
          <button
            class="remove-btn"
            @click="openModal('delete', product.id)"
          >
            ✕
          </button>

          <img
            v-if="product.image"
            class="product-color-image"
            :src="product.image"
            :alt="product.title || product.name"
          />
          <span>{{ product?.color }}</span>
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'select-products'"
    @close="closeModal"
    :width="modalWidth"
    :height="modalHeight + 'px'"
    :minHeight="'500px'"
    :isFullScreenMobile="true"
  >
    <SelectProducts
      :initial-selected="[]"
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
import { ref, onMounted, watch, computed } from "vue";
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
const windowWidth = ref(0);

const modal = ref({ type: "", isOpen: false, selectedItem: null });
const hasColors = ref(false);
const entries = ref([...props.modelValue]);

const handleSelectedProducts = (selectedProducts) => {
  const existingIds = entries.value.map((p) => p.id);
  const newEntries = selectedProducts
    .filter((p) => !existingIds.includes(p.id))
    .map((p) => ({
      ...p,
      image: p.images?.[0] || null,
    }));

  entries.value.push(...newEntries);

  emit("update:modelValue", entries.value); 
  closeModal();
};

const removeProductColor = () => {
  const updatedValue = entries.value && entries.value.filter(p => p.id !== modal.value.selectedItem);
  emit("update:modelValue", updatedValue); 
  closeModal();
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const modalWidth = computed(() => {
  if (windowWidth.value > 1200) {
    return "1200px";
  } else if (windowWidth.value > 1100) {
    return `${windowWidth.value - 100}px`;
  } else {
    return `${windowWidth.value - 120}px`;
  }
});

const modalHeight = computed(() => {
  if (windowWidth.value > 900) {
    return "700px";
  } else {
    return `auto`;
  }
});

const openModal = (type, id) => {
  modal.value = {
    type,
    isOpen: true,
    selectedItem: id
  };
};

const closeModal = () => {
  modal.value = {
    type: "",
    isOpen: false,
    selectedItem: null
  };
};

onMounted(() => {
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);

  if (entries.value.length > 0) {
    hasColors.value = true;
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    entries.value = [...newValue];
    hasColors.value = entries.value.length > 0;
  },
  { immediate: true }
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
  flex: 1;
}

.variants-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.wrap-toggle {
  flex: 1; 
  display: flex; 
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
  text-align: center;
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
