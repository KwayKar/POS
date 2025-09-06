export const useAdmin = defineStore("admin", {
  state: () => ({
    businessType: "restaurant",
    userId: "9c9ecff6-3033-4368-a7b0-156aecc83d1e",
    storeId: '11325a15-2f9c-4d77-a2cf-7655f56a6661',
    storeName: '',
    // 'a7834682-f2b7-4eda-8c01-95716f00f656',
    estId: '4daea73c-2e57-49d5-a5ca-0da23bb43f05',
    menuId: '9b2ce284-1dbf-4b51-93a4-c75ef7e72a63',
    roles: [],
    stores: []
  }),
  actions: {
    setStaffData(staffData) {
      this.userId = staffData.id;
      this.estId = staffData.establishmentId;

      if (staffData.stores && staffData.stores.length > 0) {
        // Pick first store as default
        const firstStore = staffData.stores[0];
        this.storeId = firstStore.id;
        this.menuId = firstStore.menus?.[0]?.id || "";
      }

      this.stores = staffData.stores || [];
      this.roles = staffData.roles || [];
    },
    setActiveStore(store) {
      this.storedId = store.id;
      this.storeName = store.name;
    },
    clearStaffData() {
      this.userId = "";
      this.estId = "";
      this.storeId = "";
      this.menuId = "";
      this.stores = [];
      this.roles = [];
    },
  },
});
