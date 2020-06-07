import Vue from "vue";
import Vuex from 'vuex';
import commonActions from './actions/actions';
import apiActions from './actions/api-requests';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import state from './state/state';
Vue.use(Vuex);

const actions = {...commonActions, ...apiActions};

let store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,

});

export default store;