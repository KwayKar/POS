<template>
  <div class="modal-layout">
    <div>
      <h2 class="modal-heading">Confirm Delete?</h2>
    </div>
    <div class="p-4">
      <slot></slot>
    </div>
    <div class="btn-section p-4 flex justify-end space-x-2">
      <Button
        @click="$emit('remove-item')"
        background="var(--red-1)"
        color="var(--white-1)"
        :applyShadow="true"
      >
        Delete
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  components: {
    Button,
  },
};
</script>

<style scoped>
.modal-layout {
  background-color: var(--white-1);
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  padding: 20px 0 0;
}
.modal-heading {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: var(--black-2);
}
.btn-section {
}
.delete-button {
  padding: 8px 16px;
  background-color: var(--red-2);
  color: var(--white-1);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
</style>
