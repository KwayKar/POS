<template>
  <div class="rounded-md">
    <div class="addon-selector">
      <div v-for="(addon, index) in addons" :key="index" class="addon-box">
        <div class="addon-label">
          {{ addon.label }}
        </div>

        <div class="addon-image" v-if="addon.image">
          <img :src="addon.image" alt="Addon Image" />
        </div>

        <div class="addon-controls">
          <button class="control-btn decrement-btn" @click="decrease(addon)">
            -
          </button>

          <div class="quantity-text">
            {{ getQuantity(addon) }}
          </div>

          <button
            class="control-btn increment-btn"
            :class="{ disabled: getQuantity(addon) >= addon.maxLimit }"
            @click="increase(addon)"
            :disabled="getQuantity(addon) >= addon.maxLimit"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  addons: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:selectedAddons"]);

const selectedAddons = ref([]);

const increase = (addon) => {
  const found = selectedAddons.value.find((a) => a.label === addon.label);
  if (found) {
    if (!addon.maxLimit || found.quantity < addon.maxLimit) {
      found.quantity += 1;
    }
  } else {
    selectedAddons.value.push({ ...addon, quantity: addon.startAt + 1 });
  }
  emit("update:selectedAddons", selectedAddons.value);
};

const decrease = (addon) => {
  const found = selectedAddons.value.find((a) => a.label === addon.label);
  if (found) {
    if (found.quantity > 1) {
      found.quantity -= 1;
    } else {
      // Optionally remove from array when reaching 0
      const index = selectedAddons.value.findIndex(
        (a) => a.label === addon.label
      );
      if (index !== -1) {
        selectedAddons.value.splice(index, 1);
      }
    }
  }
  emit("update:selectedAddons", selectedAddons.value);
};

const getQuantity = (addon) => {
  const found = selectedAddons.value.find((a) => a.label === addon.label);
  if (found) {
    return found.quantity;
  }
  return addon.startAt || 0;
};
</script>

<style scoped>
.addon-selector {
  display: flex;
  gap: 16px;
}

.addon-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 16px;
  background-color: var(--white-1);
  border-radius: 12px;
  width: 150px;
}

.addon-label {
  font-size: 0.95rem;
  text-align: center;
  margin-bottom: 8px;
}

.addon-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 12px;
}

.addon-controls {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.control-btn {
  width: 28px;
  height: 28px;
  font-size: 1.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.control-btn.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.decrement-btn {
  background-color: var(--white-1);
  color: var(--black-1);
  border: 1px solid var(--gray-1);
}

.increment-btn {
  background-color: var(--green-2);
  color: var(--white-1);
}

.quantity-text {
  min-width: 30px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
</style>
