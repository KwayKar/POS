<template>
  <div class="rounded-md">
    <div class="addon-selector">
      <div
        v-for="(addon, index) in addons"
        :key="index"
        class="addon-box"
        :style="{ justifyContent: !addon?.image ? 'space-between' : undefined }"
      >
        <div
          class="addon-label"
          :style="{ 
            marginBottom: addon?.image ? '8px' : '20px',
          }"
        >
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
  selectdValues: {
    type: Array,
    default: null,
  },
});

const emit = defineEmits(["updateValue"]);

const selectedAddons = ref([]);

const increase = (addon) => {
  const found = selectedAddons.value.find((a) => a.id === addon.id);
  if (found) {
    if (!addon.maxLimit || found.quantity < addon.maxLimit) {
      found.quantity += 1;
    }
  } else {
    selectedAddons.value.push({ ...addon, quantity: addon.startAt + 1 });
  }
  emit("updateValue", selectedAddons.value);
};

const decrease = (addon) => {
  const found = selectedAddons.value.find((a) => a.id === addon.id);
  if (found) {
    if (found.quantity > 1) {
      found.quantity -= 1;
    } else {
      // Optionally remove from array when reaching 0
      const index = selectedAddons.value.findIndex((a) => a.id === addon.id);
      if (index !== -1) {
        selectedAddons.value.splice(index, 1);
      }
    }
  }
  emit("update:selectedAddons", selectedAddons.value);
};

const getQuantity = (addon) => {
  const found = selectedAddons.value.find((a) => a.id === addon.id);
  if (found) {
    return found.quantity;
  }
  return addon.startAt || 0;
};

onMounted(() => {
  if (props.selectdValues && props.selectdValues.length > 0) {
    selectedAddons.value = [...props.selectdValues];
  }
});
</script>

<style scoped>
.addon-selector {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.addon-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 16px;
  background-color: var(--white-1);
  border-radius: 12px;
  /* width: 170px; */
  flex: 0 1 calc(33.333% - 16px);
}
@media screen and (max-width: 700px) {
  .addon-box {
    flex: 0 1 calc(50% - 10px);
    box-sizing: border-box;
  }
}

.addon-label {
  font-size: 0.95rem;
  text-align: center;
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
