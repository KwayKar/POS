<template>
  <div ref="menuItemsRef" class="menu-container">
    <div
      v-for="category in items"
      :key="category.id"
      class="wrap-items"
      :ref="(el) => sectionRefs.set(category.id, el)"
      :data-category-id="category.id"
    >
      <div class="category-title-wrapper">
        <h2 class="header2 category-title">{{ category.name }}</h2>
        <div
          @click="openModal('edit-category', category.id)"
          style="cursor: pointer"
        >
          <EditPencil />
        </div>
      </div>

      <draggable
        v-model="category.items"
        item-key="id"
        :animation="300"
        ghost-class="ghost"
        chosen-class="chosen"
        drag-class="dragging"
        :move="checkMove"
        @end="onSortEnd"
        class="card-grid"
      >
        <template #item="{ element }">
          <div
            class="menu-card"
            @mouseenter="hover = true"
            @mouseleave="hover = false"
          >
            <div
              class="menu-info"
              :style="{ opacity: element.snoozed ? 0.6 : 1 }"
            >
              <div>
                <h4 class="menu-title">{{ element.product.title }}</h4>
                <p class="menu-description">
                  {{ element.product.description }}
                </p>
              </div>
              <p class="menu-price">${{ element.product.basePrice }}</p>
            </div>
            <div
              class="menu-image"
              :style="{ opacity: element.snoozed ? 0.6 : 1 }"
            >
              <img :src="element.product.images[0]" alt="Food image" />
            </div>

            <div
              class="menu-dots"
              :class="{ hovered: hoverId === `${category.id}-${element.id}` }"
              :ref="(el) => popperRefs.set(`${category.id}-${element.id}`, el)"
              @click.stop="togglePopper(`${category.id}-${element.id}`)"
            >
              <span>⋯</span>
              <div
                v-show="openPopperId === `${category.id}-${element.id}`"
                class="menu-popper"
                :class="popperDirections[`${category.id}-${element.id}`]"
                @click.stop
              >
                <p @click="openConfirmSnooze(category.id, element)">Snooze</p>
                <p @click="openConfirmDelete(category.id, element)">Delete</p>
              </div>
            </div>
          </div>
        </template>
      </draggable>

      <div class="add-item-btn">
        <Button
          style="border: 1px solid var(--gray-2); height: 34px"
          class="category-btn"
          variant="secondary"
          @click="() => openModal('product-list', category.id)"
        >
          <Plus size="18" fill="#232323" />
        </Button>
      </div>
    </div>

    <Modal
      v-if="modal.isOpen && modal.type === 'product-list'"
      :width="modalWidth"
      :height="modalHeight"
      :minHeight="'400px'"
      :isFullScreenMobile="true"
      @close="closeModal"
    >
      <SelectProducts
        :initial-selected="selectedItems"
        :height="700"
        :displayCategories="false"
        @add-selected-items="handleSelectedProducts"
        @close="closeModal"
      />
    </Modal>

    <Modal
      v-if="modal.isOpen && modal.type === 'confirm-delete'"
      width="420px"
      height="auto"
      @close="closeModal"
    >
      <ConfirmDelete @remove-item="deleteItem" @close="closeModal">
        Are you sure you want to delete?
      </ConfirmDelete>
    </Modal>

    <Modal
      v-if="modal.isOpen && modal.type === 'snooze-item'"
      width="420px"
      height="auto"
      @close="closeModal"
    >
      <ToggleSnoozeItem
        :isSnoozed="modal.isSnoozed"
        @toggle-snooze="onSnoozedItem"
      />
    </Modal>

    <Modal
      v-if="modal.isOpen && modal.type === 'edit-category'"
      width="420px"
      height="auto"
      @close="closeModal"
    >
      <CategoryForm
        mode="edit"
        :initialData="selectedCategory"
        @close="closeModal"
      />
    </Modal>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMenu } from "~/stores/menu/useMenu";
import draggable from "vuedraggable";
import Button from "~/components/reuse/ui/Button.vue";
import Plus from "~/assets/icons/plus.vue";
import SelectProducts from "../items/SelectProducts.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import ToggleSnoozeItem from "./ToggleSnoozeItem.vue";
import EditPencil from "~/assets/icons/editPencil.vue";
import CategoryForm from "../products/categories/CategoryForm.vue";
import { useCategory } from "~/stores/product/category/useCategory";

const menu = useMenu();
// don't delete !
const { items, selectedCategory, selectedItems } = storeToRefs(menu);

const menuItemsRef = ref(null);
const panelHeight = ref(0);
const windowWidth = ref(0);
const hover = ref(false);
const openPopperId = ref(null);
const modal = ref({ type: "", isOpen: false, selectedItem: null });

const popperDirections = reactive({});
const popperRefs = new Map();
const selectedPopperElement = ref();
const sectionRefs = new Map();
// const emit = defineEmits(["categoryInView"]);

