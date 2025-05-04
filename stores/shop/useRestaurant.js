import { defineStore } from "pinia";
import { ref } from "vue";

export const useRestaurant = defineStore("restaurant", () => {
  const theme = ref({
    background: "#ffffff",             // base background
    surface: "rgb(185, 185, 233)",   // card, surface, panel backgrounds
    primary: "rgb(185, 185, 233)",                // brand's primary color
    onPrimary: "#232323",             // text on primary background
    textPrimary: "#222222",           // primary text
    textSecondary: "#555555",         // for descriptions or less emphasis
    border: "#dddddd",                // neutral border color
  });
  const items = ref([
    {
      category: "Breakfast",
      id: 1,
      items: [
        {
          id: 3,
          title: "Item 3",
          category: "Drinks",
          price: 40,
          description: "Warm, golden potatoes with green goddess drizzle.",
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
  ]);

  function setTheme(newTheme) {
    theme.value = { ...theme.value, ...newTheme };
  };

  return {
    items,
    theme,
    setTheme,
  };
});
