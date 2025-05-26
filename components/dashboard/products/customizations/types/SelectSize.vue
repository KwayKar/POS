<template>
  <div class="rounded-md">
    <div class="size-selector">
      <div
        v-for="(size, index) in sizes"
        :key="index"
        class="size-box"
        @click="selectSize(size)"
        :class="[
          selectedSize?.label === size.label ? 'selected' : '',
          size.label.length > 2 ? 'long-size' : 'short-size',
        ]"
      >
        {{ size.label }}
      </div>
    </div>

    <div v-if="selectedSize?.extraPrice" class="selected-info item-size-price">
      <p class="extra-price" v-if="selectedSize.extraPrice">
        +{{ formatPrice(selectedSize.extraPrice) }}
      </p>
      <span>(Total - {{ formatPrice(selectedSize.extraPrice + itemPrice) }})</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  sizes: {
    type: Array,
    required: true,
  },
  itemPrice: {
    type: Number,
  },
  modelValue: {
    type: Object, // The selected size object
    default: null,
  },
});

const selectedSize = ref(null);
const emit = defineEmits(["update:selectedSize", "update:extraPrice"]);

const selectSize = (size) => {
  selectedSize.value = size;
  emit("update:selectedSize", size);
};

const formatPrice = (price) => {
  return `${parseFloat(price).toFixed(2)}`;
};

onMounted(() => {
  if (props.modelValue) {
    selectSize(props.modelValue);
  } else if (props.sizes?.length) {
    selectSize(props.sizes[0]);
  }
});

// watch(
//   () => props.modelValue,
//   (newVal) => {
//     if (newVal) selectSize(newVal);
//   }
// );
</script>

<style scoped>
.size-selector {
  display: flex;
  flex-wrap: wrap;
}

.size-box {
  padding: 10px 16px;
  border: 1px solid #ccc;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  transition: background 0.2s;
}

/* No gap between size boxes */
.size-box + .size-box {
  margin-left: -1px; /* Overlap borders */
}

.size-box {
  background-color: var(--white-1);
}

.size-box.selected {
  background-color: var(--black-2);
  color: var(--white-1);
  border-color: var(--black-2);
}

.short-size + .short-size {
  margin-left: -1px;
}

/* Long label (like Small, Large) */
.long-size {
  margin-right: 12px;
  border-radius: 24px;
  padding: 6px 24px;
  display: flex;
  align-items: center;
}

.extra-price {
  font-size: 0.95rem;
  color: var(--green-1);
}

.item-size-price {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.item-size-price > p {
  margin-right: 15px;
}

.item-size-price > span {
  color: #807d7d;
}
</style>
