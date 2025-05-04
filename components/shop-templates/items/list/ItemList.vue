<template>
  <div ref="container" class="item-list" :style="{ background: theme.background }">
    <div
      v-for="cat in categories"
      :key="cat.id"
      :ref="el => sectionRefs.set(cat.id, el)"
      class="category-section"
      :data-category-id="cat.id"
    >
      <h2 class="section-title">{{ cat.category }}</h2>
      <div class="item-grid">
        <ItemCard v-for="item in cat.items" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import ItemCard from '../card/ItemCard.vue'
import { useRestaurant } from "~/stores/shop/useRestaurant";

const { theme } = useRestaurant();

const props = defineProps({
  categories: Array,
})

const emit = defineEmits(['categoryInView'])

const sectionRefs = new Map()
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = [...sectionRefs.entries()].find(([, el]) => el === entry.target)?.[0]
          if (id) emit('categoryInView', id)
        }
      })
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
  )

  sectionRefs.forEach(el => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
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
