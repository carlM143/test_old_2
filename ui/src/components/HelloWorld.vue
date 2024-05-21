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
              <b-button variant="danger" class="me-2" @click="confirmDeleteTask(data.item.id)">Delete</b-button>
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
          <b-form-input id="editDueDate" v-model="editedItem.due_date" type="date" required></b-form-input>
        </div>
        <div class="mb-3">
          <label for="editStatus" class="form-label">Status</label>
          <b-form-select id="editStatus" v-model="editedItem.status" :options="statusOptions" required></b-form-select>
        </div>
        <b-button type="submit" variant="primary">Save Changes</b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';
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
        { value: 'Active', text: 'Active' },
        { value: 'Expired', text: 'Expired' }
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
      return this.tasks.map(task => ({
        ...task,
        status: this.mapStatus(task.status)
      }));
    }
  },

  methods: {
    ...mapActions(['getTasks', 'updateTask', 'deleteTask']),

    openEditModal(item) {
      this.editedItem = { ...item };
      this.showEditModal = true;
    },

    submitEditForm() {
      this.updateTask(this.editedItem)
        .then(() => {
          this.showEditModal = false;
          Swal.fire({
            title: 'Success!',
            text: 'Task updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        })
        .catch(error => {
          console.error('Error updating task:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update task.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    },

    confirmDeleteTask(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTask(id)
            .then(() => {
              Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
              );
            })
            .catch(error => {
              console.error('Error deleting task:', error);
              Swal.fire(
                'Error!',
                'Failed to delete task.',
                'error'
              );
            });
        }
      });
    },

    async deleteTask(id) {
      try {
        await this.$store.dispatch('deleteTask', id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },

    mapStatus(status) {
      return status === 'Active' ? 'Active' : 'Expired';
    }
  },

  created() {
    this.getTasks();
  }
};
</script>
