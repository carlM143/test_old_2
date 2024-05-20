// src/store/index.js
import { createStore } from 'vuex';
import axios from '../axiosConfig';  // Adjust the import path

const store = createStore({
  state: {
    tasks: []
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
    }
  },
  actions: {
    createTask({ commit }, task) {
      return axios.post('/api/tasks', task)
        .then(response => {
          commit('ADD_TASK', response.data.task);
          return response.data;
        })
        .catch(error => {
          throw error;
        });
    }
  },
  modules: {
    // Add additional modules here if needed
  }
});

export default store;
