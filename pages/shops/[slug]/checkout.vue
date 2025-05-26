<template>
  <ShopNavPanel />

  <div class="checkout-container">
    <div class="section-box" style="padding-bottom: 50px">
      <h3 class="header3">Your Information</h3>
      <div class="checkout-form">
        <CheckoutForm :fields="formFields" :enableOverflow="false" />
      </div>
    </div>

    <div class="section-box">
      <h3 class="header3">Your Order</h3>
      <CheckoutItems v-for="item in cartItems" :key="item.id" :item="item" />
    </div>

    <div v-if="errMessage !== ''" class="error-message">
      {{ errMessage }}
    </div>

    <div class="submit-button">
      <SubmitButton
        type="submit"
        style="width: 60%; font-size: 1.15rem; font-weight: 700"
        @click="handleSubmit"
      >
        Submit
      </SubmitButton>
    </div>

    <div class="shop-info">
      <div>{{ menu.shopInfo.location }}</div>
      <div>{{ menu.shopInfo.openingHours }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import CheckoutForm from "~/components/shop-templates/checkout/CheckoutForm.vue";
import CheckoutItems from "~/components/shop-templates/checkout/CheckoutItems.vue";
import ShopNavPanel from "~/components/shop-templates/shopNavbar/ShopNavPanel.vue";
import { useRestaurant } from "~/stores/shop/useRestaurant";

const menu = useRestaurant();
menu.setCategory(menu.items[0]);

const cartItems = ref({});
const errMessage = ref('');
const formFields = ref([
  {
    type: "input",
    label: "Name",
    value: "",
    placeholder: "Enter your name",
    required: true,
    isTwoColumn: true,
    error: false,
  },
  {
    type: "input",
    label: "Phone Number",
    value: "",
    placeholder: "Enter your phone number",
    required: true,
    isTwoColumn: true,
    error: false,
  },
  {
    type: "input",
    label: "Address",
    value: "",
    placeholder: "Enter your address",
    required: true,
    isTwoColumn: false,
    error: false,
  },
  {
    type: "input",
    label: "Township",
    value: "",
    placeholder: "Enter your township",
    required: true,
    isTwoColumn: false,
    error: false,
  },
]);

formFields.value.forEach((field, index) => {
  watch(
    () => field.value,
    (newVal) => {
      if (field.required && newVal.trim()) {
        formFields.value[index].error = false;
      }
    }
  );
});

const handleSubmit = () => {
  let hasError = false;

  formFields.value.forEach((field) => {
    if (field.required && !field.value.trim()) {
      field.error = true;
      hasError = true;
      errMessage.value = 'Please fill up the required fields';
    } else if (field.label === "Phone Number" && !/^[0-9]{6,15}$/.test(field.value)) {
      field.error = true;
      hasError = true;
      errMessage.value = 'Please enter a valid phone number';
    }  else {
      field.error = false;
    }
  });

  if (!hasError) {
    // submit form
    errMessage.value = "";
    // console.log(formFields, cartItems);
  }
}

onMounted(() => {
  const storedCart = getCart();
  if (storedCart) {
    try {
      cartItems.value = storedCart;
    } catch (e) {
      console.error("Invalid cart data in localStorage", e);
    }
  }
});
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.checkout-form {
  padding: 2rem 0 0.5rem;
}

.section-box {
  margin: 50px 0;
  padding: 24px 24px;
  border-radius: 24px;
  overflow: hidden;
  background: var(--white-1);
  border: 1px solid #dedede;
}

.submit-button {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  color: var(--white-1);
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.shop-info {
  margin: 60px auto 20px;
  text-align: center;
  font-size: 14px;
  color: var(--black-3);
}

.error-message {
  display: flex;
  justify-content: center;
  color: var(--red-1);
  margin: 0 auto 30px;
}
</style>
