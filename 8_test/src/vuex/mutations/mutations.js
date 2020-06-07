// import state from "../state/state";

export default {
  SET_CONTACTS_TO_STATE: (state, contacts) => {
    state.contacts = contacts;
  },

  TOGGLE_OPTIONS_VISIBILITY: (state) => {
    console.log(state);
    state.are_options_visible = !state.are_options_visible;


  },


  SORT_BY_CATEGORIES(state, option) {
    state.sorted_contacts = [...state.contacts];
    if (option) {
      state.selected_option = option.name;
    }
    if (state.selected_option === "all") {
      return state.contacts;
    } else {
      state.sorted_contacts = state.sorted_contacts.filter((item) => {
        return item.category === state.selected_option;
      });
    }
  },
  SEARCH_CONTACTS(state) {
    state.sorted_contacts = [...state.contacts];

    if (state.searchValue.length) {
      state.sorted_contacts = state.sorted_contacts.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(state.searchValue.toLowerCase());
      });
    } else {
      return;
    }
  },

  SET_SEARCH_VALUE: (state, value) => {
    state.searchValue = value;
  },
  SET_OFFLINE_DATA: (state) => {
    state.contacts = state.offline_data.contacts;
    console.log("can't access the db, using offline data");
  },
};
