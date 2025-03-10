<template>
  <div class="flex flex-col">
    <div class="flex-1 overflow-y-auto">
      <PanelTitle>Dish Details</PanelTitle>
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
        <Button
          class="w-full"
          @click="takeOutOrder"
        >
          Take Out Order
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PanelTitle from "../../reuse/PanelTitle.vue";
import Button from "~/components/reuse/ui/Button.vue";

export default {
  name: "DishDetails",
  components: {
    PanelTitle,
    Button
  },
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
