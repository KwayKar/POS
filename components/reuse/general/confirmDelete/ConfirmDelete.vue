<!-- <template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-3">Confirm Deletion</h2>
    <p>
      Are you sure you want to delete <strong>{{ itemName }}</strong
      >?
    </p>
    <div class="flex justify-end mt-4 space-x-2">
      <button @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 rounded">
        Cancel
      </button>
      <button
        @click="$emit('confirm')"
        class="delete-button"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  itemName: {
    type: String,
    default: "this item",
  },
});
</script>

<style scoped>
.delete-button {
  padding: 8px 16px;
  background-color: var(--red-2);
  color: var(--white-1);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
</style> -->
