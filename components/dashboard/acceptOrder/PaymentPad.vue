<template>
  <div class="modal-title">
    <h3 class="header3">Payment</h3>
  </div>

  <div class="payment-pad">
    <div class="number-grid">
      <button v-for="n in numbers" :key="n" @click="appendNumber(n)">
        {{ n }}
      </button>
      <button @click="clear">C</button>
      <button @click="appendNumber(0)">0</button>
      <button @click="backspace">&larr;</button>
    </div>

    <div class="amount-display">
      <div class="payment-info">
        <p class="payment-label">
          Total: <span>{{ total.toLocaleString() }}</span>
        </p>
        <p class="payment-label">
          Paid: <span>{{ paidAmount.toLocaleString() }}</span>
        </p>
        <p class="payment-label" v-if="change >= 0">
          Change: <span>{{ change.toLocaleString() }}</span>
        </p>
      </div>

      <div v-if="error.status" class="error-payment error-message">
        <p>{{ error.message }}</p>
      </div>

      <div class="submit-btn">
        <Button
          @click="submitItem"
          variant="primary"
          :applyShadow="true"
          style="width: 100%; height: 46x; padding: 10px 40px"
        >
          Submit
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from "nuxt/app";
import { ref, computed, toRaw, defineEmits } from "vue";
import Button from "~/components/reuse/ui/Button.vue";
import { useAdmin } from "~/stores/admin/useAdmin";
import { usePosStore } from "~/stores/pos/usePOS";

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
});

const paidInput = ref("");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const error = ref({ status: false, message: "" });

const adminStore = useAdmin();
const posStore = usePosStore();

const emit = defineEmits(["close"]);

const appendNumber = (num) => {
  paidInput.value += num.toString();
};

const clear = () => {
  paidInput.value = "";
};

const backspace = () => {
  paidInput.value = paidInput.value.slice(0, -1);
};

const paidAmount = computed(() => {
  return Number(paidInput.value || "0");
});

const change = computed(() => {
  return paidAmount.value - props.total;
});

const submitItem = async () => {
  const config = useRuntimeConfig();

  if (paidAmount.value === 0) {
    error.value = { status: true, message: "Please insert paid amount"}
  } else if (paidAmount.value !== 0 && paidAmount.value >= props.total) {
    const payload = {
      storeId: adminStore.storeId,
      orderType: "EATIN",
      total:
        posStore.cart &&
        posStore.cart.reduce((sum, item) => sum + item.total, 0),
      notes: "No ketchup",
      orderItems: posStore.cart.map((item) => {
        const rawItem = toRaw(item);
      
        return {
          productId: rawItem.item.id,
          quantity: rawItem.quantity,
          price: rawItem.unitPrice,
          status: 'CONFIRMED',
          notes: rawItem.preferences,
          ...(rawItem.size && { size: rawItem.size.label }), // or sizeId if you store it
          customizations: [
            ...(rawItem.addons?.map((a) => ({
              type: "addon",
              id: a.id,
              title: a.title,
              price: a.price,
              quantity: a.quantity ?? 1,
            })) || []),
            ...(rawItem.choices?.map((c) => ({
              type: "choice",
              id: c.id,
              title: c.title,
            })) || []),
            ...(rawItem.removals?.map((r) => ({
              type: "removal",
              id: r.id,
              title: r.title,
            })) || []),
          ],
        };
      }),
    };

    await fetch(`${config.public.apiBaseUrl}/stores/${adminStore.storeId}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    posStore.clearCart();
    emit("close");

    // const result = await res.json();
    // console.log("Order submitted:", result);
  } else {
    error.value = { status: true, message: "Something went wrong" }
    // console.log("Error");
  }
};
</script>

<style scoped>
.payment-pad {
  display: flex;
  justify-content: space-between;
  margin: 0px;
  font-family: sans-serif;
}
@media screen and (max-width: 900px) {
  .payment-pad {
    width: 100%;
    flex-direction: column;
    height: 92vh;
  }
}

.number-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 35px;
  flex: 1;
  border-right: 1px solid var(--gray-1);
  box-sizing: border-box;
}
@media screen and (max-width: 900px) {
  .number-grid {
    border-right: 0px solid var(--gray-1);
    margin: 0 auto;
    gap: 36px;
  }
}

.amount-display {
  flex: 1;
  min-width: 300px;
  position: relative;
}

.payment-info {
  padding: 35px 20px;
  box-sizing: border-box;
  margin-right: 15px;
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

.payment-label {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 16px;
  color: var(--primary-text-color-1);
}
.payment-label span {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-text-color-1);
}

.submit-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  padding: 16px 12px;
}

.error-payment {
  margin-left: 20px;
}
</style>
