<template>
  <div ref="selectWrapper" class="select-wrapper">
    <!-- Toggle button -->
    <button
      class="toggle-button"
      @click="toggleDropdown"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="dropdownId"
    >
      <span>Select options</span>
      <svg class="icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Selected items -->
    <div class="selected-items">
      <span
        v-for="item in selectedItems"
        :key="item"
        class="selected-item"
      >
        {{ getNameById(item) }}
        <button class="remove-button" @click.stop="removeItem(item)" aria-label="Remove selected item">
          ×
        </button>
      </span>
    </div>

    <!-- Dropdown options -->
    <transition
      name="dropdown-drop"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <teleport to="body">
        <ul
          v-if="isOpen"
          :id="dropdownId"
          :style="dropdownStyles"
          class="dropdown-list"
          @click.stop
        >
          <li
            v-for="option in options"
            :key="option.id"
            @click="selectOption(option)"
            class="dropdown-option"
          >
            {{ option.name }}
          </li>
        </ul>
      </teleport>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedItems = ref([...props.modelValue]);
const selectWrapper = ref(null);
const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  if (!selectedItems.value.find((item) => item === option.id)) {
    selectedItems.value.push(option.id);
    emit("update:modelValue", [...selectedItems.value]);
    toggleDropdown();
  }
};

const removeItem = (itemToRemove) => {
  selectedItems.value = selectedItems.value.filter(
    (item) => item !== itemToRemove
  );
  emit("update:modelValue", [...selectedItems.value]);
};

const handleClickOutside = (e) => {
  if (selectWrapper.value && !selectWrapper.value.contains(e.target)) {
    isOpen.value = false;
  }
};

const getNameById = (id) => {
  const option = props.options && props.options.find(opt => opt.id === id);
  return option ? option.name : '';
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => props.modelValue,
  (newVal) => {
    selectedItems.value = [...newVal];
  },
  { deep: true }
);

const dropdownStyles = ref({
  top: "0px",
  left: "0px",
  width: "100px",
});

const updateDropdownPosition = () => {
  if (selectWrapper.value) {
    const rect = selectWrapper.value.getBoundingClientRect();
    dropdownStyles.value = {
      top: `${(rect.bottom + window.scrollY) - 32}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`,
    };
  }
};

watch(isOpen, async (open) => {
  if (open) {
    await nextTick();
    updateDropdownPosition();
  }
});

const beforeEnter = (el) => {
  el.style.transform = "translateY(-10px) scaleY(0.95)";
  el.style.opacity = 0;
};

const enter = (el, done) => {
  el.offsetHeight;
  el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  el.style.transform = "translateY(0) scaleY(1)";
  el.style.opacity = 1;
  done();
};

const leave = (el, done) => {
  el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  el.style.transform = "translateY(-10px) scaleY(0.95)";
  el.style.opacity = 0;
  done();
};
</script>

<style scoped>
.select-wrapper {
  position: relative;
  width: 100%;
}

.toggle-button {
  width: 100%;
  text-align: left;
  border: 1px solid var(--gray-1);
  padding: 0.5rem;
  border-radius: 6px;
  background-color: var(--white-1);;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.5rem;
}

.selected-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.selected-item {
  background-color: var(--white-1);
  border: 1px solid var(--pale-gray-1);
  font-size: 0.875rem;
  padding: 0.3rem 0.5rem 0.3rem 1rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
}

.remove-button {
  color: var(--red-1);
  background: none;
  border: none;
  border-radius: 50%;
  background: var(--pale-red-1);
  cursor: pointer;
  font-size: 1.25rem;
  margin-left: 0.5rem;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-list {
  position: fixed;
  background: var(--white-1);
  border: 1px solid #d1d5db;
  border-radius: 6px;
  max-height: 15rem;
  overflow-y: auto;
  z-index: 9999;
}

.dropdown-option {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.dropdown-option:hover {
  background-color: #f3f4f6;
}

.dropdown-drop-enter-active,
.dropdown-drop-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.dropdown-drop-enter,
.dropdown-drop-leave-to {
  transform: translateY(-10px) scaleY(0.95);
  opacity: 0;
}

ul::-webkit-scrollbar {
  width: 6px;
}
ul::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>
