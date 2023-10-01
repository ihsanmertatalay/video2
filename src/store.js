// store.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      myName: "mm",
      a : 100
    };
  },
  mutations: {
    define(state, newName) {
      state.myName = newName
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    decrement(context) {
      context.commit('decrement');
    }
  },
  getters: {
    getmyName(state) {
      return state.myName;
    },
    getA(state) {
        return state.a;
      }
  }
});

export default store;
