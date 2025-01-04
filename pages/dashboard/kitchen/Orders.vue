<template>
  <DashboardLayout>
    <NavPanel
      class="fixed top-0 left-0 lg:left-[100px] w-full lg:w-[calc(100%-100px)] h-16 bg-white shadow"
      style="z-index: 9999"
    />

    <div
      class="flex-shrink-0 overflow-y-auto"
      :style="{ width: 'calc(100% - 400px)' }"
    >
      <div class="w-full">
        <DishList
          :dishes="filteredDishes"
          @select-dish="selectDish"
          @filter-dish="filterByDishStatus"
        />
      </div>

      <div
        class="fixed top-16 right-0 w-full lg:w-[400px] h-[calc(100vh-16px)] bg-gray-50 border-l border-gray-300 p-4 overflow-y-auto"
      >
        <DishDetails :dish="selectedDish" @update-status="updateDishStatus" />
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import NavPanel from "~/components/dashboard/panels/NavPanel.vue";
import { mapGetters } from "vuex";
import DishList from "~/components/dashboard/orders/kitchen/DishList.vue";
import DishDetails from "~/components/dashboard/orders/kitchen/DishDetails.vue";

export default {
  components: {
    DashboardLayout,
    NavPanel,
    DishList,
    DishDetails,
  },
  data() {
    return {
      selectedDish: null,
      filterStatus: "",
      dishes: [
        {
          id: 1,
          name: "Spaghetti Bolognese",
          quantity: 2,
          comments: "Extra cheese, no mushrooms",
          chef: "Chef John",
          status: "processing",
          description: "No Spicy"
        },
        {
          id: 2,
          name: "Caesar Salad",
          quantity: 1,
          comments: "Dressing on the side",
          chef: "Chef Sarah",
          status: "completed",
          description: "More Spicy"
        },
      ],
    };
  },
  methods: {
    selectDish(dish) {
      this.selectedDish = dish;
    },
    filterByDishStatus(status) {
      this.filterStatus = status;
    },
    updateDishStatus({ id, status, chef }) {
      const dish = this.dishes.find((dish) => dish.id === id);
      if (dish) {
        dish.status = status;
        dish.chef = chef;
      }
      this.selectedDish = null; 
    },
  },
  computed: {
    filteredDishes() {
      if (this.filterStatus == "") return this.dishes;
      return this.dishes.filter((dish) => dish.status == this.filterStatus);
    },
    ...mapGetters("company", ["currentStaff"]),
  },
};
</script>
