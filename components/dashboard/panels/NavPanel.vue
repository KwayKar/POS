<template>
  <div class="flex items-center justify-between px-4">
    <div class="left-content">
      <h1 class="text-lg font-semibold">Dashboard</h1>
    </div>
    
    <div class="right-content">
      <slot></slot> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      panelType: "",
    };
  },
  watch: {
    $route(to, from) {
      this.setPanelType(to);
    },
  },
  mounted() {
    this.setPanelType(this.$route);
  },
  methods: {
    setPanelType(route) {
      if (this.$route.path.includes("dashboard/products")) {
        this.panelType = "products";
      } else if (this.$route.path.includes("dashboard/sales")) {
        this.panelType = "sales";
      } else if (this.$route.path.includes("dashboard/users")) {
        this.panelType = "users";
      }
    },
  },
};
</script>

<style scoped>
.create-btn {
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  margin-left: 10px;
}

.search-input {
  display: flex;
  align-items: center;
}

.search-input input {
  padding: 5px;
  margin-right: 10px;
}
</style>
