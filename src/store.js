import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";


const store = new Vuex.Store({
    plugins: [createPersistedState({ key:'app-state',storage: window.sessionStorage })],

    state:{
        authenticated: null,
        curr_user:null,
    },
    mutations:{
        setAuth(state,username){
            state.authenticated = true
            state.curr_user = username
        },
        clearToken(state){
            state.authenticated = null;
            state.curr_user = null
        }
    },
    actions:{
        authenticate({commit},username) {
            commit('setAuth',username);
        },
        logout({commit}){
            commit('clearToken');
        }
    },
    getters:{
        getAuth(state) {
            if (state.authenticated){
                return true
            }
            else{
                return false
            }
        },

        getCurrentUser(state){
            if (state.curr_user){
                return state.curr_user
            }
            else{
                return null
            }
        }
    }
});


export default store