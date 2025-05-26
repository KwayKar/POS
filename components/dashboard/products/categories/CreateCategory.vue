<template>
  <h3 class="modal-title">
    Create Category
  </h3>

  <div class="modal-content category-form">
    <div class="form-group flex-1">
      <label for="title" class="form-label">Title</label>
      <Input
        v-model="categoryName"
        type="text"
        placeholder="Add a new category"
        class="w-full p-2 border rounded"
      />
    </div>

    <div class="form-group flex-1">
      <label for="title" class="form-label"
        >Upload Image
        <span>(Optional)</span>
      </label>
      <FileUploads
        v-model:files="uploadedImages"
        :multiple="true"
        :min-images="1"
        :max-images="1"
        @error="handleUploadError"
      />
    </div>

    <p v-if="formError" class="text-red-500 mt-2">{{ formError }}</p>

    <div class="flex justify-end my-2">
      <SubmitButton
        @click="handleSubmit"
        :apply-shadow="true"
      >
        {{ mode === "edit" ? "Update" : "Create" }}
      </SubmitButton>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import FileUploads from "~/components/reuse/ui/FileUploads.vue";
import Input from "~/components/reuse/ui/Input.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { useCategory } from "~/stores/product/category/useCategory";

const props = defineProps({
  inheritAttrs: false,
  mode: {
    type: String,
    default: "create", // or "edit"
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
});

const { createCategory, updateCategory, getSelectedCategory } = useCategory();

const categoryName = ref("");
const uploadedImages = ref([]); 
const formError = ref("");
const emit = defineEmits(["close"]);

const handleSubmit = () => {
  if (categoryName.value.trim() === "") {
    formError.value = 'Category title is empty'
    return;
  }
  const category = {
    id: props.mode === "edit" ? getSelectedCategory.id : Date.now(),
    name: categoryName.value,
    image: uploadedImages.value 
  };
  
  if (props.mode === "edit") {
    updateCategory(getSelectedCategory.id, category)
  } else {
    createCategory(category);
  }

  categoryName.value = "";
  emit("close");
}

const handleUploadError = (message) => {
  formError.value = message;
  setTimeout(() => {
    formError.value = "";
  }, 5000);
};

onMounted(() => {
  if (props.mode === 'edit' && getSelectedCategory) {
    categoryName.value = getSelectedCategory.name || '';
    if (getSelectedCategory.image) {
      uploadedImages.value = [getSelectedCategory.image];
    }
  }
});

watch(
  () => props.initialData,
  (val) => {
    if (props.mode === "edit" && val?.name) {
      categoryName.value = val.name;
    }
  },
  { immediate: true }
);

</script>

<style scoped>
.category-form {
  width: 100%;
  margin-bottom: 20px;
}
.upload-section {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--black-1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s;
  cursor: pointer;
}
.upload-box {
  min-width: 24px;
  min-height: 24px;
}

.preview-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 80px;
  object-fit: contain;
}
</style>
