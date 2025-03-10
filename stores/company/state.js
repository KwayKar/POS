export const state = () => ({
  name: "Aung",
  id: null,
  role: "waiter",
});

export const mutations = {
  setStaff(state, staff) {
    state.name = staff.name || state.name;
    state.id = staff.id || state.id;
    state.role = staff.role || state.role;
  },
};

export const actions = {
  updateStaff({ commit }, staff) {
    commit("setStaff", staff);
  },
};

export const getters = {
  staffName: (state) => state.name,
  staffRole: (state) => state.role,
  staffId: (state) => state.id,
};


// import Vue from 'vue';
// import Vuex from 'vuex';

// import company from './company';

// Vue.use(Vuex);

// export default () =>
//   new Vuex.Store({
//     modules: {
//       company,
//     },
//   });
