<template>
  <div v-if="item" class="menu-item-detail">
    <div class="menu-image" ref="menuContentRef">
      <img :src="item.images[0]" :alt="item.title" />
    </div>

    <div class="content-panel">
      <div class="menu-content" :style="{ height: panelHeight - 100 + 'px' }">
        <div class="menu-info">
          <div>
            <h2 class="menu-title">{{ item.title }}</h2>
            <p class="menu-description">{{ item.description }}</p>
            <ul class="menu-ingredients">
              <li v-for="(ingredient, index) in mockIngredients" :key="index">
                {{ ingredient }}
              </li>
            </ul>
          </div>
          <div>
            <p class="menu-price">${{ item.price }}</p>
          </div>
        </div>

        <div v-if="item?.sizes?.length" class="form-input-field">
          <label
            for="sizes"
            class="large-form-label"
            style="margin-right: 50px; flex: 1"
          >
            Sizes
          </label>
          <div class="form-input-value">
            <SelectSize
              :sizes="item?.sizes"
              :modelValue="item?.selectedSize"
              :itemPrice="item.price"
              @update:selectedSize="handleSelectedSize"
            />
          </div>
        </div>

        <div v-if="item?.options?.length" class="gap-line" />

        <div v-if="categorizedOptions?.addon?.length" class="addon-wrapper">
          <label for="addons" class="form-label"> Addon </label>
          <Addon
            :addons="categorizedOptions?.addon"
            :selectdValues="item?.selectedAddons"
            @updateValue="handleAddons"
          />
        </div>

        <div v-if="categorizedOptions?.choices?.length" class="addon-wrapper">
          <label for="selecta-a-choice" class="form-label">Pick a choice</label>
          <FreeChoice
            :choices="categorizedOptions?.choices"
            :selectdValues="item?.selectedChoices"
            @updateValue="handleChoices"
          />
        </div>

        <div v-if="categorizedOptions?.removal?.length" class="addon-wrapper">
          <label for="removals" class="form-label"> Removals </label>
          <ToggleOptions
            :items="categorizedOptions.removal"
            :selectdValues="item?.selectedRemovalOptions"
            @updateValue="handleRemovalOptions"
          />
        </div>

        <div class="gap-line" />

        <div class="form-input-field">
          <label for="quantity" class="large-form-label"> Quantity </label>
          <div style="flex: 3">
            <div style="width: 200px">
              <QuantitySelector
                :value="formData.quantity"
                :min="1"
                @updateValue="updateQuantity"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="add-to-bag">
        <SubmitButton
          style="width: 100%; font-size: 1.2rem; font-weight: 700"
          @click="addToCart"
          apply-shadow="true"
          >Add to Bag
        </SubmitButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Addon from "~/components/dashboard/products/customizations/types/Addon.vue";
import SubmitButton from "~/components/reuse/ui/SubmitButton.vue";
import { useRestaurant } from "~/stores/shop/useRestaurant";
import SelectSize from "~/components/dashboard/products/customizations/types/SelectSize.vue";
import ToggleOptions from "~/components/dashboard/products/customizations/types/ToggleOptions.vue";
import FreeChoice from "~/components/dashboard/products/customizations/types/FreeChoice.vue";
import QuantitySelector from "~/components/reuse/ui/QuantitySelector.vue";
import { saveCart } from "~/utils/useCart";

const { selectedItem } = useRestaurant();

const mockIngredients = ["Fresh herbs", "Olive oil", "Garlic", "Lemon zest"];

const menuContentRef = ref(null);
const panelHeight = ref("auto");
const formData = reactive({
  selectedSize: '',
  selectedAddons: [],
  selectedChoices: [],
  selectedRemovalOptions: [],
  quantity: 1
});

const item = computed(() => selectedItem);
const categorizedOptions = computed(() => {
  const removal = [];
  const addon = [];
  const choices = [];

  const options =
    selectedItem && "options" in selectedItem ? selectedItem.options : [];

  options.forEach((mod) => {
    if (mod.type === "removal") removal.push(mod);
    if (mod.type === "addon") addon.push(mod);
    if (mod.type === "choices") choices.push(mod);
  });

  return { removal, addon, choices };
});

const handleSelectedSize = (selectedSize) => {
  formData.selectedSize = selectedSize;
};

const handleAddons = (selectedAddons) => {
  formData.selectedAddons = selectedAddons;
};

