<template>
  <div ref="panelRefHeight" style="height: 100%">
    <div class="header-section">
      <h3 class="header3">Staff List</h3>
      <Button
        @click="onSelectStaff()"
        :applyShadow="true"
        :style="{ height: '40px' }"
        variant="primary"
        >Create</Button
      >
    </div>

    <div
      class="staff-list"
      :style="{
        height:
          typeof panelHeight === 'number' ? `${panelHeight}px` : panelHeight,
      }"
    >
      <div
        v-for="member in staffStore.staffList"
        :key="member.name"
        class="staff-row"
        @click="onSelectStaff(member.id)"
      >
        <div class="staff-left">
          <div class="avatar">
            {{ member.name?.charAt(0).toUpperCase() }}
          </div>
          <div class="staff-info">
            <p class="staff-name">
              {{ member.name }}
            </p>
            <p class="staff-email">
              {{ member?.email }}
            </p>
          </div>
        </div>

        <div class="staff-role desktop-only">
          {{ member.roleName }}
        </div>

        <div class="staff-group desktop-only">
          <span v-for="(store, index) in member.staffStores" :key="store.id">
            <template v-if="index === 0">
              {{ store.store?.name || "N/A" }}
            </template>
            <template v-else>
              &nbsp;/&nbsp;{{ store.store?.name || "N/A" }}
            </template>
          </span>
        </div>

        <div class="edit-icon desktop-only">
          <EditPencil />
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="modal.isOpen && modal.type === 'staff-info'"
    :width="modalWidth"
    height="auto"
    @close="closeModal"
  >
    <StaffInfo
      v-if="selectedStaff"
      :item="selectedStaff"
      :mode="modal.mode"
      @close="closeModal"
    />
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import EditPencil from "~/components/reuse/icons/EditPencil.vue";
import Modal from "~/components/reuse/ui/Modal.vue";
import { useStaff } from "~/stores/setting/staff/useStaff";
import StaffInfo from "./StaffInfo.vue";
import Button from "~/components/reuse/ui/Button.vue";
import { useStoreLocation } from "../../../../stores/storeLocation/useStoreLocation";
import { useRole } from "~/stores/setting/staff/useRole";

const staffStore = useStaff();
const roleStore = useRole();
const locationStore = useStoreLocation();

const panelRefHeight = ref(null);
const windowWidth = ref(0);
const panelHeight = ref("auto");
const editing = ref(null);
const selectedStaff = ref({ name: "", role: "", group: "", email: "" });
const modal = ref({
  isOpen: false,
  type: "",
});

const onSelectStaff = (id) => {
  if (id) {
    selectedStaff.value = staffStore.staffList.find((staff) => staff.id === id);
  } else {
    selectedStaff.value = {
      name: "",
      role: "",
      group: "",
      email: "",
    };
  }
  modal.value = {
    isOpen: true,
    type: "staff-info",
    mode: id ? "edit" : "create",
  };
};

const updatePanelSize = () => {
  windowWidth.value = window.innerWidth;
  const totalHeight = panelRefHeight.value.offsetHeight;
  panelHeight.value = `${totalHeight - 72}px`;
};

onMounted(async () => {
  await nextTick();
  updatePanelSize();

  await staffStore.fetchStaffList();
  await roleStore.fetchRoles();
  await locationStore.fetchStoreList();

  window.addEventListener("resize", updatePanelSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updatePanelSize);
});

watch(
  () => modal.value.isOpen,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        updatePanelSize();
        window.addEventListener("resize", updatePanelSize);
      });
    } else {
      window.removeEventListener("resize", updatePanelSize);
    }
  }
);

const modalWidth = computed(() => {
  if (windowWidth.value > 1200) {
    return "720px";
  } else if (windowWidth.value < 900) {
    return `${windowWidth.value - 50}px`;
  }
});

const closeModal = () => {
  modal.value.isOpen = false;
  editing.value = null;
};
</script>

<style scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0;
}

.staff-list {
  overflow-y: auto;
  padding: 2rem 2rem 5rem;
  background: #ffffff;
  margin: 22px;
  border-radius: 12px;
  border: 0.5px solid #dedede;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.staff-list::-webkit-scrollbar {
  display: none;
}

.staff-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.staff-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #dedede;
  cursor: pointer;
}
@media screen and (max-width: 900px) {
  .staff-row {
    align-items: flex-start;
    flex-direction: column;
  }
}

.staff-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}
@media screen and (max-width: 900px) {
  .staff-left {
    align-items: flex-start;
  }
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #dce1de;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--black-2);
}
@media screen and (max-width: 900px) {
  .avatar {
    margin-right: 12px;
  }
}

.staff-info {
  display: flex;
  flex-direction: column;
}

.staff-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--black-1);
  margin: 0;
}

.staff-email {
  font-size: 0.875rem;
  color: #838383;
  margin: 0;
}

.staff-role {
  flex: 0.5;
  color: var(--black-2);
  font-size: 0.9rem;
  text-transform: capitalize;
}

.staff-group {
  flex: 0.5;
  display: flex;
  font-size: 0.9rem;
  color: var(--black-2);
}

.staff-group p {
  margin-right: 12px;
}

.edit-icon {
  display: block;
  opacity: 0;
  cursor: pointer;
}

.staff-row:hover .edit-icon {
  opacity: 1;
}

.staff-extra-mobile {
  display: none;
  flex-direction: column;
  font-size: 0.85rem;
  margin-top: 4px;
}

.staff-role,
.staff-group {
  flex: 0.5;
  font-size: 0.9rem;
  color: var(--black-1);
}

@media (max-width: 900px) {
  .desktop-only {
    display: none;
  }

  .staff-extra-mobile {
    display: flex;
  }
}
</style>
