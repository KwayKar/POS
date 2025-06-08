<template>
  <div class="product-info-layout flex flex-col h-full">
    <div class="header-section">
      <h2 class="header2">Item Information</h2>
    </div>
    <div class="panel-section">
      <!-- Left Panel - Image and Title -->
      <div class="left-panel">
        <div class="image-container">
          <NuxtImg
            v-if="selectedItem?.image"
            :src="selectedItem.image"
            alt="Item Image"
            width="100%"
            class="item-image"
            placeholder="blur"
          />
          <img
            v-else
            src="https://www.datocms-assets.com/60253/1739877561-kiteslogo2png.png?dpr=2&fit=fill&fm=webp&h=193&w=343"
            alt="Placeholder"
            class="placeholder-image"
          />

          <div class="edit-button">
            <EditPencil2 />
          </div>
        </div>
      </div>

      <!-- Right Panel  Item Info -->
      <div class="right-panel">
        <div class="form-group">
          <label for="title" class="form-label">Title</label>
          <Input
            type="text"
            v-model="selectedItem.title"
            placeholder="Enter Title"
            :class="['form-input', errors.title ? 'input-error' : '']"
            id="title"
          />
        </div>

        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <Textarea
            v-model="selectedItem.description"
            placeholder="Enter Description"
            :rows="3"
          />
        </div>

        <div class="form-group flex-[2]">
          <div class="flex items-center justify-between mb-1">
            <label for="type" class="form-label">Type</label>
          </div>
          <Select v-model="selectedItem.type" :options="typeOptions" />
        </div>

        <div v-if="selectedItem.type === 'addon'" class="flex gap-4">
          <div class="form-group flex-1">
            <label for="price" class="form-label">Price</label>
            <Input
              type="number"
              v-model="selectedItem.price"
              placeholder="Enter Price"
              :class="['form-input', errors.price ? 'input-error' : '']"
              id="price"
            />
          </div>

          <div class="form-group flex-1">
            <label class="form-label">Max Limit</label>
            <Input
              type="number"
              v-model="selectedItem.maxLimit"
              placeholder="Enter Max Limit"
              class="form-input"
            />
          </div>
        </div>

        <!-- Show Sugar Level Options -->
        <!-- <div v-if="selectedItem.type === 'sugarLevel'" class="form-group">
          <label class="form-label">Sugar Level Options</label>

          <div
            v-for="(option, index) in selectedItem.sugarOptions"
            :key="index"
            class="flex gap-4 mb-3"
          >
            <div class="flex-1">
              <Input
                v-model="option.label"
                placeholder="Sugar Level"
                class="form-input"
              />
            </div>

            <button
              type="button"
              class="remove-btn text-red-500 font-bold"
              @click="openModal('delete', index)"
            >
              ✕
            </button>
          </div>

          <Button
            type="button"
            @click="addSugarOption"
            style="
              font-size: 0.9rem;
              height: 34px;
              border: 1px solid var(--black-1);
            "
          >
            Add
          </Button>
        </div>  -->
      </div>
    </div>

    <div class="bottom-panel">
      <Button
        @click="deleteItem"
        v-if="mode === 'edit'"
        variant="danger"
        style="
          border: 1px solid var(--red-1);
          background: var(--red-1);
          color: var(--white-1);
          height: 40px;
        "
      >
        Delete
      </Button>

      <Button
        @click="submitItem"
        class="edit-btn"
        :applyShadow="'true'"
        style="
          border: 1px solid var(--black-1);
          background: var(--primary-text-color-1);
          color: var(--white-1);
          height: 40px;
          margin-left: auto;
        "
      >
        {{ mode === "edit" ? "Update" : "Create" }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import EditPencil2 from "~/components/reuse/icons/EditPencil2.vue";
import Button from "~/components/reuse/ui/Button.vue";
import Input from "~/components/reuse/ui/Input.vue";
import Select from "~/components/reuse/ui/Select.vue";
import Textarea from "~/components/reuse/ui/Textarea.vue";
import { useProductCustomization } from "~/stores/product/useProductCustomization";
import { generateId } from "~/utils/generateId";

const options = useProductCustomization();
const typeOptions = [
  { label: "Addon", value: "addon" },
  { label: "Free Choices", value: "choices" },
  { label: "Removal", value: "removal" },
];
const selectedItem = ref({
  image: "",
  title: "",
  description: "",
  price: undefined,
  type: "",
  maxLimit: 1,
});

const props = defineProps({
  mode: {
    type: String,
    default: "create",
  },
});
const emit = defineEmits(["close"]);

const errors = reactive({});

const submitItem = async () => {
  const payload = {
    id: generateId(),
    image: selectedItem.value.image,
    title: selectedItem.value.title,
    description: selectedItem.value.description,
    price: selectedItem.value.price,
    maxLimit: selectedItem.value.maxLimit,
    type: selectedItem.value.type,
  };

  if (props.mode === "create") {
    await options.addCustomization(payload);
  } else {
    const id = selectedItem.value.id;
    await options.updateCustomization(id, payload);
  }
  emit("close");
};

const deleteItem = async () => {
  await options.deleteCustomization(selectedItem.value.id);
  emit("close");
};

onMounted(() => {
  if (props.mode === "create") {
    selectedItem.value = selectedItem;
  } else {
    selectedItem.value = { ...options.selectedItem };
  }
});
</script>

<style scoped>
.header-section {
  margin: 20px 24px;
}

.panel-section {
  display: flex;
  flex-direction: row;
  padding-left: 12px;
  padding-right: 12px;
  gap: 1rem;
  flex-grow: 1;
}
@media screen and (max-width: 850px) {
  .panel-section {
    overflow-y: scroll;
    flex-direction: column;
    height: calc(var(--max-modal-height-mobile) - 145px);
  }
}

.product-info-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--primary-bg-color-1);
  border-radius: 16px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
}

.image-container {
  position: relative;
  width: 100%;
  min-height: 200px;
}

.image-container > img {
  max-height: 700px;
  object-fit: contain;
  border-radius: 10px;
}
@media screen and (max-width: 850px) {
  .image-container > img {
    max-height: 300px;
  }
}

.item-image {
  width: 100%;
  height: auto;
}

.edit-btn {
  transition: all 0.3s ease !important;
}

.edit-btn:hover {
  background: var(--white-1) !important;
  color: var(--black-1) !important;
}

.right-panel {
  width: 100%;
  flex: 2;
  overflow-y: auto;
  height: 600px;
  max-height: 700px;
  padding: 0 1rem 1rem;
  border-radius: 8px;
}

@media screen and (max-width: 850px) {
  .right-panel {
    overflow-y: visible;
    height: auto;
    max-height: 100vh;
    margin-bottom: 30px;
  }
  .right-panel > :last-child {
    padding: 0 0 50px;
  }
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a4a4a;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
}

.input-error {
  border-color: var(--red-1);
}

.bottom-panel {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid var(--black-1);
  border-radius: 0 0 8px 8px;
  background: var(--primary-bg-color-1);
}
@media screen and (max-width: 850px) {
  .bottom-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
  }
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  padding: 0.625rem;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
}

.delete-icon {
  fill: var(--white-1);
  width: 16px;
  height: 16px;
}

.edit-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  width: 50px;
  height: 50px;
  border: 1px solid var(--gray-1);
  background-color: var(--white-1);
  color: var(--white-1);
  padding: 0.75rem;
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  fill: transparent;
  stroke: #777777;
  transition: all 0.2s ease-in-out;
}

.edit-button:hover {
  fill: var(--black-2);
  stroke: #ffffff;
  background-color: var(--black-2);
}
</style>
