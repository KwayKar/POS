import { defineStore } from "pinia";

export const useRestaurant = defineStore("restaurant", {
  state: () => ({
    theme: {
      background: "#ffffff",
      surface: "#fff",
      secondarySurface: "#f9f9f9",
      primary: "rgb(185, 185, 233)",
      secondary: "#bde0fe",
      onPrimary: "#232323",
      textPrimary: "#222222",
      textSecondary: "#555555",
      border: "#dedede",
    },
    shopInfo: {
      logo: "",
      openingHours: "9:00 AM - 20:00 PM",
      location: "No.123 Fake Street, Ahlone",
    },
    selectedItem: null,
    selectedCategory: null,
    items: [
      {
        category: "Breakfast",
        id: 1,
        items: [
          {
            id: 3,
            title: "Item 3",
            category: "Drinks",
            price: 40,
            description: " olden potatoes with green goddess drizzle.",
            images: [
              "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
            ],
            snooze: false,
            options: [
              {
                id: 1,
                label: "No Cheese",
                type: "removal",
                image:
                  "https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134921/ingredients/App_Romaine?_a=BATAXdAA0",
              },
              {
                id: 2,
                label: "Extra Bacon",
                type: "addon",
                maxLimit: 3,
                startAt: 0,
                image:
                  "https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134920/ingredients/App_Kale?_a=BATAXdAA0",
              },
              {
                id: 3,
                label: "Choose Sauce",
                type: "choices",
                image:
                  "https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134919/ingredients/App_Avocado?_a=BATAXdAA0",
              },
              {
                id: 4,
                label: "No Pickles",
                type: "removal",
                image:
                  "https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134967/ingredients/App_Breaded_Chicken?_a=BATAXdAA0",
              },
              {
                id: 5,
                label: "Add Avocado",
                type: "addon",
                maxLimit: 3,
                startAt: 1,
                image:
                  "https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134919/ingredients/App_Avocado?_a=BATAXdAA0",
              },
              {
                id: 6,
                label: "White Rice",
                type: "choices",
                image:
                  "https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134988/ingredients/APP_IMG_INGREDIENTS_Lime?_a=BATAXdAA0",
              },
              {
                id: 7,
                label: "Extra Bacon",
                type: "addon",
                maxLimit: 3,
                startAt: 0,
                image:
                  "https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134920/ingredients/App_Kale?_a=BATAXdAA0",
              },
              {
                id: 8,
                label: "Extra Bacon",
                type: "addon",
                maxLimit: 3,
                startAt: 0,
                image:
                  "https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134920/ingredients/App_Kale?_a=BATAXdAA0",
              },
            ],
            sizes: [
              { label: "S", value: "ID_001", extraPrice: 0 },
              { label: "M", value: "ID_002", extraPrice: 100 },
              { label: "L", value: "ID_003", extraPrice: 200 },
            ],
          },
          {
            id: 2,
            title: "Item 1",
            category: "Drinks",
            price: 40,
            description: "Description goes here",
            images: [
              "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702674222/gravy/production/Gravy::MasterProduct/Q42023_OLO_MiniMezze_3600x2400_2_kcab4k",
            ],
            snooze: false,
          },
          {
            id: 1,
            title: "Item 1",
            category: "Drinks",
            price: 40,
            description: "Description goes here",
            images: [
              "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1726538633/gravy/production/Gravy::MasterProduct/SG_OLO_Kale_Caesar_Steak_3600x2400_quqea9",
            ],
            snooze: false,
          },
        ],
      },
      {
        category: "Lunch",
        id: 2,
        items: [
          {
            id: 1,
            title: "Item 3",
            category: "Drinks",
            price: 40,
            description: "A vibrant mix of dips, grains, and fresh veggies.",
            images: [
              "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
            ],
            snooze: false,
          },
          {
            id: 2,
            title: "Item 1",
            category: "Drinks",
            price: 40,
            description: "Warm, golden potatoes with green goddess drizzle.",
            images: [
              "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1712783467/gravy/production/Gravy::MasterProduct/Q423_OLO_JasmineGreenTea_3600x2400_2_l3yl3q",
            ],
            snooze: false,
          },
          {
            id: 5,
            title: "Item 1",
            category: "Drinks",
            price: 40,
            description: "Grilled steak served over kale with a creamy Caesar.",
            images: [
              "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1712783434/gravy/production/Gravy::MasterProduct/Q423_OLO_Lemonade_3600x2400_zflkku",
            ],
            snooze: false,
          },
        ],
      },
      {
        category: "Dinner",
        id: 3,
        items: [
          {
            id: 1,
            title: "Item 3",
            category: "Drinks",
            price: 40,
            description: "Grilled steak served over kale with a creamy Caesar.",
            images: [
              "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
            ],
            snooze: false,
          },
        ],
      },
      {
        category: "Test 1",
        id: 4,
        items: [],
      },
      {
        category: "Test 1",
        id: 5,
        items: [],
      },
      {
        category: "Test 1",
        id: 6,
        items: [],
      },
      {
        category: "Test 1",
        id: 7,
        items: [],
      },
      {
        category: "Test 1",
        id: 8,
        items: [],
      },
      {
        category: "Test 1",
        id: 9,
        items: [],
      },
    ],
    blockEmitCategory: false,
  }),

  getters: {
    selectedCategoryItems(state) {
      if (!state.selectedCategory) return [];
      const cat = state.items.find(
        (c) => c.category === state.selectedCategory
      );
      return cat ? cat.items : [];
    },
  },

  actions: {
    setTheme(newTheme) {
      this.theme = { ...this.theme, ...newTheme };
    },

    setCategory(category) {
      this.selectedCategory = category;
    },

    blockObserver() {
      this.blockEmitCategory = true;
    },

    unblockObserver() {
      this.blockEmitCategory = false;
    },

    onSelectItem(item) {
      if (item) {
        this.selectedItem = item;
      }
    },
  },
});

