<template>
  <div class="container mt-5 position-relative">
    <!-- Button to trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal">
      Add Task
    </button>

    <!-- Modal -->
    <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="taskModalLabel">Add Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="form.title" required>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" v-model="form.description" required></textarea>
              </div>
              <div class="mb-3">
                <label for="due_date" class="form-label">Due Date</label>
                <input type="date" class="form-control" id="due_date" v-model="form.due_date" required>
              </div>
              <div class="mb-3">
                <div class="mt-3">Select Status: <strong>{{ form.status }}</strong></div>
                <b-form-select v-model="form.status" :options="options" size="sm" class="mt-3"></b-form-select>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        due_date: '',
        status: ''
      },
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'active', text: 'Active' },
        { value: 'expired', text: 'Expired' }
      ]
    };
  },
  methods: {
    ...mapActions(['createTask', 'getTasks']),
    submitForm() {
      this.createTask(this.form)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message
          });
          this.resetForm();
          this.hideModal();
          this.refreshTasks();
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'An error occurred'
          });
        });
    },
    resetForm() {
      this.form = {
        title: '',
        description: '',
        due_date: '',
        status: ''
      };
    },
    hideModal() {
      const modalElement = document.getElementById('taskModal');
      const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
      modalInstance.hide();
    },
    refreshTasks() {
      this.getTasks();
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
