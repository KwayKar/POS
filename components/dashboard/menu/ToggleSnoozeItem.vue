<template>
  <div class="modal-layout">
    <div>
      <h2 class="modal-heading">{{ isSnoozed ? "Unsnooze Item?" : "Snooze Item?" }}</h2>
    </div>
    <div class="px-4 py-2">
      {{ isSnoozed
        ? "Item will be made available again on the menu."
        : "Item will be unavailable to order on the menu." }}
    </div>
    <div class="btn-section p-4 flex justify-end space-x-2">
      <Button
        @click="$emit('toggle-snooze')"
        :background="isSnoozed ? 'var(--primary-btn-color)' : 'var(--red-1)'"
        color="var(--white-1)"
        :applyShadow="true"
      >
        {{ isSnoozed ? "Unsnooze" : "Snooze" }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from '~/components/reuse/ui/Button.vue';


defineProps({
  isSnoozed: Boolean,
});

defineEmits(["toggle-snooze"]);
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
</style>
