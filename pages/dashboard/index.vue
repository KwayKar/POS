<template>
  <DashboardLayout>
    <p>
      <ItemList />
    </p>
  </DashboardLayout>
</template>

<script>
import ItemList from "~/components/dashboard/items/ItemList.vue";
import DashboardLayout from "~/layouts/DashboardLayout.vue";

export default {
  components: {
    DashboardLayout,
    ItemList,
  },
};
</script>
