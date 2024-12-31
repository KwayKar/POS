<template>
  <nav class="w-[100px] flex flex-col items-center py-4 space-y-6">
    <button
      v-for="item in filteredNavigation"
      :key="item.title"
      class="text-white hover:bg-gray-700 p-3 rounded w-[80px]"
      :title="item.title"
    >
      <div class="flex flex-col items-center">
        <div class="w-[30px] h-[30px] flex items-center justify-center">
          <NavSvgIcon :icon="item.icon" />
        </div>
      </div>
      <span class="text-xs mt-1">{{ item.title }}</span>
    </button>
  </nav>
</template>

<script>
import NavSvgIcon from "./NavSvgIcon";

export default {
  components: { NavSvgIcon },
  data() {
    return {
      userRole: "waiter", 
      navigationItems: {
        manager: [
          { title: "Order", icon: "ShoppingCartOutlined", path: "/orders" },
          { title: "Customers", icon: "People", path: "/customers" },
          { title: "Orders", icon: "Receipt", path: "/all-orders" },
          { title: "Loyalty", icon: "Loyalty", path: "/loyalty" },
        ],
        waiter: [
          { title: "Order", icon: "ShoppingCartOutlined", path: "/orders" },
          { title: "Customers", icon: "People", path: "/customers" },
        ],
        cashier: [
          { title: "Orders", icon: "Receipt", path: "/all-orders" },
          { title: "Loyalty", icon: "Loyalty", path: "/loyalty" },
        ],
      },
    };
  },
  computed: {
    filteredNavigation() {
      return this.navigationItems[this.userRole] || [];
    },
  },
};
</script>

<style>
.icon-container {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container svg {
  fill: white;
}
</style>
