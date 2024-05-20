
<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <h1>User CRUD</h1>
          <br>
          <b-table :items="items" :fields="fields">
            <template #cell(actions)="data">
              <b-button variant="danger" class="me-2" @click="deleteItem(data.item.id)">Delete</b-button>
              <b-button variant="primary" @click="openEditModal(data.item)">Edit</b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>

    <!-- Edit Modal -->
    <b-modal v-model="showEditModal" title="Edit Task">
      <form @submit.prevent="submitEditForm">
        <div class="mb-3">
          <label for="editTitle" class="form-label">Title</label>
          <b-form-input id="editTitle" v-model="editedItem.title" required></b-form-input>
        </div>
        <div class="mb-3">
          <label for="editDescription" class="form-label">Description</label>
          <b-form-textarea id="editDescription" v-model="editedItem.description" required></b-form-textarea>
        </div>
        <div class="mb-3">
          <label for="editDueDate" class="form-label">Due Date</label>
          <b-form-input id="editDueDate" v-model="editedItem.due_date" required></b-form-input>
        </div>
        <div class="mb-3">
          <label for="editStatus" class="form-label">Status</label>
          <b-form-select id="editStatus" v-model="editedItem.status" :options="statusOptions" required></b-form-select>
        </div>
        <b-button type="submit" variant="primary">Update</b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://your-laravel-app.test/api'; // Change this to your actual Laravel app URL
export default {
  name: 'HelloWorld',
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'due_date', label: 'Due Date' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' }
      ],
      items: [
        { id: 1, title: 'John Doe', description: 'Lorem ipsum', due_date: '2024-04-10', status: 'Expired' },
        { id: 2, title: 'Jane Smith', description: 'Dolor sit amet', due_date: '2024-04-10', status: 'Active' },
        { id: 3, title: 'Sam Green', description: 'Consectetur adipiscing elit', due_date: '2024-04-10', status: 'Active' },
        { id: 4, title: 'Sam Green', description: 'Sed do eiusmod tempor', due_date: '2024-04-10', status: 'Active' }
      ],
      showEditModal: false,
      editedItem: {},
      statusOptions: [
        { value: 'Active', text: 'Active' },
        { value: 'Expired', text: 'Expired' },
      ]
    };
  },
  methods: {
    deleteItem(id) {
      console.log("Delete item with ID: ", id);
    },
    openEditModal(item) {
      this.editedItem = { ...item };
      this.showEditModal = true;
    },
    submitEditForm() {
      const index = this.items.findIndex(item => item.id === this.editedItem.id);
      if (index !== -1) {
        this.items.splice(index, 1, { ...this.editedItem });
      }
      this.showEditModal = false;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.modal-footer {
    display: none;
}
</style>