// import { defineStore } from "pinia";
// import { ref } from "vue";

// export const useRestaurant = defineStore("restaurant", () => {
//   const theme = ref({
//     background: "#ffffff",         // main body background
//     surface: "#fff",               // card/panel backgrounds
//     secondarySurface: "#f9f9f9",   // navbar, footer, or slight contrast sections
//     primary: "rgb(185, 185, 233)", // main brand color
//     secondary: "#bde0fe",          // soft accent or highlight (buttons, links, etc.)
//     onPrimary: "#232323",          // text on primary
//     textPrimary: "#222222",        // main text
//     textSecondary: "#555555",      // secondary text
//     border: "#dedede",             // neutral borders
//   });
//   const shopInfo = ref({
//     logo: "",
//     openingHours: "9:00 AM - 20:00 PM",
//     location: "No.123 Fake Street, Ahlone"
//   });
//   const selectedItem = ref(null);
//   const selectedCategory = ref(null);
//   const items = ref([
//     {
//       category: "Breakfast",
//       id: 1,
//       items: [
//         {
//           id: 3,
//           title: "Item 3",
//           category: "Drinks",
//           price: 40,
//           description: " olden potatoes with green goddess drizzle.",
//           images: [
//             "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
//           ],
//           snooze: false,
//           options: [
//             { id: 1, label: 'No Cheese', type: 'removal', image: 'https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134921/ingredients/App_Romaine?_a=BATAXdAA0' },
//             { id: 2, label: 'Extra Bacon', type: 'addon', maxLimit: 3, startAt: 0, image: 'https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134920/ingredients/App_Kale?_a=BATAXdAA0' },
//             { id: 3, label: 'Choose Sauce', type: 'choices', image: 'https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134919/ingredients/App_Avocado?_a=BATAXdAA0' },
//             { id: 4, label: 'No Pickles', type: 'removal', image: 'https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134967/ingredients/App_Breaded_Chicken?_a=BATAXdAA0' },
//             { id: 5, label: 'Add Avocado', type: 'addon', maxLimit: 3, startAt: 1, image: 'https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134919/ingredients/App_Avocado?_a=BATAXdAA0' },
//             { id: 6, label: 'White Rice', type: 'choices', image: 'https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134988/ingredients/APP_IMG_INGREDIENTS_Lime?_a=BATAXdAA0' },
//             { id: 7, label: 'Extra Bacon', type: 'addon', maxLimit: 3, startAt: 0, image: 'https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134920/ingredients/App_Kale?_a=BATAXdAA0' },
//             { id: 8, label: 'Extra Bacon', type: 'addon', maxLimit: 3, startAt: 0, image: 'https://res.cloudinary.com/justsalad/image/upload/c_fit,w_200,h_200/f_auto/q_auto/v1678134920/ingredients/App_Kale?_a=BATAXdAA0' },

