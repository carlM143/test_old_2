<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <h1>User CRUD</h1>
          <AddTask />
          <br>
          <b-table :items="tasksWithStatus" :fields="fields">
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
    <!-- Add a submit button inside the form -->
  </form>
</b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import AddTask from '@/components/AddTask.vue';

export default {
  name: 'HelloWorld',

  components: {
    AddTask
  },

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
      statusOptions: [
        { value: 'active', text: 'Active' },
        { value: 'expired', text: 'Expired' }
      ],
      showEditModal: false,
      editedItem: {}
    };
  },

  computed: {
    ...mapState({
      tasks: state => state.tasks
    }),
    tasksWithStatus() {
      if (!this.tasks) return [];

      return this.tasks.map(task => {
        if (!task) return null;

        return {
          ...task,
          status: this.mapStatus(task.status)
        };
      });
    }
  },

  methods: {
    ...mapActions(['getTasks', 'updateTask']),
  
    openEditModal(item) {
      this.editedItem = { 
    ...item,
    status: item.status // Ensure that the status property is included
  };
    this.showEditModal = true;
  },

  submitEditForm() {
    this.updateTask(this.editedItem)
      .then(() => {
        // Update succeeded, close modal or perform any other action
        this.showEditModal = false;
      })
      .catch(error => {
        // Handle update error
        console.error('Error updating task:', error);
      });
  },
  async deleteTask(id) {
      try {
        console.log('Deleting task with id:', id); // Check if delete operation is triggered
        await this.$store.dispatch('deleteTask', id);
        console.log('Task deleted successfully'); // Check if delete operation is successful
       
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    mapStatus(status) {
      return status === 'active' ? 'Active' : 'Expired';
    }
  },

  created() {
    this.getTasks();
  }
};
</script>