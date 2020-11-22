import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    overlay: false,
    serviceCounter: 0,
    errors: []
  },
  mutations: {
    SET_OVERLAY: (state, overlay) => {
      state.overlay = overlay
    },
    INCREMENT_COUNTER: (state) => {
      state.serviceCounter = state.serviceCounter + 1
    },
    DECREMENT_COUNTER: (state) => {
      state.serviceCounter = state.serviceCounter - 1
    },
    ADD_ERROR: (state, error) => {
      state.errors.push(error)
    },
    REMOVE_ERRORS: (state) => {
      state.errors = []
    }
  },
  actions: {
    addError ({ commit }, error) {
      commit('ADD_ERROR', error)
    },
    removeErrors ({ commit }) {
      commit('REMOVE_ERRORS')
    },
    setOverlay ({ commit }, overlay) {
      if (overlay) {
        commit('SET_OVERLAY', overlay);
      } else {
        setTimeout(() => { commit('SET_OVERLAY', overlay); }, 1500);
      }
    },
    incrementCounter ({ commit }) {
      commit('INCREMENT_COUNTER')
    },
    decrementCounter ({ commit }) {
      setTimeout(() => { commit('DECREMENT_COUNTER') }, 1000);

    }
  },
  getters: {
    getOverlayState: state => state.overlay,
    getServiceCounter: state => state.serviceCounter,
    getErrors: state => state.errors
  }
})