//           ],
//           sizes: [
//             { label: "S", value: "ID_001", extraPrice: 0 },
//             { label: "M", value: "ID_002", extraPrice: 100 },
//             { label: "L", value: "ID_003", extraPrice: 200 }
//           ]
//         },
//         {
//           id: 2,
//           title: "Item 1",
//           category: "Drinks",
//           price: 40,
//           description: "Description goes here",
//           images: [
//             "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702674222/gravy/production/Gravy::MasterProduct/Q42023_OLO_MiniMezze_3600x2400_2_kcab4k",
//           ],
//           snooze: false,
//         },
//         {
//           id: 1,
//           title: "Item 1",
//           category: "Drinks",
//           price: 40,
//           description: "Description goes here",
//           images: [
//             "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1726538633/gravy/production/Gravy::MasterProduct/SG_OLO_Kale_Caesar_Steak_3600x2400_quqea9",
//           ],
//           snooze: false,
//         },
//       ],
//     },
//     {
//       category: "Lunch",
//       id: 2,
//       items: [
//         {
//           id: 1,
//           title: "Item 3",
//           category: "Drinks",
//           price: 40,
//           description: "A vibrant mix of dips, grains, and fresh veggies.",
//           images: [
//             "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
//           ],
//           snooze: false,
//         },
//         {
//           id: 2,
//           title: "Item 1",
//           category: "Drinks",
//           price: 40,
//           description: "Warm, golden potatoes with green goddess drizzle.",
//           images: [
//             "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1712783467/gravy/production/Gravy::MasterProduct/Q423_OLO_JasmineGreenTea_3600x2400_2_l3yl3q",
//           ],
//           snooze: false,
//         },
//         {
//           id: 5,
//           title: "Item 1",
//           category: "Drinks",
//           price: 40,
//           description: "Grilled steak served over kale with a creamy Caesar.",
//           images: [
//             "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1712783434/gravy/production/Gravy::MasterProduct/Q423_OLO_Lemonade_3600x2400_zflkku",
//           ],
//           snooze: false,
//         },
//       ],
//     },
//     {
//       category: "Dinner",
//       id: 3,
//       items: [
//         {
//           id: 1,
//           title: "Item 3",
//           category: "Drinks",
//           price: 40,
//           description: "Grilled steak served over kale with a creamy Caesar.",
//           images: [
//             "https://res.cloudinary.com/sweetgreen/image/upload/f_webp,q_auto:good/dpr_2/c_crop,h_0.7,w_0.4/w_343/v1702673576/gravy/production/Gravy::MasterProduct/Q423_OLO_RoastedSweetPotatoesGreenGoddess_3600x2400_l2lxcx",
//           ],
//           snooze: false,
//         },
//       ],
//     },
//     {
//       category: "Test 1",
//       id: 4,
//       items: [],
//     },
//     {
//       category: "Test 1",
//       id: 5,
//       items: [],
//     },
//     {
//       category: "Test 1",
//       id: 6,
//       items: [],
//     },
//     {
//       category: "Test 1",
//       id: 7,
//       items: [],
//     },
//     {
//       category: "Test 1",
//       id: 8,
//       items: [],
//     },
//     {
//       category: "Test 1",
//       id: 9,
//       items: [],
//     },
//   ]);
//   const blockEmitCategory = ref(false);

//   function setTheme(newTheme) {
//     theme.value = { ...theme.value, ...newTheme };
//   };

//   function setCategory (category) {
//     selectedCategory.value = category;
//   };

//   function blockObserver() {
//     blockEmitCategory.value = true;
//     console.log('block true', blockEmitCategory.value)
//   }

//   function unblockObserver() {
//     blockEmitCategory.value = false
//   }

//   function onSelectItem (item) {
//     if (item) {
//       selectedItem.value = item;
//     }
//   };

//   return {
//     items,
//     theme,
//     setTheme,
//     setCategory,
//     selectedCategory,
//     onSelectItem,
//     selectedItem,
//     shopInfo,
//     blockEmitCategory,
//     blockObserver,
//     unblockObserver
//   };
// });
