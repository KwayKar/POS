<template>
  <div
    ref="container"
    class="item-list"
    :style="{ background: theme.background }"
  >
    <div
      v-for="cat in categories"
      :key="cat.id"
      :ref="(el) => sectionRefs.set(cat.id, el)"
      class="category-section"
      :data-category-id="cat.id"
    >
      <h2 class="section-title">{{ cat.category }}</h2>
      <div class="item-grid">
        <ItemCard
          v-for="item in cat.items"
          :key="item.id"
          :item="item"
          @select="openItemDetails"
        />
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'item-details'"
    :width="modalWidth"
    :height="modalHeight"
    :minHeight="'400px'"
    :animateOnDisplay="true"
    :isFullScreenMobile="true"
    @close="closeModal"
  >
    <ItemDetails />
  </Modal>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import ItemCard from "../card/ItemCard.vue";
import { useRestaurant } from "~/stores/shop/useRestaurant";
import Modal from "~/components/reuse/ui/Modal.vue";
import ItemDetails from "../../item-details/ItemDetails.vue";

const restaurant = useRestaurant();

const { theme, onSelectItem } = useRestaurant();
const blockEmitCategory = restaurant.blockEmitCategory;

const props = defineProps({
  categories: Array,
});

const emit = defineEmits(["categoryInView"]);

const modal = ref({
  isOpen: false,
  type: '',
});
const windowSize = ref({
  width: 0, height: 0
});

const sectionRefs = new Map();
let observer = null;

function openItemDetails(item) {
  onSelectItem(item);
  modal.value.isOpen = true;
  modal.value.type = 'item-details';
}

function closeModal() {
  modal.value.isOpen = false;
  modal.value.type = null;
}

const modalWidth = computed(() => {
  if (windowSize.value.width > 1250) {
    return "1200px";
  } else if (windowSize.value.width > 1150) {
    return `${windowSize.value.width - 100}px`;
  } else {
    return `${windowSize.value.width - 120}px`;
  }
});

const modalHeight = computed(() => {
  if (windowSize.value.width > 900) {
    return `${windowSize.value.height - 150}px`;
  } else {
    return `${windowSize.value.height}px`;
  }
});

const updatePanelSize = () => {
  windowSize.value = {
    width: window.innerWidth,
    height: window.innerHeight
  }
};

onMounted(() => {
  observer = new IntersectionObserver(

    (entries) => {
      entries.forEach((entry) => {
        if (blockEmitCategory) return; 

        if (entry.isIntersecting) {
          const id = [...sectionRefs.entries()].find(
            ([, el]) => el === entry.target
          )?.[0];
          
          if (id && !blockEmitCategory) {
            emit("categoryInView", id);
          }
        }
      });

    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  );

  sectionRefs.forEach((el) => observer.observe(el));
  
  updatePanelSize();
  window.addEventListener("resize", updatePanelSize);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
  window.removeEventListener("resize", updatePanelSize);
});
</script>

<style scoped>
.item-list {
  padding-top: 2rem;
}

.category-section {
  margin: 0px 24px 40px;
  scroll-margin-top: 80px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 16px;
}

.item-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 600px) {
  .item-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .item-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .item-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
