<template>
  <div
    class="order-section gap-2 smooth-transition"
    :class="{
      'transform translate-y-[-12px]': panelOpen,
      'transform translate-y-[60px]': !panelOpen,
    }"
  >
    <div style="color: var(--gray-1); font-size: 1.2rem">
      <!-- Subtotal -->
      <!-- <div v-if="pricingInfo.subtotal" class="flex justify-between my-2">
        <span>Subtotal:</span>
        <span>{{ pricingInfo.subtotal }}</span>
      </div> -->

      <!-- Discount -->
      <div v-if="pricingInfo.discount" class="flex justify-between my-2">
        <span>Discount:</span>
        <span>-{{ pricingInfo.discount }}</span>
      </div>
    </div>

    <!-- Submit and Option Buttons -->
    <div class="order-btn-section">
      <div
        class="option-button h-12 w-12 bg-white flex flex-col justify-center items-center rounded shadow cursor-pointer"
        @click="togglePanel"
      >
        <span class="dot w-1 h-1 bg-gray-600 rounded-full mb-1"></span>
        <span class="dot w-1 h-1 bg-gray-600 rounded-full mb-1"></span>
        <span class="dot w-1 h-1 bg-gray-600 rounded-full"></span>
      </div>

      <button
        @click="submitOrder"
        class="submit-order flex-1 text-white h-12 rounded shadow"
      >
        Charge - {{ pricingInfo.total }}
      </button>
    </div>

    <!-- Hidden Panel -->
    <div>
      <div class="flex justify-between w-full">
        <div class="flex space-x-4">
          <button
            class="btn-secondary flex flex-col items-center w-20"
            @click="openModal('discount')"
          >
            <Icons icon="Discount" />
            <span class="text-sm mt-1">Discount</span>
          </button>

          <button
            class="btn-secondary flex flex-col items-center w-20"
            @click="toggleHold()"
          >
            <Icons icon="Pause" />
            <span class="text-sm mt-1">Hold</span>
          </button>
        </div>

        <div class="flex">
          <button
            class="btn-secondary flex flex-col items-center w-20"
            @click="togglePanel"
          >
            <Icons icon="Close" />
            <span class="text-sm mt-1">Close</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'discount'"
    :width="modalWidth"
    @close="closeModal"
  >
    <ApplyDiscount @close="closeModal" />
  </Modal>

  <Modal
    v-if="modal.isOpen && modal.type === 'payment'"
    :width="paymentPadModalWidth"
    :isFullScreenMobile="true"
    @close="closeModal"
  >
     <PaymentPad :total="pricingInfo.total" @close="closeModal" />
  </Modal>

  <Modal
    v-if="modal.isOpen && modal.type === 'unhold'"
    :width="modalWidth"
    @close="closeModal"
  >
    <HoldOrderList @close="closeModal" />
  </Modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, onMounted } from "vue";
import Icons from "~/components/reuse/icons/Icons.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import ApplyDiscount from "./ApplyDiscount.vue";
import { useAdmin } from "~/stores/admin/useAdmin";
import { usePosStore } from "~/stores/pos/usePOS";
import HoldOrderList from "./HoldOrderList.vue";
import PaymentPad from "./PaymentPad.vue";

const props = defineProps({
  pricingInfo: Object,
});

const adminStore = useAdmin();
const posStore = usePosStore();

const emit = defineEmits(["openModal"]);

const modal = ref({ isOpen: false, type: "" });
const panelOpen = ref(false);
const windowWidth = ref("0");

const submitOrder = async () => {
  openModal("payment")
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

onMounted(() => {
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});

const modalWidth = computed(() => {
  if (windowWidth.value > 1200) {
    return "540px";
  } else {
    return `${windowWidth.value - 120}px`;
  }
});

const paymentPadModalWidth = computed(() => {
  if (windowWidth.value > 900) {
    return "740px";
  } else {
    return `${windowWidth.value}px`;
  }
});
</script>

<style scoped>
.order-section {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  background: var(--primary-bg-color-3);
}

.option-button {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  width: 100%;
  flex: 1;
  padding-bottom: 5px;
}

.submit-order {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background: var(--primary-btn-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.hidden-panel {
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
}

.hidden-panel.open {
  transform: translateY(0);
}

.btn-secondary {
  background-color: #4a5568;
  color: white;
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.smooth-transition {
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
</style>
