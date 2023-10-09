import Vuex from 'vuex';


const store = new Vuex.Store({
    state:{
        authenticated: null,
    },
    mutations:{
        setAuth(){
            state.authenticated = true
        },
        clearToken(state){
            state.authenticated = null;
        }
    },
    actions:{
        authenticate({commit}) {
            commit('setAuth');
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
    }
});


export default store