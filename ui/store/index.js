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
    DELETE_TASK(state, taskId) {
      const index = state.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    }
  },
  actions: {
    createTask({ commit }, taskData) {
      return axios.post('/api/tasks', taskData)
        .then(response => {
          commit('ADD_TASK', response.data);
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
          commit('UPDATE_TASK', response.data);
          return response.data;
        })
        .catch(error => {
          throw error;
        });
    },
    async deleteTask({ commit }, taskId) {
      await axios.delete(`/api/tasks/${taskId}`);
      commit('DELETE_TASK', taskId);
    }
  },
  modules: {}
});

export default store;
