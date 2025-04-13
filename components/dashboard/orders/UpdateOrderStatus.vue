<template>
  <h3 class="modal-title">Order Status</h3>
  <div class="modal-content">
    <div
      v-for="(option, index) in options"
      :key="index"
      @click="selectOption(option)"
      :class="{ selected: selectedOption === option }"
      class="option"
    >
      <component :is="option.icon" />
      {{ option.label }}
    </div>
  </div>
</template>

<script>
import NavSvgIcon from "../panels/NavSvgIcon.vue";
import EditPencil from "~/components/reuse/icons/EditPencil.vue";
import PlusIcon from "~/components/reuse/icons/PlusIcon.vue";
import Trash from "~/components/reuse/icons/Trash.vue";

export default {
  components: {
    NavSvgIcon,
    EditPencil,
    PlusIcon,
    Trash,
  },
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      options: [
        { icon: "EditPencil", label: "Deliver" },
        { icon: "PlusIcon", label: "Processing" },
        { icon: "Trash", label: "Dispatched" },
      ],
      selectedOption: null,
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.$emit("update-status", option);
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.option {
  display: flex;
  align-items: center;
  color: var(--black-1);
  font-size: var(--font-size-small);
  padding: 10px;
  cursor: pointer;
  margin: 8px 14px;
  border-radius: 8px;
}

.option:hover {
  background-color: var(--primary-hover-bg-color-1);
}

.selected {
  background-color: var(--primary-btn-color);
  color: var(--white-1);
  border-color: var(--black-1);
}

.selected:hover {
  background-color: var(--primary-btn-color);
}
</style>
