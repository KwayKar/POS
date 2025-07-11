<template>
  <div class="category-layout">
    <div
      class="category-sidebar"
      ref="menuCategoryRef"
      :style="{
        width: '100%',
      }"
    >
      <div class="wrap-header hide-on-desktop">
        <Button class="mobile-menu-btn hide-on-desktop" @click="toggleDrawer">
          Sort Order
        </Button>
      </div>

      <div class="wrap-categories">
        <ul
          :style="{
            flex: 1,
            height:
              typeof panelHeight === 'number'
                ? `${panelHeight}px`
                : panelHeight,
          }"
          class="category-list hide-on-mobile"
        >
          <draggable
            v-model="items"
            item-key="id"
            :animation="300"
            ghost-class="ghost"
            chosen-class="chosen"
            :drag-class="'dragging'"
            style="display: flex; align-items: center; margin-left: 12px;"
            @end="onSortEnd"
          >
            <template #item="{ element, index }">
              <li
                :key="element.id"
                :class="['category-item', { 'animate-wiggle': enableSort }]"
                @click="$emit('select', element.id)"
                :style="{
                  background: '#fff',
                  height: '36px !important',
                  borderRadius: '20px',
                  color: 'var(--black-3)',
                  border: '1px solid var(--gray-2)',
                  marginRight: index === items.length - 1 ? '150px' : '',
                  position: 'relative',
                }"
              >
                <span>{{ element.name }}</span>
                <button
                  v-if="enableSort"
                  @click.stop="confirmDelete(element)"
                  class="cross-btn"
                  title="Remove"
                >
                  ×
                </button>
              </li>
            </template>
          </draggable>
        </ul>

        <div class="category-section-action">
          <Button
            style="border: 1px solid var(--black-1); height: 38px"
            variant="primary"
            @click="openCreateModal"
            :style="{ fontSize: '1.4rem', marginRight: '1rem' }"
          >
            {{ "+" }}
          </Button>

          <Button
            style="border: 1px solid var(--black-1); height: 38px"
            variant="primary"
            @click="enableSortingDesktop"
            :style="{ background: enableSort ? 'var(--green-2)' : '' }"
          >
            {{ !enableSort ? "Sort" : "Done" }}
          </Button>
        </div>
      </div>
    </div>
  </div>

  <Drawer :direction="'bottom'" :title="Categories" :isOpen="isDrawerOpen" @close="toggleDrawer">
    <ul
      :style="{
        height:
          typeof panelHeight === 'number' ? `${panelHeight}px` : panelHeight,
      }"
      class="category-list"
    >
      <draggable
        v-model="items"
        item-key="id"
        :animation="300"
        ghost-class="ghost"
        chosen-class="chosen"
        :drag-class="'dragging'"
      >
        <template #item="{ element, index }">
          <li
            :key="element.id"
            :style="{
              marginRight: index === items.length - 1 ? '150px' : '',
              background: '#fff',
            }"
          >
            {{ element.name }}
          </li>
        </template>
      </draggable>
    </ul>
  </Drawer>

  <Modal
    v-if="modal.isOpen && modal.type === 'create-category'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <CategoryForm @close="closeModal" />
  </Modal>

  <Modal
    v-if="modal.isOpen && modal.type === 'remove-category'"
    width="420px"
    height="auto"
    @close="closeModal"
  >
    <ConfirmDelete @remove-item="handleRemove" @close="closeModal">
      <div>
        <p style="font-size: 0.95rem">All items inside {{ modal?.selectedItem?.name }} will be deleted.</p>
      </div>
    </ConfirmDelete>
  </Modal>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMenu } from "~/stores/menu/useMenu";
import draggable from "vuedraggable";
import Drawer from "~/components/reuse/ui/Drawer.vue";
import Button from "~/components/reuse/ui/Button.vue";
import CategoryForm from "../products/categories/CategoryForm.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import { useCategory } from "~/stores/product/category/useCategory";

const menu = useMenu();
const categoryStore = useCategory();
const { items } = storeToRefs(menu);
const { setSortedCategories } = menu;

