export default {
  TOGGLE_OPTIONS_VISIBILITY({ commit }) {
    commit("TOGGLE_OPTIONS_VISIBILITY");
  },
  SORT_BY_CATEGORIES({ commit }, category) {
    commit("SORT_BY_CATEGORIES", category);
  },
  SET_SEARCH_VALUE({ commit }, value) {
    commit("SORT_BY_CATEGORIES", this.state.select_options[0]);
    commit("SET_SEARCH_VALUE", value);
  },
  SEARCH_CONTACTS({ commit }, searchValue) {
    commit("SEARCH_CONTACTS", searchValue);
  },
  AUTH_REQUEST({commit}, {username, password}){
    commit("AUTH_REQUEST", {username, password});
  }
};
