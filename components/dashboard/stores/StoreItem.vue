<template>
  <n-card class="store-card">
    <div class="store-info">
      <div>
        <div class="store-name">{{ store.name }}</div>
        <div class="store-location">{{ store.location }}</div>
      </div>
      
      <div class="store-actions">
        <n-button quaternary circle @click="$emit('edit', store)">
          Edit
        </n-button>
        
        <n-button quaternary circle @click="$emit('delete', store.id)">
          Delete
        </n-button>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({ store: Object });
</script>

<style scoped>
.store-card {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 calc(33.333% - 16px); 
  min-width: 250px;
  box-shadow: var(--box-shadow-1);
}
@media screen and (max-width: 900px) {
  .store-card {
    flex: 1 1 100%; 
  }
}

.store-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.store-name {
  font-size: 18px;
  font-weight: bold;
}

.store-location {
  font-size: 14px;
  color: gray;
}

.store-actions {
  display: flex;
  gap: 8px;
}

@media screen and (max-width: 900px) {
  .store-actions {
    flex-direction: column;
  }
}
</style>