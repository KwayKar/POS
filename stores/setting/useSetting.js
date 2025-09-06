import { useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import { apiFetch } from "~/utils/apiFetch";
import { useAdmin } from "../admin/useAdmin";
import { useStaff } from "./staff/useStaff";

export const useSetting = defineStore("setting", {
  state: () => ({
    displayModal: false,
    activeSection: 'User Profile',
    currentUser: {
      name: '',
      email: '',
      phoneNumber: '',
      staffStores: [],
      role: ''
    },
    orgInfo: {
      name: "",
      stores: [], 
    },
    accountInfo: {
      organizationName: "",
      location: "",
      usagePlan: "",
      businessType: "",
    },
    brandStyles: {
      background: "#ffffff", // main body background
      surface: "#fff", // card/panel backgrounds
      secondarySurface: "#f9f9f9", // navbar, footer, or slight contrast sections
      primary: "rgb(185, 185, 233)", // main brand color
      secondary: "#bde0fe", // soft accent or highlight (buttons, links, etc.)
      onPrimary: "#232323", // text on primary
      textPrimary: "#222222", // main text
      textSecondary: "#555555", // secondary text
      border: "#dedede", // neutral borders
      logoUrl: "",
    },
    billingHistory: [
      // Example: { id: 'inv001', date: '2024-01-01', amount: 49.99, description: 'Monthly Plan' }
    ],
  }),

  actions: {
    async loadInitialData() {
      const staffStore = useStaff();
      const adminStore = useAdmin();
      const config = useRuntimeConfig();

      try {
        const [user, org] = await Promise.all([
          staffStore.getStaffById(adminStore.userId),
          apiFetch(`${config.public.apiBaseUrl}/establishments/${adminStore.estId}`)
        ]);

        this.currentUser = user;
        this.orgInfo = org;
      } catch (err) {
      }
    },

    updateAccountInfo(data) {
      this.accountInfo = { ...this.accountInfo, ...data };
    },

    setBrandStyles(styles) {
      this.brandStyles = { ...this.brandStyles, ...styles };
    },

    setActiveSection(section) {
      this.activeSection = section;
    },

    displaySettingModal() {
      this.displayModal = !this.displayModal;
    }
  },
});
