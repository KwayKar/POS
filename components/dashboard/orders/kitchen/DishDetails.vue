<template>
  <div class="flex flex-col">
    <div class="flex-1 overflow-y-auto">
      <h2 class="text-lg font-bold mb-4">Dish Details</h2>
      <div v-if="dish">
        <p v-if="dish.name" class="mb-2">
          <span class="font-semibold">Dish Name:</span> {{ dish.name }}
        </p>
        <p v-if="dish.quantity" class="mb-2">
          <span class="font-semibold">Quantity:</span> {{ dish.quantity }}
        </p>
        <p v-if="dish.description" class="mb-4">
          <span class="font-semibold">Description:</span> {{ dish.description }}
        </p>
      </div>
      <div v-else>
        <p>No dish selected.</p>
      </div>
    </div>

    <!-- Button Section -->
    <div
      class="p-4 border-t border-gray-300 fixed bottom-0 right-0 w-full lg:w-[400px]"
    >
      <div class="flex justify-end">
        <button
          class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          @click="takeOutOrder"
        >
          Take Out Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DishDetails",
  props: {
    dish: {
      type: Object,
      required: false,
    },
  },
  methods: {
    takeOutOrder() {
      if (this.dish) {
        this.$emit("update-status", {
          id: this.dish.id,
          status: "ready",
          chef: this.currentStaff.name,
        });
      }
    },
  },
  computed: {
    ...mapGetters("company", ["currentStaff"]),
  },
};
</script>

<style scoped>
.flex-1 {
  margin-bottom: 4rem;
}
</style>
