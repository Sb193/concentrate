<template>
    <div class="container mt-5">
      <h3>Create Class</h3>
      <form @submit.prevent="createClass">
        <div class="mb-3">
          <label for="className" class="form-label">Class Name</label>
          <input type="text" id="className" class="form-control" v-model="className" required />
        </div>
        <div class="mb-3">
          <label for="duration" class="form-label">Duration (minutes)</label>
          <input type="number" id="duration" class="form-control" v-model="duration" required />
        </div>
        <button type="submit" class="btn btn-primary">Create Class</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        className: '',
        duration: 45,
      };
    },
    methods: {
      createClass() {
        alert('Class created!');
        // Thêm logic tạo lớp học tại đây
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
  }
  </style>
  