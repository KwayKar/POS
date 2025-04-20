<template>
  <div>
    <DashboardLayout>
      <NavPanel
        class="navPanel fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16"
        style="z-index: 99"
      >
        <NavPanelButton
          style="height: 42px; border: 1px solid var(--black-1)"
          :applyShadow="true"
          @click="openModal('create')"
        >
          Create Promotion
        </NavPanelButton>
      </NavPanel>

      <div class="layout">
        <div class="coupon-section">
          <h2 class="header2 promotion-title">Coupons</h2>
          <div class="wrap-coupon-list" :class="gridClass">
            <div
              v-for="coupon in couponList"
              :key="coupon.id"
              class="coupon-item"
              @click="editItem(coupon)"
            >
              <div class="coupon-info">
                <p @click.stop="copyCode(coupon.code)" class="copy-code">
                  {{ coupon.code }}
                </p>
                <h3>{{ coupon.value }} {{ coupon.subtype }}</h3>
              </div>

              <div class="wrap-trash-icon" @click.stop="confirmDelete(coupon)">
                <div class="trash-icon">
                  <Trash />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="gap-line" />

        <PromotionByProducts @edit-item="editItem" />
      </div>

      <Modal
        v-if="modal.isOpen && (modal.type === 'create' || modal.type === 'edit')"
        @close="closeModal"
        :width="modalWidth"
        :height="modalHeight + 'px'"
        :minHeight="'400px'"
      >
        <CreatePromotion :height="modalHeight - 160" @close="closeModal" />
      </Modal>

      <Modal
        v-if="modal.isOpen && modal.type === 'delete'"
        width="420px"
        height="auto"
        @close="closeModal"
      >
        <ConfirmDelete @remove-item="removeItem" @close="closeModal">
          Are you sure you want to delete {{ selectedItem.name }}?
        </ConfirmDelete>
      </Modal>
    </DashboardLayout>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import ConfirmDelete from "~/components/reuse/ui/ConfirmDelete.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import NavPanelButton from "~/components/dashboard/panels/NavPanelButton.vue";
import Trash from "~/components/reuse/icons/Trash.vue";
import { usePromotion } from "~/stores/promotion/usePromotion";
import PromotionByProducts from "~/components/dashboard/promotions/PromotionByProducts.vue";
import CreatePromotion from "~/components/dashboard/promotions/CreatePromotion.vue";

const promotionStore = usePromotion();
const { setSelectedPromotionID } = usePromotion();
const couponList = computed(() => promotionStore.getCouponPromotions || []);

const selectedItem = ref(null);
const modal = ref({ type: "", isOpen: false });
const gridClass = ref("grid grid-cols-4");
const panelHeight = ref(0);
const windowWidth = ref(0);

function updateWindowWidth() {
  windowWidth.value = window.innerWidth;
}

function openModal(type, item) {
  modal.value = { type, isOpen: true };
  selectedItem.value = { ...item };
}

function closeModal() {
  modal.value = { type: "", isOpen: false };
  setSelectedPromotionID(null);
}

function getGridClass() {
  const width = window.innerWidth;
  if (width < 650) return "grid grid-cols-1";
  if (width < 900) return "grid grid-cols-2";
  if (width < 1200) return "grid grid-cols-3";
  if (width < 1300) return "grid grid-cols-4";
  return "grid grid-cols-4";
}

function updateGridClass() {
  gridClass.value = getGridClass();
}

function updatePanelHeight() {
  panelHeight.value = window.innerHeight - 64;
}

function editItem(item) {
  promotionStore.setSelectedPromotionID(item.id);
  openModal("edit", item);
}

function confirmDelete(item) {
  openModal("delete", item);
}

function removeItem() {
  promotionStore.deletePromotion(selectedItem.value.id);
  closeModal();
}

const modalWidth = computed(() => {
  if (windowWidth.value > 850) {
    return "700px";
  } else {
    return `${windowWidth.value - 40}px`;
  }
});
const modalHeight = computed(() => {
  if (window.innerWidth > 850 && window.innerHeight > 700) {
    return 700;
  } else {
    return `${window.innerHeight - 110}`;
  }
});

onBeforeMount(() => {
  updateGridClass();
  updatePanelHeight();
  window.addEventListener("resize", updateGridClass);
});

onMounted(() => {
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateGridClass);
  window.removeEventListener("resize", updateWindowWidth);
});
</script>

<style scoped>
.layout {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.coupon-section {
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
}

.promotion-title {
  margin-bottom: 16px;
}

.wrap-coupon-list {
  width: 100%;
  gap: 20px;
}

.coupon-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--white-1);
  border: 1px solid var(--black-2);
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 4px 4px 1px #bdbdbd6b;
}
.coupon-item:hover .wrap-trash-icon {
  opacity: 1;
  pointer-events: auto;
}

.coupon-info p {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  text-transform: capitalize;
  text-align: center;
  padding: 6px 6px;
  box-sizing: border-box;
  color: var(--white-1);
  background: var(--primary-btn-color);
  border: 1px solid var(--black-1);
  border-radius: 35px;
}

.coupon-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 18px 0 0px;
  text-transform: capitalize;
  color: var(--black-2);
}

.coupon-info span {
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: capitalize;
}

.wrap-trash-icon {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-trash-icon:hover {
  background: var(--pale-red-1);
}
.trash-icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: var(--red-1);
}
.copy-code {
  cursor: pointer;
}

.gap-line {
  margin: 12px 0;
  width: 100%;
  height: 1px;
  background: var(--gray-1);
}
</style>
