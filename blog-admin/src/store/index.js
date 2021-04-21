import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        //是否授权
        isAuthorization:'',
        user:{}
    },
    mutations:{
        SET_ISAUTHORIZATION (state,isAuthorization){
            if(isAuthorization) {
                state.isAuthorization = isAuthorization
            } else {
                state.isAuthorization = false
            }
        },
        SET_USER (state,user){
            state.user = user
        },
        CLEAR_ISAUTHORIZATION (state){
            state.isAuthorization = false
        },
        CLEAR_USER (state){
            state.user = {}
        }
    },
    actions:{
        set_isAuthorzation ({commit},isAuthorzation){
            commit('SET_ISAUTHORIZATION',isAuthorzation)
        },
        set_user ({commit},user){
            commit('SET_USER',user)
        },
        clear_user ({commit}){
            commit('CLEAR_USER')
            commit('CLEAR_ISAUTHORIZATION')
        }
    }
})

export default store