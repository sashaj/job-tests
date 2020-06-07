import axios from 'axios';

export default {
    GET_CONTACTS_FROM_API({ commit }) {
        return axios('http://localhost:3000/contacts', {
            method: "GET"
        })
            .then(contacts => {
                if (contacts){
                    contacts.data.forEach(function (item) {
                        item.quantity = 1;
                    })
                    commit('SET_CONTACTS_TO_STATE', contacts.data);
                    return contacts;
                }
            })
            .catch((error => {
                commit('SET_OFFLINE_DATA');

                console.log(error)
                return error;
            }))
    },
}