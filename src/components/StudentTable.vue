<template>
    <div>
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th scope="col">Tên</th>
            <th scope="col">Email</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.phone }}</td>
            <td>
              <div class="d-flex gap-2">
                <button @click="viewDetails(student)" class="btn btn-info btn-sm">Chi tiết</button>
                <button @click="deleteStudent(student.id)" class="btn btn-danger btn-sm">Xóa</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="d-flex justify-content-between mt-3">
        <button @click="prevPage" :disabled="page === 1" class="btn btn-secondary">Trang trước</button>
        <button @click="nextPage" class="btn btn-secondary">Trang sau</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['students', 'page'],
    emits: ['prev-page', 'next-page', 'delete-student', 'view-details'],
    methods: {
      prevPage() {
        this.$emit('prev-page');
      },
      nextPage() {
        this.$emit('next-page');
      },
      deleteStudent(id) {
        this.$emit('delete-student', id);
      },
      viewDetails(student) {
        this.$emit('view-details', student);
      },
    },
  };
  </script>
  
  <style scoped>
  .d-flex {
    display: flex;
  }
  .gap-2 {
    gap: 0.5rem;
  }
  </style>
  