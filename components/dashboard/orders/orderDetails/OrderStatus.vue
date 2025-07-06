<template>
  <div class="order-section gap-2 smooth-transition">
    <div class="order-btn-section">
      <div
        class="edit-button"
        :style="{ background: isEditMode ? '#ececec' : 'var(--white-1)' }"
        @click="toggleEditMode"
      >
        <div class="svg">
          <EditPencil />
        </div>
        {{
          isEditMode
            ? shouldShowEditText
              ? "Done"
              : ""
            : shouldShowEditText
            ? "Edit"
            : ""
        }}
      </div>

      <div class="wrap-buttons">
        <div class="printer-button" @click="togglePanel">
          <Printer />
          <div v-if="shouldShowEditText">Print</div>
        </div>

        <div class="wrap-status-btn" ref="statusBoxRef">
          <button @click="openStatusBox = !openStatusBox" class="status-btn">
            {{ orderStatus }}
          </button>

          <transition
            name="dropdown-rise"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <ul v-if="openStatusBox" class="dropdown-list">
              <li
                v-for="option in statusOptions"
                :key="option.value"
                class="dropdown-item"
                @click="selectOption(option)"
              >
                {{ option.label }}
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'discount'"
    :width="modalWidth"
    @close="closeModal"
  >
  </Modal>
</template>

<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
  onBeforeUnmount,
  computed,
} from "vue";
import EditPencil from "~/assets/icons/editPencil.vue";
import Printer from "~/assets/icons/printer.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import { useWindowSize } from "~/composables/useWindowSize";
import { useOrder } from "~/stores/order/useOrder";
import { usePosStore } from "~/stores/pos/usePOS";
import { useUser } from "~/stores/user/useUser";

const props = defineProps({
  orderStatus: String,
});

const posStore = usePosStore();
const userStore = useUser();
const order = useOrder();

const { width } = useWindowSize();
const shouldShowEditText = computed(() => width.value > 700);

const statusOptions = computed(() => {
  if (userStore.role === "kitchen") {
    return [
      { label: "Pending", value: "Pending" },
      { label: "Processing", value: "Processing" },
      { label: "Completed", value: "Completed" },
      { label: "Cancelled", value: "Cancelled" },
    ];
  } else {
    return [
      { label: "Pending", value: "Pending" },
      { label: "Processing", value: "Processing" },
      { label: "Completed", value: "Completed" },
      { label: "Cancelled", value: "Cancelled" },
    ];
  }
});

const emit = defineEmits(["openModal", "edit-mode-toggle"]);

const modal = ref({ isOpen: false, type: "" });
const panelOpen = ref(false);
const windowWidth = ref("0");
const isEditMode = ref(false);
const openStatusBox = ref(false);
const statusBoxRef = ref(null);

const submitOrder = async () => {
  openModal("payment");
};

const toggleHold = () => {
  if (posStore.cart.length > 0) {
    posStore.holdCurrentCart();
  } else {
    openModal("unhold");
  }
};

const togglePanel = () => {
  panelOpen.value = !panelOpen.value;
};

const openModal = (type) => {
  modal.value = { isOpen: true, type };
  emit("openModal", type);
};

const closeModal = () => {
  modal.value = { isOpen: false, type: "" };
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
  emit("edit-mode-toggle", isEditMode.value);
};

const selectOption = (option) => {
  order.updateOrderStatus(option.value);
  openStatusBox.value = false;
};

onMounted(() => {
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
  document.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (event) => {
  if (statusBoxRef.value && !statusBoxRef.value.contains(event.target)) {
    openStatusBox.value = false;
  }
};

const modalWidth = computed(() => {
  if (windowWidth.value > 1200) {
    return "540px";
  } else {
    return `${windowWidth.value - 120}px`;
  }
});
</script>

<style scoped>
.order-section {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 100%;
}

.option-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gray-1);
}

.option-button:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.option-button .dot {
  width: 4px;
  height: 4px;
  background-color: #4a5568;
  border-radius: 50%;
}

.order-btn-section {
  display: flex;
  gap: 12px;
  flex: 1;
  padding-bottom: 5px;
  justify-content: space-between;
}

.status-btn {
  display: flex;
  width: 300px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 14px;
  background: var(--primary-btn-color);
  transition: box-shadow 0.2s;
  text-transform: capitalize;
}

.printer-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  border-radius: 14px;
  background: #383c42;
  border: 1px solid var(--gray-1);
  cursor: pointer;
}

.edit-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  border-radius: 14px;
  border: 1.5px solid var(--gray-1);
  font-weight: bold;
  color: var(--black-1);
  box-shadow: var(--box-shadow-2);
  cursor: pointer;
}

.edit-button .svg {
  transform: scale(1.2);
  margin-right: 12px;
  margin-bottom: 3px;
}
@media screen and (max-width: 700px) {
  .edit-button {
    width: 75px;
  }
  .edit-button .svg {
    margin-right: 0px;
    display: flex;
    justify-content: center;
  }
}

.printer-button div {
  color: var(--white-1);
  margin-left: 20px;
  font-weight: bold;
}
@media screen and (max-width: 700px) {
  .printer-button {
    width: 85px;
  }
}

.printer-button svg {
  transform: scale(1.5);
}

.wrap-buttons {
  display: flex;
}

.wrap-status-btn {
  position: relative;
}

.dropdown-rise-enter-active,
.dropdown-rise-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.dropdown-rise-enter-from,
.dropdown-rise-leave-to {
  transform: translateY(10px) scaleY(0.95);
  opacity: 0;
}

.status-btn {
  display: flex;
  width: 300px;
  height: 48px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 14px;
  background: var(--primary-btn-color);
  box-shadow: var(--box-shadow-2);
  color: var(--white-1);
  cursor: pointer;
}
@media screen and (max-width: 700px) {
  .status-btn {
    width: 200px;
  }
}


.dropdown-list {
  position: absolute;
  bottom: 100%;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  background-color: var(--white-1);
  border: 1px solid #d1d5db;
  border-radius: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 250px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 13px 26px;
  color: #374151;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}
</style>
