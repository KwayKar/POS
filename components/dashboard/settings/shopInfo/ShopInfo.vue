<template>
  <div class="container">
    <CheckoutForm :fields="formFields" :enableOverflow="true" />

    <div class="modal-submit-section panel-bottom">
      <div>
        <div v-if="errMessage">{{ errMessage }}</div>
      </div>
      <SubmitButton>
        Update
      </SubmitButton>
    </div>
  </div>
</template>

<script setup>
import CheckoutForm from "~/components/shop-templates/checkout/CheckoutForm.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";

const errMessage = ref('');
const formFields = ref([
  {
    type: "input",
    label: "Name",
    value: "",
    placeholder: "Enter your name",
    required: true,
    isTwoColumn: true,
    description: "It will show up in your sidebar and notifications.",
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
  {
    type: "switch",
    label: "Enable Online Shop",
    value: false,
    isTwoColumn: false,
    description: "Start selling online through a premade website",
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
    errMessage.value = "";
    // console.log(formFields, cartItems);
  }
}

</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.modal-submit-section {
  position: absolute;
  bottom: 0;
  left: 0;
}

.panel-bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 2rem;
}
</style>