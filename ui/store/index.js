import { createStore } from 'vuex';
import axios from '../axiosConfig';  // Adjust the import path

const store = createStore({
  state: {
    tasks: []
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
      SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    createTask({ commit }, taskData) {
      return axios.post('/api/tasks', taskData)
        .then(response => {
          commit('ADD_TASK', taskData);
          return response.data;
        })
        .catch(error => {
          throw error;
        });
    },
    getTasks({commit}) {
      return axios.get('/api/tasks')
       .then(response => {
          commit('SET_TASKS', response.data);
          return response.data;
        })
       .catch(error => {
          throw error;
        });
    }
  },
  modules: {
  }
});

export default store;
