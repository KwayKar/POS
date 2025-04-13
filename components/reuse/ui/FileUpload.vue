<template>
    <div class="file-upload">
      <div
        class="drop-zone"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        :class="{ 'drag-over': isDragging }"
      >
        <!-- <p v-if="!modelValue">Drag & Drop files here or</p> -->
        <button class="upload-btn" @click="triggerFileInput">Browse Files</button>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileSelect"
          accept="image/*"
          hidden
        />
      </div>
  
      <div v-if="modelValue" class="file-preview">
        <img :src="modelValue" class="preview" />
        <button class="remove-btn" @click="removeFile">Remove</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    modelValue: String, // for v-model 
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  const fileInput = ref(null);
  const isDragging = ref(false);
  
  const triggerFileInput = () => {
    fileInput.value.click();
  };
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const fileUrl = URL.createObjectURL(file);
      emit("update:modelValue", fileUrl);
    }
  };
  
  const handleDrop = (event) => {
    isDragging.value = false;
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const fileUrl = URL.createObjectURL(file);
      emit("update:modelValue", fileUrl);
    }
  };
  
  const removeFile = () => {
    emit("update:modelValue", ""); // Reset the image
  };
  </script>
  
  <style scoped>
  .file-upload {
    width: 100%;
    max-width: 400px;
  }
  
  .drop-zone {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    transition: 0.3s;
  }
  
  .drop-zone.drag-over {
    border-color: #85d488;
    background: #f0f8ff;
  }
  
  .upload-btn {
    background: var(--primary-btn-color);
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .file-preview {
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .preview {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .remove-btn {
    background: red;
    color: white;
    border: none;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  