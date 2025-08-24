<template>
  <div class="menu-container">
    <h3 class="modal-title">Create Menu</h3>

    <div class="modal-content menu-form">
      <div class="form-group flex-1">
        <label for="title" class="form-label">Title</label>
        <Input
          v-model="menuName"
          type="text"
          placeholder="Menu Title"
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="form-group flex-1">
        <label for="title" class="form-label"
          >Upload Image
          <span>(Optional)</span>
        </label>
        <FileUploads
          v-model:files="uploadedImage"
          :multiple="true"
          :min-images="1"
          :max-images="1"
          @error="handleUploadError"
        />
      </div>

      <p v-if="formError" class="text-red-500 mt-2">{{ formError }}</p>

      <div class="footer">
        <SubmitButton @click="handleSubmit" :apply-shadow="true">
          {{ mode === "edit" ? "Update" : "Create" }}
        </SubmitButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import FileUploads from "~/components/reuse/ui/FileUploads.vue";
import Input from "~/components/reuse/ui/Input.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { useAdmin } from "~/stores/admin/useAdmin";
import { apiFetch } from "~/utils/apiFetch";

const props = defineProps({
  inheritAttrs: false,
});

const menuName = ref("");
const uploadedImage = ref([]);
const formError = ref("");

const emit = defineEmits(["close"]);
const config = useRuntimeConfig();
const adminStore = useAdmin();

const handleSubmit = async () => {
  if (menuName.value.trim() === "") {
    formError.value = "Menu title is empty";
    return;
  }

  const uploadedKey = await Promise.all(
    uploadedImage.value.map((file) => uploadFileToR2(file, "menus"))
  );

  const payload = {
    name: menuName.value,
    image: uploadedKey,
    storeId: adminStore.storeId,
  };

  try {
    const response = await apiFetch(`${config.public.apiBaseUrl}/menus`, {
      method: "POST",
      body: payload,
    });

    if (response?.id) {
      router.push(`/dashboard/menus/${response.id}`);
    }
  } catch (error) {
    formError.value = "Something went wrong.";
  }
};

const handleUploadError = (message) => {
  formError.value = message;
  setTimeout(() => {
    formError.value = "";
  }, 5000);
};

const uploadFileToR2 = async (
  file,
  folder = "4daea73c-2e57-49d5-a5ca-0da23bb43f05"
) => {
  const res = await apiFetch(`${config.public.apiBaseUrl}/upload-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      fileName: file.name,
      contentType: file.type,
      folder,
    },
  });
  
  const { url, key } = res;

  const uploadRes = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    const text = await uploadRes.text();
  }

  const publicUrl = `https://myanmar.311b4790103c5f01e1f28349e15bd533.r2.cloudflarestorage.com/${key}`;
  return { key, publicUrl };
};
</script>

<style scoped>
.menu-container {
  margin: 0 auto;
  box-sizing: border-box;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
}

.menu-form {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px 20px 0;
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

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}
</style>
