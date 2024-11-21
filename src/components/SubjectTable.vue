<template>
    <div>
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th scope="col">Tên môn</th>
            <th scope="col">Giáo viên</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="Subject in Subjects" :key="Subject.subject_id">
            <td>{{ Subject.subject_name }}</td>
            <td>{{ Subject.teacher_name }}</td>
            <td>
              <div class="d-flex gap-2">
                <button @click="viewDetails(Subject)" class="btn btn-info btn-sm">Chi tiết</button>
                <button @click="deleteSubject(Subject.subject_id)" class="btn btn-danger btn-sm">Xóa</button>
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
    props: ['Subjects', 'page'],
    emits: ['prev-page', 'next-page', 'delete-Subject', 'view-details'],
    methods: {
      prevPage() {
        this.$emit('prev-page');
      },
      nextPage() {
        this.$emit('next-page');
      },
      deleteSubject(id) {
        this.$emit('delete-Subject', id);
      },
      viewDetails(Subject) {
        this.$emit('view-details', Subject);
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
  