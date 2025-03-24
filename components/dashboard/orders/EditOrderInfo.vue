<template>
  <div class="p-4">
    <FormTitle v-if="mode === 'edit'">Edit Order</FormTitle>
    <form @submit.prevent="submitForm">
      <div class="my-6">
        <label class="block text-m mb-1 pb-2">Order ID</label>
        <Input
          v-model="form.id"
          type="text"
          class="border rounded w-full p-2"
        />
      </div>

      <div class="mb-6">
        <label class="block text-m mb-1 pb-2">Address</label>
        <Input
          v-model="form.address"
          type="text"
          class="border rounded w-full p-2"
          :placeholder="
            form.type === 'percentage'
              ? 'Enter percentage (1-100)'
              : 'Enter fixed amount'
          "
        />
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
          {{ errorMessage }}
        </p>
      </div>

      <div class="mb-6 pb-4">
        <label class="block text-m mb-1 pb-2 mb-1 pb-2">Expiry</label>
        <Input
          v-model="form.orderStatus"
          type="text"
          class="border rounded w-full p-2"
        />
      </div>

      <div class="flex justify-end space-x-2">
        <Button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 rounded"
          style="background: var(--white-1); color: var(--dark-gray-1)"
        >
          Cancel
        </Button>
        <Button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
          {{ mode === "edit" ? "Update" : "Create" }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script>
import FormTitle from "~/components/reuse/general/formTitle/FormTitle.vue";
import Button from "~/components/reuse/ui/Button.vue";
import Input from "~/components/reuse/ui/Input.vue";

export default {
  components: {
    FormTitle,
    Button,
    Input
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: { ...this.order },
      errorMessage: "",
    };
  },
  methods: {
    submitForm() {
      if (!this.errorMessage) {
        this.$emit("edit-order", { ...this.form });
      }
    },
  },
};
</script>
