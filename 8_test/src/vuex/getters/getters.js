export default {
  USER_TOKEN(state){
    return state.user_token;
  },
  SEARCH_VALUE(state) {
    return state.searchValue;
  },
  CONTACTS(state) {
    return state.contacts;
  },
  SELECT_OPTIONS(state) {
    return state.select_options;
  },
  SELECTED_OPTION(state) {
    return state.selected_option;
  },
  ARE_OPTIONS_VISIBLE(state) {
    return state.are_options_visible;
  },
  SORTED_CONTACTS(state) {
    return state.sorted_contacts;
  },
  IS_AUTHENTICATED(state){
    return !!state.token;
  },
  AUTH_STATUS(state){
    return state.status;
  }
  
};


