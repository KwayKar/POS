export default {
  selectStaff({ commit }, staff) {
    commit("SET_CURRENT_STAFF", staff);
  },
};
