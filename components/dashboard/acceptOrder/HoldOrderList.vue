<template>
  <div class="held-cart-list">
    <h2 class="title">Held Orders</h2>

    <div v-if="heldCart.length">
      <div v-for="(item, index) in heldCart" :key="index" class="held-item">
        <div class="item-header">
          <div class="item-details">
            <p class="item-sub">{{ formatTimestamp(item.id) }}</p>
          </div>
        </div>

        <div class="item-action">
          <button class="restore-btn" @click="restoreHeldItem(item.id)">
            Restore
          </button>
          <div class="trash-icon" @click="clearHeldItem()">
             <Trash />
          </div>
        </div>
      </div>
    </div>

    <p v-else class="empty-text">No held orders.</p>
  </div>
</template>

<script setup>
import { usePosStore } from "~/stores/pos/usePOS";
import { computed } from "vue";
import Trash from "~/components/reuse/icons/Trash.vue";

const pos = usePosStore();
const heldCart = computed(() => pos.holdCart || []);

const emit = defineEmits(["close"]);

const restoreHeldItem = (id) => {
  pos.restoreHeldCart(id);
  emit("close");
};

const clearHeldItem = () => {
  pos.clearHoldCart();
  emit("close");
};

const formatTimestamp = (timestamp) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleString();
};
</script>

<style>
.held-cart-list {
  padding: 16px;
  max-height: 80vh;
  overflow: hidden;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}

.held-item {
  background: var(--white-1);
  display: flex;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.item-details {
  flex: 1;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.item-sub {
  font-size: 14px;
  color: #555;
  margin: 2px 0;
}

.item-price p {
  font-weight: bold;
  font-size: 14px;
}

.item-action {
  display: flex;
  align-items: center;
  text-align: right;
}

.restore-btn {
  background: none;
  color: #007bff;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 12px;
  margin-right: 24px;
  border-radius: 8px;
}

.restore-btn:hover {
  background: var(--very-light-gray);
}

.empty-text {
  color: #999;
  font-size: 14px;
}
</style>
