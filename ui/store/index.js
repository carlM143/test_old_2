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
    DELETE_TASK(state, tasktId) {
      const index = state.tasks.findIndex(task => task.id === tasktId);
      if (index !== -1) {
          state.tasks.splice(index, 1);
      }
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
    getTasks({ commit }) {
      return axios.get('/api/tasks')
       .then(response => {
          commit('SET_TASKS', response.data);
          return response.data;
        })
       .catch(error => {
          throw error;
        });
    },
    updateTask({ commit }, taskData) {
      return axios.put(`/api/tasks/${taskData.id}`, taskData)
        .then(response => {
          // Optionally, update the task in the store if needed
          commit('UPDATE_TASK', response.data);
          return response.data;
        })
        .catch(error => {
          throw error;
        });
    },
    async deleteProduct({ commit }, tasktId) {
      await axios.delete(`/api/tasks/${tasktId}`);
      commit('DELETE_PRODUCT', tasktId);
  }
  },
  modules: {}
});


export default store;
