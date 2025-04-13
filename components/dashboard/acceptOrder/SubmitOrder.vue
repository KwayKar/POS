<template>
  <div>
    <div
      class="flex w-full items-center justify-between gap-2 smooth-transition mb-2"
      :class="{
        'transform translate-y-[-80px]': panelOpen,
        'transform translate-y-0': !panelOpen,
      }"
      style="color: var(--gray-1); font-size: 1.2rem"
    >
      <!-- Subtotal -->
      <div v-if="pricingInfo.subtotal" class="flex justify-between my-2">
        <span>Subtotal:</span>
        <span>{{ pricingInfo.subtotal  }}</span>
      </div>

      <!-- Discount -->
      <div v-if="pricingInfo.discount" class="flex justify-between my-2">
        <span>Discount:</span>
        <span>-{{ pricingInfo.discount }}</span>
      </div>
    </div>

    <!-- Submit and Option Buttons -->
    <div
      class="flex w-full items-center justify-between gap-2 smooth-transition"
      :class="{
        'transform translate-y-[-80px]': panelOpen,
        'transform translate-y-0': !panelOpen,
      }"
    >
      <div
        class="option-button h-12 w-12 bg-white flex flex-col justify-center items-center rounded shadow cursor-pointer"
        @click="togglePanel"
      >
        <span class="dot w-1 h-1 bg-gray-600 rounded-full mb-1"></span>
        <span class="dot w-1 h-1 bg-gray-600 rounded-full mb-1"></span>
        <span class="dot w-1 h-1 bg-gray-600 rounded-full"></span>
      </div>

      <button class="submit-order flex-1 text-white h-12 rounded shadow">
        Charge - {{ pricingInfo.total }}
      </button>
    </div>

    <!-- Hidden Panel -->
    <div
      class="absolute bottom-0 left-0 w-full bg-gray-700 p-3 mt-5 text-white rounded smooth-transition"
      :class="{
        'translate-y-[calc(5px)]': panelOpen,
        'translate-y-[calc(100px)]': !panelOpen,
      }"
    >
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
            @click="openModal('hold')"
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

    <Modal
      v-if="modal.isOpen && modal.type === 'discount'"
      width="540px"
      @close="closeModal"
    >
      <ApplyDiscount />
    </Modal>
  </div>
</template>

<script>
import Icons from "~/components/reuse/icons/Icons.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import ApplyDiscount from "./ApplyDiscount.vue";

export default {
  components: {
    Icons,
    Modal,
    ApplyDiscount,
  },
  data() {
    return {
      modal: {
        isOpen: false,
        type: "",
      },
      panelOpen: false
    };
  },
  props: {
    pricingInfo: {
      type: Object,
    },
  },
  watch: {
    panelOpen(newVal) {
      // Update parent's overflow style dynamically
      if (this.$el.parentNode) {
        if (newVal) {
          this.$el.parentNode.style.overflow = "visible";
        } else {
          setTimeout(() => {
            if (!this.panelOpen) {
              this.$el.parentNode.style.overflow = "hidden";
            }
          }, 500);
        }
      }
    },
  },
  methods: {
    togglePanel() {
      this.panelOpen = !this.panelOpen;
    },
    openModal(type) {
      this.modal = { isOpen: true, type };
    },
    closeModal() {
      this.modal = { isOpen: false, type: "" };
    },
  },
};
</script>

<style scoped>
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
