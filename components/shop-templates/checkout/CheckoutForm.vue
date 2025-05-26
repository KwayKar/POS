<template>
  <div :style="formContainerStyle">
    <h3 class="header3">Shop Info</h3>
    <form
      @submit.prevent="handleSubmit"
      class="form-grid"
      ref="fieldsContainer"
    >
      <div
        v-for="(field, index) in fields"
        :key="index"
        :class="[
          field.isTwoColumn ? 'half-width' : 'full-width',
          enableOverflow && index === fields.length - 1 ? 'last-form-item' : '',
        ]"
        style="display: flex"
      >
        <div style="flex: 1">
          <label class="form-label">{{ field.label }}</label>
          <Input
            v-if="field.type === 'input'"
            v-model="field.value"
            :type="field.inputType || 'text'"
            :placeholder="field.placeholder"
            :error="field.error"
          />

          <p
            v-if="field.description"
            class="form-description"
            style="line-height: 1.4"
          >
            {{ field.description }}
          </p>
        </div>

        <div v-if="field.type === 'switch'" class="switch-btn">
          <Toggle v-model="field.value" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import Input from "~/components/reuse/ui/Input.vue";
import Toggle from "~/components/reuse/ui/Toggle.vue";

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  enableOverflow: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);
const fieldsContainer = ref(null);
const formHeight = ref("auto");

const handleSubmit = () => {
  const result = props.fields.reduce((acc, field) => {
    acc[field.label.toLowerCase()] = field.value;
    return acc;
  }, {});
  emit("submit", result);
};

const formContainerStyle = computed(() => {

  // :style="{ height: formHeight , overflowY: 'scroll'}"
  console.log(props.enableOverflow)
  if (props.enableOverflow) {
    return {
      padding: '2rem',
      height: formHeight.value,
      overflowY: 'scroll',
    };
  }
});

// watch(
//   () => props.fields, // This is the key change: watching the 'fields' prop
//   async () => {
//     await nextTick();
//     if (fieldsContainer.value) {
//       formHeight.value = fieldsContainer.value.offsetHeight + "px";
//     }
//   },
//   { deep: true } // Watch for changes within the 'fields' array if needed
// );

onMounted(async () => {
  await nextTick();
  if (fieldsContainer.value) {
    // 100 last item div gap
    formHeight.value = fieldsContainer.value.offsetHeight - 100 + "px";
  }
});
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 15px;
}
@media (min-width: 640px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.last-form-item {
  padding-bottom: 60px;
}

.full-width {
  grid-column: span 2;
}

.half-width {
  grid-column: span 1;
}
@media screen and (max-width: 768px) {
  .half-width {
    grid-column: span 2;
  }
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

.switch-btn {
  display: flex;
  align-items: center;
  margin-top: 4px;
}
</style>
