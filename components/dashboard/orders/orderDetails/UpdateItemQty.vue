<template>
  <div class="modal-title">
    <h3 class="header3">Quantity</h3>
  </div>

  <div class="number-pad">
    <div class="qty">{{ newQty }}</div>

    <div class="number-wrapper">
      <div class="number-grid">
        <button v-for="n in numbers" :key="n" @click="appendNumber(n)">
          {{ n }}
        </button>
        <button @click="appendNumber(0)">0</button>
        <button @click="backspace">&larr;</button>
      </div>
    </div>

    <div class="amount-display">
      <div class="submit-btn">
        <Button
          @click="submitItem"
          variant="primary"
          :applyShadow="true"
          :style="{
            width: '100%',
            height: '46px',
            padding: '10px 40px',
          }"
        >
          Submit
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { ref, defineEmits } from "vue";
import Button from "~/components/reuse/ui/Button.vue";

const props = defineProps({
  qty: {
    type: Number,
    required: true,
  },
});

const newQty = ref(1);
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const emit = defineEmits(["close"]);

const appendNumber = (num) => {
  const allowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "back"];
  
  const strNum = String(num).toLowerCase();

  if (!allowed.includes(strNum)) return;

  if (strNum === "back") {
    backspace();
    return;
  }

  if (newQty.value === "1" && strNum !== "0") {
    newQty.value = strNum;
  } else {
    newQty.value += strNum;
  }
}

const backspace = () => {
  const strVal = String(newQty.value);

  if (strVal.length <= 1) {
    newQty.value = "1"; 
  } else {
    const sliced = strVal.slice(0, -1);
    newQty.value = sliced === "" || sliced === "0" ? "1" : sliced;
  }
};

const submitItem = async () => {
    
};

const handleKeyDown = (e) => {
  const key = e.key;

  if (key === "Backspace") {
    e.preventDefault();
    backspace();
    return;
  }

  if (/^[0-9]$/.test(key)) {
    e.preventDefault();
    appendNumber(key);
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

watch(
  () => props.qty,
  (newVal) => {
    newQty.value = newVal;
  }, { immediate: true } 
);

</script>

<style scoped>
.number-pad {
  display: flex;
  flex-direction: column;
  margin: 0px;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 900px) {
  .number-pad {
    width: 100%;
    flex-direction: column;
  }
}

.number-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.number-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
  flex: 1;
  box-sizing: border-box;
}
@media screen and (max-width: 900px) {
  .number-grid {
    border-right: 0px solid var(--gray-1);
    margin: 0 auto;
    gap: 30px;
  }
}

.qty {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1.2rem 0 1rem;
}

.amount-display {
  flex: 1;
  width: 100%;
  position: relative;
}

.number-grid button {
  width: 75px;
  height: 75px;
  font-size: 1.5rem;
  background: var(--white-1);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #b2b9b1;
  transition: background 0.2s;
}
@media screen and (max-width: 900px) {
  .number-grid button {
    margin: 0 auto;
  }
}

.number-grid button {
}

.number-grid button:hover {
  background: var(--primary-text-color-1);
  color: var(--white-1);
}

.submit-btn {
  width: 100%;
  margin: 0 auto;
  padding: 16px 12px;
}

</style>
