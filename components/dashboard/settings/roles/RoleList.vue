<template>
  <div ref="panelRefHeight" style="height: 100%">
    <div class="header-section">
      <h3 class="header3">Role List</h3>
      <Button
        @click="onSelectRole()"
        :applyShadow="true"
        :style="{ height: '40px' }"
        variant="primary"
        >Create</Button
      >
    </div>

    <div
      class="role-list"
      :style="{
        height:
          typeof panelHeight === 'number' ? `${panelHeight}px` : panelHeight,
      }"
    >
      <div
        v-for="role in roleStore.roleList"
        :key="role.id"
        class="role-row"
        @click="onSelectRole(role.id)"
      >
        <div class="role-info">
          <p class="role-name">{{ role.name }}</p>
          <p class="role-description">
            {{ role?.summary || "No description" }}
          </p>
        </div>

        <div v-if="role.staffStores?.length" class="role-stores">
          <span>
            {{
              role.staffStores
                .map((ss) => ss.name)
                .filter(Boolean)
                .join(" / ")
            }}
          </span>
        </div>
        <div v-else class="role-stores">
          <span></span>
        </div>

        <div class="role-staff-count desktop-only">
          {{ role.staffs?.length || 0 }} staff
        </div>

        <div class="edit-icon desktop-only">
          <EditPencil />
        </div>
      </div>
    </div>

    <Modal
      v-if="modal.isOpen && modal.type === 'role-info'"
      :width="modalWidth"
      :height="modalHeight"
      @close="closeModal"
    >
      <RoleInfo
        v-if="selectedRole"
        :item="selectedRole"
        :mode="modal.mode"
        @close="closeModal"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRole } from "~/stores/setting/staff/useRole";
import Modal from "~/components/reuse/ui/Modal.vue";
import Button from "~/components/reuse/ui/Button.vue";
import EditPencil from "~/components/reuse/icons/EditPencil.vue";
import RoleInfo from "./RoleInfo.vue";
import { useWindowSize } from "~/composables/useWindowSize";

const roleStore = useRole();
const { width } = useWindowSize();

const modalHeight = computed(() => {
  return width.value <= 768 ? "82vh" : "auto"; 
});

const panelRefHeight = ref(null);
const windowWidth = ref(0);
const panelHeight = ref("auto");
const selectedRole = ref({});
const modal = ref({
  isOpen: false,
  type: "",
  mode: "create",
});

const onSelectRole = (id) => {
  if (id) {
    selectedRole.value = roleStore.roleList.find((r) => r.id === id);
    modal.value = { isOpen: true, type: "role-info", mode: "edit" };
  } else {
    selectedRole.value = { name: "", summary: "" };
    modal.value = { isOpen: true, type: "role-info", mode: "create" };
  }
};

const updatePanelSize = () => {
  windowWidth.value = window.innerWidth;
  const totalHeight = panelRefHeight.value?.offsetHeight || 0;
  panelHeight.value = `${totalHeight - 72}px`;
};

onMounted(async () => {
  await nextTick();
  updatePanelSize();
  await roleStore.fetchRoles();
  window.addEventListener("resize", updatePanelSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updatePanelSize);
});

watch(
  () => modal.value.isOpen,
  (isOpen) => {
    if (isOpen) {
      nextTick(updatePanelSize);
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
};
</script>

<style scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0;
}

.role-list {
  overflow-y: auto;
  padding: 2rem 2rem 5rem;
  background: #ffffff;
  margin: 22px;
  border-radius: 12px;
  border: 0.5px solid #dedede;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.role-list::-webkit-scrollbar {
  display: none;
}

.role-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #dedede;
  cursor: pointer;
}

.role-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.role-name {
  font-size: 1rem;
  font-weight: 500;
  color: var(--black-1);
}

.role-description {
  font-size: 0.875rem;
  color: #838383;
}

.role-stores {
  flex: 1;
  color: var(--black-2);
  font-size: 0.875rem;
}

.role-staff-count {
  flex: 0.3;
  color: var(--black-2);
  font-size: 0.875rem;
}

.edit-icon {
  display: block;
  opacity: 0;
  cursor: pointer;
}

.role-row:hover .edit-icon {
  opacity: 1;
}

@media screen and (max-width: 900px) {
  .desktop-only {
    display: none;
  }

  .role-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
