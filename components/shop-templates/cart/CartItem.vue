<template>
  <li
    class="cart-item"
    :style="{ borderBottom: theme?.border && `1px solid ${theme?.border}` }"
    @click="$emit('select', item)"
  >
    <img class="item-image" :src="item.images[0]" :alt="item.title" />
    <div class="cart-info">
      <div class="item-title" @click="$emit('edit', item)">
        {{ item.title }} x {{ item.quantity }}
      </div>

      <div class="item-info">
        <div
          class="option-list"
          v-if="item.selectedAddons && item.selectedAddons.length"
        >
          —
          <div v-for="(option, index) in item.selectedAddons" :key="index">
            <p style="width: 100%">
              {{ option.label }}
              <span v-if="index !== item.selectedAddons.length - 1" style="margin-right: 4px">, </span>
            </p>
          </div>
        </div>
      </div>

      <div class="item-price">${{ item.price }}</div>
    </div>

    <div class="item-delete">
      <button @click.stop="$emit('remove', item.cartId)">✕</button>
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
defineEmits(["remove", "edit"]);

</script>

<style scoped>
.cart-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0 15px;
  cursor: pointer;
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
  width: 100px;
  height: 100px;
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
