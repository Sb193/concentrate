<template>
    <div class="container mt-5">
      <h3>Record Concentration</h3>
      <form @submit.prevent="recordConcentration">
        <div class="mb-3">
          <label for="studentId" class="form-label">Student ID</label>
          <input type="text" id="studentId" class="form-control" v-model="studentId" required />
        </div>
        <div class="mb-3">
          <label for="concentrationLevel" class="form-label">Concentration Level</label>
          <input type="number" id="concentrationLevel" class="form-control" v-model="concentrationLevel" min="0" max="100" required />
        </div>
        <button type="submit" class="btn btn-primary">Record Concentration</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        studentId: '',
        concentrationLevel: 0,
      };
    },
    methods: {
      recordConcentration() {
        alert('Concentration recorded!');
        // Thêm logic ghi nhận mức độ tập trung tại đây
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
  }
  </style>
  