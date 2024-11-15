<template>
    <div class="container mt-5">
      <h3>Add Teacher</h3>
      <form @submit.prevent="addTeacher">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" class="form-control" v-model="name" required />
        </div>
        <div class="mb-3">
          <label for="subject" class="form-label">Subject</label>
          <input type="text" id="subject" class="form-control" v-model="subject" required />
        </div>
        <button type="submit" class="btn btn-primary">Add Teacher</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        subject: '',
      };
    },
    methods: {
      addTeacher() {
        alert('Teacher added!');
        // Thêm logic thêm giáo viên tại đây
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
  }
  </style>
  