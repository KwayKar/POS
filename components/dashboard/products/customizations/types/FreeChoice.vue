<template>
  <div class="rounded-md">
    <div class="choice-selector">
      <div
        v-for="(choice, index) in choices"
        :key="index"
        class="choice-box"
        @click="toggleChoice(choice)"
        :class="[
          selectedChoices.some((c) => c.label === choice.label)
            ? 'selected'
            : '',
        ]"
      >
        {{ choice.label }}
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
    default: 2,
  },
});

const emit = defineEmits(["update:selectedChoices"]);

const selectedChoices = ref([]);

const toggleChoice = (choice) => {
  const exists = selectedChoices.value.find((c) => c.label === choice.label);

  if (exists) {
    // If already selected, unselect it
    selectedChoices.value = selectedChoices.value.filter(
      (c) => c.label !== choice.label
    );
  } else {
    if (selectedChoices.value.length < props.maxChoice) {
      selectedChoices.value.push(choice);
    } else {
      // Optional: alert or warn if max reached
      console.warn(`You can select up to ${props.maxChoice} choices.`);
    }
  }

  emit("update:selectedChoices", selectedChoices.value);
};
</script>

<style scoped>
.choice-selector {
  display: flex;
  flex-wrap: wrap;
}

.choice-box {
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 24px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  margin-right: 12px;
  transition: background 0.2s;
}

.choice-box + .choice-box {
  margin-left: -1px; /* Overlap borders */
}

.choice-box {
  background-color: var(--white-1);
}

.choice-box.selected {
  background-color: var(--green-2);
  color: var(--white-1);
  border-color: var(--green-2);
}
</style>
