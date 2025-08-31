<template>
  <div class="modal-content store-tables">
    <h4 class="form-section-header">Manage Tables</h4>
    <p class="label-description" style="margin-bottom: 18px">
      Set up your restaurant’s tables and floors here.
    </p>

    <Floors />

    <Tables />
  </div>
</template>

<script setup>
import Floors from "../tables/Floors.vue";
import Tables from "../tables/Tables.vue";
</script>

<style scoped>
.store-tables {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--white);
  height: 540px;
  overflow-y: scroll;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--black-1);
}
</style>
