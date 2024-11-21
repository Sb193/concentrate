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
          <tr v-for="teacher in teachers" :key="teacher.id">
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.email }}</td>
            <td>{{ teacher.phone }}</td>
            <td>
              <div class="d-flex gap-2">
                <button @click="viewDetails(teacher)" class="btn btn-info btn-sm">Chi tiết</button>
                <button @click="deleteTeacher(teacher.id)" class="btn btn-danger btn-sm">Xóa</button>
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
    props: ['teachers', 'page'],
    emits: ['prev-page', 'next-page', 'delete-teacher', 'view-details'],
    methods: {
      prevPage() {
        this.$emit('prev-page');
      },
      nextPage() {
        this.$emit('next-page');
      },
      deleteTeacher(id) {
        this.$emit('delete-teacher', id);
      },
      viewDetails(teacher) {
        this.$emit('view-details', teacher);
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
  