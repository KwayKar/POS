<template>
  <div class="tabs-container">
    <div class="tabs-header">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="['tab-button', { active: activeTab === tab }]"
      >
        {{ tab }}
      </button>
    </div>

    <div class="tabs-content">
      <slot :name="activeTab" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    defaultTab: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      activeTab: this.defaultTab || this.tabs[0],
    };
  },
};
</script>

<style scoped>
.tabs-container {
  width: auto;
}

.tabs-header {
  width: auto;
  flex: 1;
  display: inline-block;
  padding: 6px;
  margin-bottom: 16px;
  background: #e5e7de;
  border-radius: 10px; 
  border: 1px solid #c7c7c7;
}

.tab-button {
  font-size: 0.95rem;
  font-weight: 600;
  padding: 5px 20px;
  border-radius: 8px;
  background-color: transparent;
  margin-right: 8px;
  color: var(--black-2);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
}

.tab-button.active {
  background-color: var(--white-1);
  color: var(--black-2);
}

.tabs-content {
  padding: 10px 0;
}
</style>
