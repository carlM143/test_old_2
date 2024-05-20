import { createApp } from 'vue';
import App from './App.vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import AddTask from './components/AddTask.vue';
import store from '../store';  // Adjust the import path to your store
import axios from '../axiosConfig';  // Adjust the import path to your axiosConfig


// Import Bootstrap and BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const app = createApp(App);

// Install BootstrapVue
app.use(BootstrapVue3);
app.component('add-task', AddTask);

// Use BootstrapVue3
app.use(BootstrapVue3);

// Use Vuex store
app.use(store);

// Add Axios to the global properties if needed
app.config.globalProperties.$axios = axios;


app.mount('#app');



