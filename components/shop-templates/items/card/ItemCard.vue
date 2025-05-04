<template>
  <div class="item-card" :style="{ background: theme.background }">
    <img
      :src="item.images[0]"
      alt="item image"
      :style="{ backgroundColor: theme.primary }"
    />
    <div class="item-info">
      <h4 :style="{ color: theme.textPrimary }">
        {{ item.title }}
      </h4>
      <p>{{ item.description }}</p>
      <p>
        <strong>{{ item.price }}$</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRestaurant } from "~/stores/shop/useRestaurant";

const { theme } = useRestaurant();

defineProps({
  item: Object,
});
</script>

<style scoped>
.item-card {
  border: 1px solid #ccc;
  border-radius: 12px;
  text-align: center;
  overflow: hidden;
}

.item-card img {
  width: 100%;
  aspect-ratio: 1.25 / 1;
  object-fit: cover;
  display: block;
  padding: 0 62px;
  box-sizing: border-box;
}

.item-info {
  padding: 1rem;
}

h4 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>
