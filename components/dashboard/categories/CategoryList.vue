<template>
  <div class="category-list flex space-x-4 pt-4 pb-4 pr-4">
    <button
      v-for="category in categories"
      :key="category"
      @click="$emit('select-category', category)"
      class="custom-button"
    >
      {{ category }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.custom-button {
  background-color: #87b49a;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}
.custom-button:hover {
  opacity: 0.7;
}
</style>
