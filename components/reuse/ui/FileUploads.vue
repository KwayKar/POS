<template>
  <div class="upload-wrapper" @dragover.prevent @drop.prevent="handleDrop">
    <div :class="['preview-grid', { single: isSingleMode }]">
      <div v-for="(img, i) in previews" :key="i" class="preview-item">
        <button class="remove-btn" @click.stop="removeImage(i)">×</button>
        <img :src="img.url" alt="Preview" />
      </div>

      <div
        v-if="previews.length !== 0 && previews.length < props.maxImages"
        class="upload-plus"
        @click="triggerFileInput"
      >
        <div class="plus-icon">+</div>
      </div>
    </div>

    <!-- Show full upload area if no images -->
    <div v-if="!previews.length" class="upload-box" @click="triggerFileInput">
      <svg
        class="upload-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="38"
        viewBox="0 0 24 24"
        width="38"
      >
        <path
          d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5z"
        />
      </svg>
      <p>Click or drag to upload</p>
    </div>

    <input
      type="file"
      ref="fileInput"
      :multiple="multiple"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const emit = defineEmits(["update:files", "error"]);
const props = defineProps({
  files: Array,
  multiple: { type: Boolean, default: true },
  minImages: { type: Number, default: 1 },
  maxImages: { type: Number, default: 5 },
});

const fileInput = ref(null);
const previews = ref([]);
const files = ref([]);

// Determines if we're in single-image mode
const isSingleMode = computed(() => props.maxImages === 1);

function triggerFileInput() {
  fileInput.value?.click();
}

function processFiles(newFiles) {
  const allFiles = [...files.value, ...newFiles];

  const uniqueFiles = Array.from(
    new Map(allFiles.map((f) => [f.name, f])).values()
  );

  if (uniqueFiles.length > props.maxImages) {
    emit("error", `You can upload up to ${props.maxImages} image(s) only.`);
    return;
  }

  files.value = uniqueFiles;

  previews.value = files.value.map((file) => ({
    url: URL.createObjectURL(file),
    file,
  }));

  emit("update:files", files.value);
}

function handleFileChange(e) {
  const inputFiles = Array.from(e.target.files);
  if (!inputFiles.length) return;
  processFiles(inputFiles);
  e.target.value = "";
}

function handleDrop(e) {
  const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
    file.type.startsWith("image/")
  );
  if (!droppedFiles.length) return;
  processFiles(droppedFiles);
}

function removeImage(index) {
  files.value.splice(index, 1);
  previews.value.splice(index, 1);
  emit("update:files", files.value);
}

watch(
  () => props.files,
  (newVal) => {
    if (!newVal || !newVal.length) return;

    const mappedPreviews = newVal
      .map((file) => {
        if (file instanceof File) {
          return {
            url: URL.createObjectURL(file),
            file,
          };
        }

        if (typeof file === "string") {
          return {
            url: file,
            file: null,
          };
        }

        return null;
      })
      .filter(Boolean);

    previews.value = mappedPreviews;
    files.value = newVal.filter((f) => f instanceof File);
  },
  { immediate: true }
);
</script>

<style scoped>
.upload-wrapper {
  width: 100%;
}

.upload-box {
  border: 2px dashed var(--gray-2, #ccc);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  background: var(--primary-bg-color-1, #f8f8f8);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-box > p {
  color: var(--black-2);
  font-size: 15px;
}

.upload-icon {
  margin-bottom: 12px;
  fill: #888;
}

.preview-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}

.preview-grid.single {
  flex-direction: column;
  align-items: stretch;
}

.preview-item {
  position: relative;
  width: 100px;
  height: 100px;
}

.preview-grid.single .preview-item,
.preview-grid.single .upload-plus {
  width: 100%;
  height: auto;
}

.preview-grid.single img {
  max-height: 250px;
  width: 100%;
  object-fit: contain;
  min-height: 75px;
}

.preview-item img {
  width: auto;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid var(--black-3);
  overflow: hidden;
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #f44336;
  color: var(--white-1);
  border: none;
  border-radius: 50%;
  font-weight: bold;
  width: 25px;
  height: 25px;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-plus {
  width: 100px;
  height: 100px;
  border: 2px dashed var(--gray-2, #ccc);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.plus-icon {
  font-size: 28px;
  color: var(--gray-2, #888);
}
</style>
