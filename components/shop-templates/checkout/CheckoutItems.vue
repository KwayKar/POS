<template>
  <li
    class="cart-item"
    :style="{
      background: theme.surface,
      borderBottom: theme?.border && `1px solid ${theme?.border}`,
    }"
  >
    <img class="item-image" :src="item.images[0]" :alt="item.title" />
    <div class="cart-info">
      <div class="item-title">{{ item.title }} x {{ item.quantity }}</div>

      <div class="item-info">
        <div
          class="option-list"
          v-if="item.selectedAddons && item.selectedAddons.length"
        >
          —
          <div v-for="(option, index) in item.selectedAddons" :key="index">
            <p style="width: 100%">
              {{ option.label }}
              <span
                v-if="index !== item.selectedAddons.length - 1"
                style="margin-right: 4px"
                >,
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="item-price">${{ item.price }}</div>
    </div>
  </li>
</template>

<script setup>
import { useRestaurant } from "~/stores/shop/useRestaurant";

const { theme } = useRestaurant();

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.cart-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  cursor: pointer;
}

.cart-item:last-of-type {
  border-bottom: none !important;
}

.cart-info {
  width: 100%;
}

.item-title {
  flex: 1;
  font-weight: 500;
  cursor: pointer;
}

.item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  margin: 12px 12px 12px 0;
  flex-shrink: 0;
}

.option-list {
  display: flex;
  flex-wrap: wrap;
  margin: 14px 14px 14px 0;
}

.item-info {
  flex: 2;
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
  color: #666;
}

.item-delete {
  flex: 0.5;
  text-align: center;
}

.item-delete button {
  background: none;
  border: none;
  color: var(--red-1);
  font-size: 1rem;
  cursor: pointer;
}

.item-price {
  flex: 1;
  font-weight: bold;
}
</style>
