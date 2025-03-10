<template>
    <DashboardLayout>
      <NavPanel class="fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16 bg-white shadow flex items-center justify-between px-4 lg:px-8">
      </NavPanel>
      
      <div class="store-container">
        <StoreList />
      </div>
    </DashboardLayout>
  </template>
  
  <script>

  import StoreList from "~/components/dashboard/stores/StoreList.vue";
  import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
  import DashboardLayout from "~/layouts/DashboardLayout.vue";
  import Button from "~/components/reuse/ui/Button.vue";
  
  export default {
    components: {
      StoreList,
      DashboardLayout,
      NavPanel,
      Button
    },
    
  };
  </script>
  

<style scoped>

.nav-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: var(--white-1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.create-btn {
  background-color: var(--primary-btn-color);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.store-container {
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-top: 14px; 
  width: 100%;
}

</style>