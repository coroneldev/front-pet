import http from '@/http-common';
import { createStore } from "vuex";

const store = createStore({
  state: {
    token: localStorage.getItem('token') || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    }
  },
  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        http.post('/api/auth/login', { email: credentials.email, password: credentials.password, sistema: credentials.sistema})
          .then(response => {
            const usuario = response.data.data.usuario;
            const rol = response.data.data.rol;
            const token = response.data.data.token;
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('rol', rol);
            localStorage.setItem('token', token);
            context.commit('retrieveToken', token);
            resolve(response)
          })
          .catch(err => {
            reject(err);
          })
      });
    },

    destroyToken(context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          http.post('/api/auth/logout', null, {
              headers: { Authorization: 'Bearer ' + context.state.token }
            })
            .then(response => {
              localStorage.removeItem('usuario');
              localStorage.removeItem('rol');
              localStorage.removeItem('token');
              context.commit('destroyToken');
              resolve(response);
            })
            .catch(error => {
              localStorage.removeItem('usuario');
              localStorage.removeItem('rol');
              localStorage.removeItem('token');
              context.commit('destroyToken');
              reject(error);
            })
        });
      }
    }
  }
});

export default store;