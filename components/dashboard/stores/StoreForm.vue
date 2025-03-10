<template>
  <div class="bg-white p-6 rounded-lg shadow-lg w-[500px]">
    <h2 class="text-xl font-semibold mb-4">
      {{ storeData.id ? "Edit Store" : "Add Store" }}
    </h2>

    <div class="mb-4">
      <label class="block text-gray-700">Store Name</label>
      <Input
        type="text"
        v-model="storeData.name"
        placeholder="Enter store name"
        :class="{
          'border-red-500': errors.name,
          'border-gray-300': !errors.name,
        }"
        class="w-full p-2 border rounded"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">
        {{ errors.name }}
      </p>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700">Address</label>
      <Input
        type="text"
        v-model="storeData.address"
        placeholder="Enter store address"
        :class="{
          'border-red-500': errors.address,
          'border-gray-300': !errors.address,
        }"
        class="w-full p-2 border rounded"
      />
      <p v-if="errors.address" class="text-red-500 text-sm mt-1">
        {{ errors.address }}
      </p>
    </div>

    <div class="flex justify-end space-x-2">
      <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded">
        Cancel
      </button>
      <button
        @click="submitForm"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from "vue";
import Input from "~/components/reuse/ui/Input.vue";

const emit = defineEmits(["save", "close"]);

const props = defineProps({
  store: Object,
  isOpen: Boolean,
});

const storeData = ref({ name: "", address: "" });
const errors = ref({ name: "", address: "" });

watch(
  () => props.store,
  (newVal) => {
    storeData.value = newVal ? { ...newVal } : { name: "", address: "" };
  },
  { immediate: true }
);

const validateForm = () => {
  errors.value.name = storeData.value.name ? "" : "Store name is required";
  errors.value.address = storeData.value.address ? "" : "Address is required";
  return !errors.value.name && !errors.value.address;
};

const submitForm = () => {
  if (validateForm()) {
    emit("save", storeData.value);
  }
};

const closeModal = () => {
  emit("close");
};
</script>
