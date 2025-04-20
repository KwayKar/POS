<template>
  <DashboardLayout>
    <NavPanel
      class="navPanel fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16"
      style="z-index: 99"
    >
      <NavPanelButton
        style="height: 42px; border: 1px solid var(--black-1)"
        :applyShadow="true"
        @click="openModal('create')"
      >
        Create Category
      </NavPanelButton>
    </NavPanel>

    <div class="wrap-category-list" :class="gridClass">
      <div
        v-for="category in categoryList"
        :key="category.id"
        class="category-item"
        @click="editItem(category)"
      >
        <div class="category-image">
          <img
            :src="
              category.image ||
              'https://www.pngkey.com/png/full/233-2332677_image-500x350-placeholder-transparent.png'
            "
            alt="Category Image"
            @error="
              (e) => {
                e.target.src =
                  'https://www.pngkey.com/png/full/233-2332677_image-500x350-placeholder-transparent.png';
              }
            "
          />
        </div>

        <div class="category-info">
          <h3>{{ category.name }}</h3>
          <span>ID: {{ category.id }}</span>
        </div>

        <div class="wrap-trash-icon" @click.stop="confirmDelete(category)">
          <div class="trash-icon">
            <Trash />
          </div>
        </div>
      </div>
    </div>

    <Modal
      v-if="modal.isOpen && (modal.type === 'create' || modal.type === 'edit')"
      @close="closeModal"
      width="460px"
      :minHeight="'400px'"
    >
      <CreateCategory
        :mode="modal.type === 'create' ? 'create' : 'edit'"
        :initialData="selectedItem"
        @close="closeModal"
      />
    </Modal>

    <Modal
      v-if="modal.isOpen && modal.type === 'delete'"
      width="420px"
      height="auto"
      @close="closeModal"
    >
      <ConfirmDelete @remove-item="removeItem" @close="closeModal">
        Are you sure you want to delete {{ selectedItem.name }}?
      </ConfirmDelete>
    </Modal>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import NavPanelButton from "~/components/dashboard/panels/NavPanelButton.vue";
import { useCategory } from "~/stores/product/category/useCategory";
import Trash from "~/components/reuse/icons/Trash.vue";
import CreateCategory from "~/components/dashboard/products/categories/CreateCategory.vue";

const categoryStore = useCategory();
const categoryList = computed(() => categoryStore.getCategoryList || []);

const selectedItem = ref(null);
const modal = ref({ type: "", isOpen: false });
const gridClass = ref("grid grid-cols-4");
const panelHeight = ref(0);

function openModal(type, item) {
  selectedItem.value = { ...item };
  modal.value = { type, isOpen: true };
}

function closeModal() {
  modal.value = { type: "", isOpen: false };
}

function getGridClass() {
  const width = window.innerWidth;
  if (width < 650) return "grid grid-cols-1";
  if (width < 900) return "grid grid-cols-2";
  if (width < 1200) return "grid grid-cols-3";
  if (width < 1300) return "grid grid-cols-4";
  return "grid grid-cols-4";
}

function updateGridClass() {
  gridClass.value = getGridClass();
}

function updatePanelHeight() {
  panelHeight.value = window.innerHeight - 64;
}
function editItem(item) {
    categoryStore.setSelectedCategoryID(item.id);
    openModal("edit", item);
}

function confirmDelete(item) {
  openModal("delete", item);
}

function removeItem() {
  categoryStore.deleteCategory(selectedItem.value.id);
  closeModal();
}

onMounted(() => {
  updateGridClass();
  updatePanelHeight();
  document.body.style.overflow = "hidden";
  window.addEventListener("resize", updateGridClass);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateGridClass);
});

</script>

<style scoped>
.wrap-category-list {
  width: 100%;
  gap: 20px;
  padding: 24px;
  box-sizing: border-box;
}

.category-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: var(--white-1);
  border: 1px solid var(--black-2);
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 4px 4px 1px #bdbdbd6b;
}
.category-item:hover .wrap-trash-icon {
  opacity: 1;
  pointer-events: auto;
}

.category-image img {
  width: 64px;
  height: auto;
  max-height: 64px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #f3f4f6;
}

.category-info h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.category-info span {
  font-size: 0.875rem;
  color: #6b7280;
}

.wrap-trash-icon {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-trash-icon:hover {
  background: var(--pale-red-1);
}
.trash-icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: var(--red-1);
}
</style>
