<template>
  <div class="select-box relative w-full" ref="selectWrapper">
    <button
      class="select-btn w-full text-left rounded-md flex items-center justify-between focus:outline-none"
      :style="{
        background: 'var(--white-1)',
        fontSize: '0.95rem',
        ...style
      }"
      @click="toggleDropdown"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="dropdownId"
    >
      <!-- Display selected value -->
      <span v-if="!selectedItem">Select an option</span>
      <span v-else>{{ selectedItem.label }}</span>

      <div class="svg-container w-6 h-6 ml-1">
        <svg
          class="w-full h-full"
          viewBox="0 0 20 20"
          fill="var(--black-3)"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </button>

    <!-- dropdown option -->
    <transition
      name="dropdown-drop"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <teleport to="#select-option-1">
        <ul
          v-if="isOpen"
          :id="dropdownId"
          :style="dropdownStyles"
          class="dropdown-list fixed left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-[200px] overflow-y-auto"
          @click="closeDropdown"
        >
          <li
            v-for="option in options"
            :key="option.value"
            class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            @click="selectOption(option)"
          >
            {{ option.label }}
          </li>
        </ul>
      </teleport>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Object],
    default: null,
  },
  style: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedItem = ref(null);
const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;
const selectWrapper = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedItem.value = option;
  emit("update:modelValue", option.value);
  closeDropdown();
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (selectWrapper.value && !selectWrapper.value.contains(event.target)) {
    closeDropdown();
  }
};

onMounted(() => {
  if (!selectedItem.value && props.modelValue) {
    selectedItem.value = props.options.find(
      (option) => option.value === props.modelValue
    );
  }

  window.addEventListener("scroll", updateDropdownPosition);
  window.addEventListener("resize", updateDropdownPosition);

  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => props.modelValue,
  (newValue) => {
    selectedItem.value = props.options.find(
      (option) => option.value === newValue
    );
  }
);

const dropdownStyles = ref({
  top: '0px',
  left: '0px',
  width: '100px'
});

const updateDropdownPosition = () => {
  if (selectWrapper.value) {
    const rect = selectWrapper.value.getBoundingClientRect();
    dropdownStyles.value = {
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`,
    };
  }
};

watch(isOpen, async (open) => {
  if (open) {
    await nextTick(); // ensure DOM update (Teleport renders)
    setTimeout(() => {
      updateDropdownPosition();
    }, 10);
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
.select-box {
}

.dropdown-list {
  z-index: 9999;
}

.select-btn {
  border: 1px solid var(--gray-1);
  border-radius: 7px;
  padding: 10px 10px 10px 18px;
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

ul {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);
  font-size: 0.95rem;
}

ul::-webkit-scrollbar {
  width: 8px;
}

ul::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

ul::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
</style>
