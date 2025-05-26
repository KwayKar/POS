<template>
  <div class="category-section">
    <Button
      v-for="category in categories"
      :key="category.id"
      style="border: 1px solid var(--black-1); height: 34px"
      @click="$emit('select-category', category)"
      @select-category="filterItems"
      :class="['category-btn', { 'active-category': selected === category.id }]"
      variant="secondary"
    >
      {{ category?.name ?? category?.category }}
    </Button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "~/components/reuse/ui/Button.vue";

const props = defineProps({
  selected: {
    type: String
  },
  categories: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["select-category"]);

const windowWidth = ref(0);

onMounted(() => {
  windowWidth.value = window.innerWidth;
});
</script>

<style scoped>
.category-section {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  overflow-x: auto !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

.category-section::-webkit-scrollbar {
  display: none;
}

.category-btn {
  white-space: nowrap;
  max-width: 280px;
}

.category-btn.active-category {
  background-color: var(--black-2); 
  color: white;
  border-color: var(--black-1);
}
</style>
