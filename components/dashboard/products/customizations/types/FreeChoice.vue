<template>
  <div class="rounded-md">
    <div class="choice-selector">
      <div
        v-for="(choice, index) in choices"
        :key="index"
        class="choice-box"
        @click="toggleChoice(choice)"
        :style="{ 
          width: choice?.image ? '170px' : undefined,
          borderRadius: choice?.image ? '12px' : '24px',
          textWrap: !item?.image ? 'nowrap' : 'wrap'
        }"
        :class="[
          selectedChoices.some((c) => c.id === choice.id)
            ? 'selected'
            : '',
        ]"
      >
        <div class="image" v-if="choice.image">
          <img :src="choice.image" alt="Choice Image" />
        </div>

        {{ choice.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  choices: {
    type: Array,
    required: true,
  },
  maxChoice: {
    type: Number,
    default: 1,
  },
  selectdValues: {
    type: Array,
    default: null,
  }
});

const emit = defineEmits(["updateValue"]);

const selectedChoices = ref([]);

onMounted(() => {
  if (props.selectdValues && props.selectdValues.length > 0) {
    selectedChoices.value = [...props.selectdValues];
  }
});

const toggleChoice = (choice) => {
  const exists = selectedChoices.value.find((c) => c.id === choice.id);

  if (exists) {
    selectedChoices.value = selectedChoices.value.filter(
      (c) => c.id !== choice.id
    );
  } else {
    if (props.maxChoice === 1) {
      selectedChoices.value = [choice];
    } else if (selectedChoices.value.length < props.maxChoice) {
      selectedChoices.value.push(choice);
    }
  }

  emit("updateValue", selectedChoices.value);
};

watch(
  () => props.selectdValues,
  (newVal) => {
    if (newVal?.length) {
      selectedChoices.value = [...newVal];
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.choice-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}

.choice-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 8px 16px;
  border: 1px solid #ccc;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  transition: background 0.2s;
  flex: 0 1 calc(33.333% - 16px);
}
@media screen and (max-width: 700px) {
  .choice-box {
    flex: 0 1 calc(50% - 10px);
    box-sizing: border-box;
  }
}

.choice-box + .choice-box {
  margin-left: -1px; /* Overlap borders */
}

.choice-box {
  background-color: var(--white-1);
}

.choice-box.selected {
  background-color: var(--primary-btn-color-3);
  border-color: var(--green-2);
}

.image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 12px;
}
</style>
