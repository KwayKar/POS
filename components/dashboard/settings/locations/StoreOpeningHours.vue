<template>
  <div>
    <div class="modal-content store-hours-form">
      <h4 class="section-title">Store Opening Hours</h4>
      <p class="label-description" :style="{ padding: '0 0 24px' }">
        If the store is closed, customers will not be able to place online
        orders.
      </p>

      <div class="form-grid">
        <div
          v-for="day in daysOfWeek"
          :key="day.value"
          class="form-group day-row"
        >
          <label class="form-label day-label">{{ day.label }}</label>

          <div class="closed-group">
            <Checkbox
              :id="`closed-${day.value}`"
              v-model="hours[day.value].closed"
              class="checkbox-item"
            >
              Closed
            </Checkbox>
          </div>

          <div class="time-range">
            <input
              type="time"
              v-model="hours[day.value].open"
              :disabled="hours[day.value].closed"
              class="time-input"
              :class="{ 'opacity-50': hours[day.value].closed }"
              required
            />
            <span class="to-text">to</span>
            <input
              type="time"
              v-model="hours[day.value].close"
              :disabled="hours[day.value].closed"
              class="time-input"
              :class="{ 'opacity-50': hours[day.value].closed }"
              required
            />
          </div>
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <div>
        <p v-if="formError" class="text-red-500 mt-2">{{ formError }}</p>
      </div>

      <div class="flex justify-end my-2">
        <SubmitButton
          @click="handleSubmit"
          :apply-shadow="true"
          :isProcessing="isSubmitting"
        >
          {{ "Update" }}
        </SubmitButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import Checkbox from "~/components/reuse/ui/Checkbox.vue";
import { useStoreLocation } from "../../../../stores/storeLocation/useStoreLocation";

const emit = defineEmits(["close"]);
const storeStore = useStoreLocation();

const props = defineProps({
  selectedStoreId: {
    type: String,
  },
});

const daysOfWeek = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

const defaultDayHours = { open: "09:00", close: "17:00", closed: false };

const hours = ref(
  daysOfWeek.reduce((acc, day) => {
    acc[day.value] = { ...defaultDayHours };
    return acc;
  }, {})
);

const formError = ref("");
const isSubmitting = ref(false);
const selectedStore = computed(() => storeStore.selectedStore);

onMounted(() => {
  if (selectedStore.value?.openingHours) {
    daysOfWeek.forEach((day) => {
      if (selectedStore.value.openingHours[day.value]) {
        hours.value[day.value] = {
          ...defaultDayHours,
          ...selectedStore.value.openingHours[day.value],
        };
      }
    });
  }
});

const handleSubmit = async () => {
  for (const day of daysOfWeek) {
    const { open, close, closed } = hours.value[day.value];
    if (!closed && (!open || !close)) {
      formError.value = `Please set open and close times for ${day.label} or mark it as closed.`;
      return;
    }
  }
  formError.value = "";
  isSubmitting.value = true;

  try {
    await storeStore.updateStoreOpeningHours(props.selectedStoreId, hours.value);
    emit("close", hours.value);
  } catch (err) {
    formError.value = "Failed to update opening hours.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.store-hours-form {
  width: 100%;
  padding: 24px 24px 0;
  max-height: 540px;
  overflow-y: auto;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--black-2);
}

.form-grid {
  display: grid;
  row-gap: 12px;
}

.day-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.day-label {
  width: 110px;
  font-weight: 600;
}

.closed-label {
  font-size: 0.85rem;
  user-select: none;
  margin-right: 15px;
}

.time-input {
  width: 100px;
  font-size: 0.85rem;
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.to-text {
  font-size: 0.9rem;
  margin: 0 6px;
  color: var(--black-2);
}

.time-range {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
}

.day-row {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
}

.closed-group {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 120px;
}

.time-range {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  flex-grow: 1;
  justify-content: flex-end;
}

@media (max-width: 767px) {
  .day-row {
    flex-wrap: wrap;
  }

  .day-label,
  .closed-group {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .day-label {
    font-weight: 600;
  }

  .time-range {
    flex: 1 1 100%;
    justify-content: flex-start;
  }

  .time-input {
    width: 42.5%;
    min-width: 120px;
  }

  .to-text {
    flex-basis: auto;
    margin: 0 8px;
  }
}
</style>