const togglePopper = (id) => {
  if (id === null) {
    openPopperId.value = null;
  } else {
    const el = popperRefs.get(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const estimatedPopperHeight = 100;

    popperDirections[id] =
      spaceBelow < estimatedPopperHeight ? "top" : "bottom";
    openPopperId.value = openPopperId.value === id ? null : id;
  }
};

const handleClickOutside = (e) => {
  const poppers = document.querySelectorAll(".menu-popper");
  let clickedInside = false;

  poppers.forEach((popper) => {
    if (popper.contains(e.target)) {
      clickedInside = true;
    }
  });

  if (!clickedInside) {
    openPopperId.value = null;
  }
};

const handleSelectedProducts = (items) => {
  const plainItems = items.map((item) => JSON.parse(JSON.stringify(item)));
  menu.addItemsToCategory(plainItems);
};

const openConfirmSnooze = (categoryId, item) => {
  modal.value = {
    type: "snooze-item",
    isOpen: true,
    isSnoozed: item.snoozed,
  };
  selectedPopperElement.value = {
    categoryId: categoryId,
    itemId: item.id,
  };
  togglePopper(null);
};

const onSnoozedItem = () => {
  menu.toggleSnoozeItem(
    selectedPopperElement.value.categoryId,
    selectedPopperElement.value.itemId
  );
  selectedPopperElement.value = {
    categoryId: null,
    itemId: null,
  };
  modal.value = {
    type: null,
    isOpen: true,
    isSnoozed: null,
  };
};

const openConfirmDelete = (categoryId, item) => {
  modal.value = {
    type: "confirm-delete",
    isOpen: true,
  };
  selectedPopperElement.value = {
    categoryId: categoryId,
    itemId: item.id,
  };
};

const deleteItem = async () => {
  const { categoryId, itemId } = selectedPopperElement.value;
  await menu.removeItemFromCategory(categoryId, itemId);
  closeModal();
};

const updatePanelSize = () => {
  if (menuItemsRef.value) {
    panelHeight.value = menuItemsRef.value.offsetHeight;
  }
  windowWidth.value = window.innerWidth;
};

onMounted(async () => {
  // await nextTick();
  updatePanelSize();

  window.addEventListener("resize", updatePanelSize);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  sectionRefs.clear();
  popperRefs.clear();

  window.removeEventListener("resize", updatePanelSize);
  document.removeEventListener("click", handleClickOutside);
});

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

const openModal = (type, categoryId) => {
  modal.value = {
    type,
    isOpen: true,
  };
  menu.onSelectCategory(categoryId);
};

const closeModal = () => {
  modal.value = {
    type: null,
    isOpen: false,
  };
  menu.onSelectCategory(null);
};

const onSortEnd = (evt) => {
  const categoryId = evt.from.closest("[data-category-id]")?.dataset.categoryId;
  const updatedCategory = items.value.find((cat) => cat.id === categoryId);

  if (categoryId && updatedCategory) {
    updatedCategory.items = updatedCategory.items.map((item, index) => ({
      ...item,
      sortOrder: index,
    }));
    menu.sortMenuItems(categoryId, [...updatedCategory.items]);
  }
};
</script>

<style scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100vh;
  margin: 0.5rem 0rem 1.5rem;
  overflow-y: scroll;
  padding: 16px 16px 9rem 16px;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.wrap-items {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.category-title {
  margin: 0.75rem 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.menu-card {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid var(--pale-gray-1);
  border-radius: 8px;
  padding: 12px;
  background-color: var(--white-1);
}

.menu-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-right: 12px;
}

.menu-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--black-1);
}

.menu-description {
  font-size: 0.9rem;
  color: var(--gray-3);
  margin: 10px 0 20px;
}

.menu-price {
  font-size: 0.9rem;
  color: var(--black-2);
}

.menu-image {
  padding: 0 12px 12px;
  box-sizing: border-box;
}

.menu-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}
@media screen and (min-width: 1300px) {
  .menu-image img {
    width: 115px;
    height: 115px;
  }
}
@media screen and (min-width: 1600px) {
  .menu-image img {
    width: 130px;
    height: 130px;
  }
}

.menu-dots {
  position: absolute;
  bottom: 0.5rem;
  right: 0.75rem;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.menu-dots.hovered {
  border: 1px solid var(--gray-3);
}

.menu-popper {
  position: absolute;
  bottom: -2rem;
  right: 0.2rem;
  background: var(--white-1);
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0.5rem;
  width: 120px;
  height: fit-content;
  z-index: 99;
}

.menu-popper.bottom {
  top: 70%;
  margin-top: 8px;
  animation: fadeDropDown 0.2s ease-out;
}

.menu-popper.top {
  bottom: 70%;
  margin-bottom: 8px;
  animation: fadeDropUp 0.2s ease-out;
}

.menu-popper p {
  margin: 0;
  padding: 0.5rem;
  font-size: 0.85rem;
  color: #333;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 5px;
}

.menu-popper p:hover {
  background: var(--hover-color);
}

@media (max-width: 1250px) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 700px) {
  .menu-container {
    grid-template-columns: 1fr;
    padding: 16px var(--global-padding-space) 15rem;
  }

  .menu-image img {
    width: 90px;
    height: 90px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }
}

.add-item-btn {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

@keyframes fadeDropDown {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeDropUp {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
