<template>
  <div class="category-list flex space-x-4 pt-4 pb-4 pr-4">
    <Button
      v-for="category in categories"
      :key="category.id"
      @click="$emit('select-category', category)"
    >
      {{ category.name }}
    </Button>
  </div>
</template>

<script>
import Button from '~/components/reuse/ui/Button.vue';

export default {
  components: {
    Button
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
