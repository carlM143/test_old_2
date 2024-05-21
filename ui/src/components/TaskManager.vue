<template>
    <div>
      <h1>Task Manager</h1>
  
      <!-- Task List -->
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <strong>{{ task.title }}</strong> - {{ task.description }} (Due: {{ task.due_date }}) [{{ task.status }}]
        </li>
      </ul>
  
      <!-- Add Task Form -->
      <h2>Add New Task</h2>
      <form @submit.prevent="addTask">
        <div>
          <label for="title">Title:</label>
          <input type="text" v-model="newTask.title" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea v-model="newTask.description" required></textarea>
        </div>
        <div>
          <label for="due_date">Due Date:</label>
          <input type="date" v-model="newTask.due_date" required />
        </div>
        <div>
          <label for="status">Status:</label>
          <select v-model="newTask.status" required>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tasks: [],
        newTask: {
          title: '',
          description: '',
          due_date: '',
          status: 'Active'
        }
      };
    },
    methods: {
      fetchTasks() {
        axios.get('http://localhost:8000/api/tasks')
          .then(response => {
            this.tasks = response.data;
          })
          .catch(error => {
            console.error('Error fetching tasks:', error);
          });
      },
      addTask() {
        axios.post('http://localhost:8000/api/tasks', this.newTask)
          .then(response => {
            this.tasks.push(response.data);
            this.newTask = {
              title: '',
              description: '',
              due_date: '',
              status: 'Active'
            };
          })
          .catch(error => {
            console.error('Error adding task:', error);
          });
      }
    },
    mounted() {
      this.fetchTasks();
    }
  };
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
  