/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import { LogOutIcon } from 'vue-feather-icons'
import axios from '../axios'
import { server } from '../main'

const actions = {

    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    updateVerticalNavMenuWidth({ commit }, width) {
        commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
    },

    // VxAutoSuggest
    updateStarredPage({ commit }, payload) {
        commit('UPDATE_STARRED_PAGE', payload)
    },

    // The Navbar
    arrangeStarredPagesLimited({ commit }, list) {
        commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({ commit }, list) {
        commit('ARRANGE_STARRED_PAGES_MORE', list)
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({ commit }) {
        commit('TOGGLE_CONTENT_OVERLAY')
    },
    updateTheme({ commit }, val) {
        commit('UPDATE_THEME', val)
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({ commit }, payload) {
        commit('UPDATE_USER_INFO', payload)
    },

    // /////////////////////////////////////////////
    // Contenido
    // /////////////////////////////////////////////


    getContenido({ commit }) {
        var razonBusqueda = localStorage.getItem("contenidorazonBusqueda");
        var busqueda = localStorage.getItem("contenidoBusqueda");
        axios.get(server + "contenido?busqueda=" + busqueda + '&razonBusqueda=' + razonBusqueda)
            .then(function(response) {

                // localStorage.setItem("errorContenido","no")

                if (response.data.status == '0') {
                    // localStorage.setItem("errorContenido","yes") 
                    commit('SET_CONTENIDO_CLEAN', [])
                } else {
                    commit('SET_CONTENIDO', response.data.items)
                }

            })
            .catch(function(error) {})
    },

    // /////////////////////////////////////////////
    // Get tareas
    // /////////////////////////////////////////////

    getTareas({ commit }) {
        console.log(localStorage.usuario);
        var usuario = JSON.parse(localStorage.getItem('usuario'))
        axios.get(server + 'estudianteCurso?idusuario=' + usuario.idusuario)
            .then(function(response) {
                console.log(response.data.items)
                commit('SET_TAREAS', response.data.items)
            })
            .catch(function(error) {})
    },

    async login({ dispatch, commit }, credenciales) {
        localStorage.setItem('bloqueo','no')
        let formData = new FormData();
        console.log(server)
        formData.append('name_usuario', credenciales.email);
        formData.append('password', credenciales.password);
        await axios.get(server + 'sanctum/csrf-cookie');
        await axios.post(server + 'login', formData)
            .then(function(response) {
              
                return dispatch("getUsuario");
            })
            .catch(function(error) {
                
                if (error.response.status == 422) {
                    commit('SET_ERROR', error.response.data.errors.name_usuario[0])
                }

                if (error.response.status == 412) {
                    commit('SET_ERROR', error.response.data.errors)
                }
            })

    },

    async logout({ dispatch }) {
        await axios.post(server + 'logout');
        localStorage.clear();
        // return dispatch("getUsuario")
    },
    async logout2({ dispatch }) {
        await axios.post(server + 'logout');
        let estado = localStorage.getItem("bloqueo")
        if(estado == "yes"){
            location.reload()
        }
        // return dispatch("getUsuario")
    },

    async getUsuario({ commit }) {
        let obtenerBloqueo = localStorage.getItem("bloqueo")
        if(obtenerBloqueo == 'yes'){
            commit('SET_USUARIO', null);
            return false
           
        }
        
        await axios.get(server + 'user')
            
            .then(function(response) {
                if (response.data.idusuario) {
                    response.data.idusuario
                    commit('SET_USUARIO', response.data);
                }
            })
            .catch(function(error) {
                commit('SET_USUARIO', null);
            })
    },

    getTareasDocentes({ commit }) {
        let me = this;
        var url = server + "getTareasDocentes?idcurso=" + localStorage.idcurso;
        axios.get(url).then(function(response) {
                commit('SET_TAREAS_DOCENTES', response.data.items)
            })
            .catch(function(error) {});

    },

}

export default actions