const menuCategoryRef = ref(null);
const panelHeight = ref("70px");
const panelWidth = ref("auto");
const isMobile = ref(false);
const isDrawerOpen = ref(false);
const enableSort = ref(false);
const modal = ref({
  type: null,
  isOpen: false,
  selectedItem: null
});

const updatePanelHeight = () => {
  const isDesktop = window.innerWidth >= 1100;
  isMobile.value = window.innerWidth < 1100;
  if (menuCategoryRef.value) {
    if (isDesktop) {
      panelWidth.value = menuCategoryRef.value.offsetWidth;
      panelHeight.value = "70px";
    } else {
      panelWidth.value = "100%";
      panelHeight.value = "100%";
    }
  }
};

onMounted(async () => {
  await nextTick();
  updatePanelHeight();
  window.addEventListener("resize", updatePanelHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updatePanelHeight);
});

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const enableSortingDesktop = () => {
  enableSort.value = !enableSort.value;
};

const onSortEnd = () => {
  setSortedCategories([...items.value]);
};

const openCreateModal = () => {
  modal.value = {
    type: "create-category",
    isOpen: true,
  };
};

const confirmDelete = (item) => {
  modal.value = {
    type: "remove-category",
    isOpen: true,
    selectedItem: item
  };
}

const handleRemove = () => {
  categoryStore.deleteCategory(modal.value.selectedItem?.id);
  closeModal();
}

const closeModal = () => {
  modal.value = {
    type: null,
    isOpen: false,
    selectedItem: null
  };
};
</script>

<style scoped>
.category-layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  background: var(--primary-bg-color-1);
}
@media screen and (max-width: 1099px) {
  .category-layout {
    padding: 1rem var(--global-padding-space) 0;
  }
}

@media screen and (min-width: 1100px) {
  .container {
    min-height: 100vh;
  }
}

.wrap-categories {
  width: 100%;
  display: flex;
  border-bottom: 1px solid var(--gray-2);
}
@media screen and (max-width: 1099px) {
  .wrap-categories {
    display: none;
  }
}

.category-sidebar {
  width: 100%;
}

.wrap-header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  flex: 1;
  padding: 0.5rem 0 1.5rem;
}
@media screen and (max-width: 1099px) {
  .wrap-header {
    padding: 0.5rem 0 0.5rem;
  }
}

.content {
  flex: 1;
}

.category-list {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  /* overflow-y: hidden; */
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-list::-webkit-scrollbar {
  display: none;
}

.category-list > div {
  width: 500px;
}

@media screen and (max-width: 1099px) {
  .hide-on-mobile {
    display: none !important;
  }
}

@media screen and (min-width: 1100px) {
  .hide-on-desktop {
    display: none !important;
  }
}

.category-list li {
  font-size: 1.05rem;
  cursor: pointer;
  width: 150px;
  margin-right: 12px;
  font-weight: 600;
  color: var(--black-3);

  min-width: 100px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce-in 0.4s ease;
}

.category-item {
  justify-content: flex-start;
}

.category-section-action {
  margin: 0 20px 0 0;
  padding-left: 20px;
  display: flex;
  align-items: center;
  border-left: 1px solid var(--gray-2);
}

@media screen and (max-width: 1000px) {
  .category-list li {
    justify-content: flex-start;
    margin-bottom: 24px;
    animation: bounce-in 0s ease;
  }
}

@media (max-width: 1099px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    border: none;
  }

  .content {
    flex: 1;
    overflow-y: auto;
  }
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.chosen {
  background: var(--white-1) !important;
  z-index: 99;
  box-shadow: none !important;
  outline: none !important;
  padding: 14px 20px;
  overflow: hidden;
}

.cross-btn {
  color: var(--red-1);
  font-size: 18px;
  position: absolute;
  right: 10px;
  top: 7px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--red-2);
  border-radius: 50%;
  cursor: pointer;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.95);
  }
  60% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.category-item.animate-wiggle {
  animation: wiggle 0.6s ease-in-out infinite;
}

@keyframes wiggle {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  75% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
