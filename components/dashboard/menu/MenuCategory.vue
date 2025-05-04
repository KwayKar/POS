<template>
  <div class="category-layout">
    <div
      class="category-sidebar"
      ref="menuCategoryRef"
      :style="{
        width: typeof panelWidth === 'number' ? `${panelWidth}px` : panelWidth,
      }"
    >
      <div class="wrap-header">
        <h2 class="header2">Categories</h2>
        <button class="mobile-menu-btn hide-on-desktop" @click="toggleDrawer">
          Categories
        </button>
      </div>

      <ul
        :style="{
          height:
            typeof panelHeight === 'number' ? `${panelHeight}px` : panelHeight,
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
        >
          <template #item="{ element, index }">
            <li
              :key="element.id"
              :style="{
                marginRight: index === items.length - 1 ? '150px' : '',
              }"
            >
              {{ element.category }}
            </li>
          </template>
        </draggable>
      </ul>

      
    </div>
  </div>

  <Drawer :items="items" :isOpen="isDrawerOpen" @close="toggleDrawer">
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
            }"
          >
            {{ element.category }}
          </li>
        </template>
      </draggable>
    </ul>
  </Drawer>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMenu } from "~/stores/menu/useMenu";
import draggable from "vuedraggable";
import Drawer from "~/components/reuse/ui/Drawer.vue";

const menu = useMenu();
const { items, selectedCategory } = storeToRefs(menu);
const { setSortedCategories } = menu;

const menuCategoryRef = ref(null);
const panelHeight = ref("auto");
const panelWidth = ref("auto");
const isMobile = ref(false);
const isDrawerOpen = ref(false);

const updatePanelHeight = () => {
  const isDesktop = window.innerWidth >= 1100;
  isMobile.value = window.innerWidth < 1100;
  if (menuCategoryRef.value) {
    if (isDesktop) {
      panelWidth.value = menuCategoryRef.value.offsetWidth;
      panelHeight.value = menuCategoryRef.value.offsetHeight;
    } else {
      panelWidth.value = '100%';
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

const onSortEnd = () => {
  setSortedCategories([...items.value]);
};
</script>

<style scoped>
.category-layout {
  display: flex;
  flex-direction: row;
  width: 100%;
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

.category-sidebar {
  width: 100%;
}

.wrap-header {
  display: flex;
  justify-content: space-between;
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
  overflow-y: auto;
  height: 100vh;
  padding-bottom: 10rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
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
  display: flex;
  align-items: center;
  padding: 20px 5px 35px;
  cursor: pointer;
  height: 36px;
  background: transparent;
  width: 100%;
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
  background: #fff !important;
  z-index: 99;
  box-shadow: none !important;
  outline: none !important;
  padding: 14px 20px;
  overflow: hidden;
}
</style>