const handleChoices = (selectedChoices) => {
  formData.selectedChoices = selectedChoices;
};

const handleRemovalOptions = (selectedRemovalOptions) => {
  formData.selectedRemovalOptions = selectedRemovalOptions;
};

const updateQuantity = (newQuantity) => {
  formData.quantity = newQuantity;
};

const addToCart = () => {
  const product = {
    ...selectedItem,
    ...formData,
    cartId: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    quantity: quantity.value,
  };

  // let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // const existingItem = cart.find((item) => {
  //   return (
  //     item.id === product.id &&
  //     JSON.stringify(item) === JSON.stringify(product)
  //   );
  // });

  // if (existingItem) {
  //   existingItem.quantity += product.quantity;
  // } else {
  //   cart.push(product);
  // }

  // saveCart(cart);
};

onMounted(async () => {
  await nextTick();
  updateHeight();
  window.addEventListener("resize", updateHeight);

  if (selectedItem?.cartId) {
    Object.assign(formData, {
      selectedSize: selectedItem.selectedSize,
      selectedAddons: selectedItem.selectedAddons,
      selectedChoices: selectedItem.selectedChoices,
      selectedRemovalOptions: selectedItem.selectedRemovalOptions,
      quantity: selectedItem.quantity
    });
  } 
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateHeight);
});

const updateHeight = () => {
  if (menuContentRef.value) {
    const offset = 80;
    const fullHeight = window.innerHeight;
    panelHeight.value = fullHeight - offset;
  }
};

watchEffect(async () => {
  await nextTick();
  if (menuContentRef.value) {
    panelHeight.value = menuContentRef.value.offsetHeight - 80;
  }
});
</script>

<style scoped>
.menu-item-detail {
  position: relative;
  display: flex;
  height: 100%;
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
@media screen and (max-width: 900px) {
  .menu-item-detail {
    flex-direction: column;
    overflow-y: scroll;
  }
}

.menu-image {
  width: 45%;
  height: 100%;
  border-right: 1px solid var(--gray-1);
}
@media screen and (max-width: 1000px) {
  .menu-image {
    width: 40%;
    height: auto;
  }
}
@media screen and (max-width: 900px) {
  .menu-image {
    width: 100%;
    height: auto;
  }
}

.menu-image img {
  width: auto;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  box-sizing: border-box;
}
@media screen and (max-width: 1000px) {
  .menu-image img {
    width: 100%;
    height: auto;
    max-height: 450px;
    object-fit: contain;
  }
}

.content-panel {
  width: 55%;
  padding: 0 30px 30px;
  display: flex;
  flex-direction: column;
}
@media screen and (min-width: 900px) {
  .content-panel {
    position: relative;
  }
}
@media screen and (max-width: 1000px) {
  .content-panel {
    width: 65%;
  }
}
@media screen and (max-width: 900px) {
  .content-panel {
    width: 100%;
  }
}

.menu-panel {
}

.menu-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}

.menu-title {
  font-size: 28px;
  margin-bottom: 10px;
}

.menu-content {
  padding-top: 20px;
  min-height: 500px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
@media screen and (min-width: 901px) {
  .menu-content {
    overflow-y: scroll;
  }
}

.menu-content > *:last-child {
  padding-bottom: 120px;
}

.menu-price {
  font-size: 20px;
  color: #e67e22;
  margin-bottom: 15px;
}

.gap-line {
  width: 100%;
  height: 1px; 
  background: var(--pale-gray-1);
  margin: 30px 0;
}

.menu-description {
  margin-bottom: 15px;
  color: var(--black-2);
  line-height: 1.6;
}

.form-input-field {
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
}

.form-input-field > label {
  margin-right: 50px;
  flex: 1;
}

.form-input-field > .form-input-value {
  flex: 3;
}

.large-form-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--black-2);
}

.menu-ingredients {
  display: flex;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: var(--black-2);
}

.menu-ingredients li::before {
  content: "• ";
  color: #27ae60;
  margin: 8px;
}

.add-to-bag {
  position: fixed;
  bottom: 0px;
  left: 30px;
  right: 30px;
  height: 60px;
  z-index: 9990;
  padding: 0px 0px 10px;
  box-sizing: border-box;
  background: var(--primary-bg-color-1);
}
@media screen and (min-width: 901px) {
  .add-to-bag {
    position: absolute;
  }
}

.addon-wrapper {
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
