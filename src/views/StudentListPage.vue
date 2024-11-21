<template>
    <div class="container mt-4">
      <h2 class="mb-3">Quản lý học sinh</h2>
  
      <!-- Nút thêm học sinh -->
      <button  class="btn btn-primary mb-3">
        <router-link class="nav-link" to="/add-student">Thêm</router-link>
      </button>
  
      <!-- Ô tìm kiếm -->
      <input
        v-model="search"
        @input="fetchStudents"
        class="form-control mb-3"
        type="text"
        placeholder="Tìm kiếm học sinh..."
      />
  
      <!-- Bảng danh sách học sinh -->
      <StudentTable
        :students="students"
        :page="page"
        @prev-page="handlePrevPage"
        @next-page="handleNextPage"
        @delete-student="deleteStudent"
        @view-details="viewDetails"
      />
    </div>
  </template>
  
  <script>
  import StudentTable from '@/components/StudentTable.vue';
  
  export default {
    name: 'StudentManagement',
    components: { StudentTable },
    data() {
      return {
        students: [],
        page: 1,
        limit: 10,
        search: '',
      };
    },
    methods: {
      async fetchStudents() {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`https://concentrateapi.sblearning.workers.dev/api/students?page=${this.page}&limit=${this.limit}&search=${this.search}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            this.students = data.data || [];
          } else {
            console.error('Error fetching students:', data.error);
            alert(data.error || 'Không thể tải danh sách học sinh!');
          }
        } catch (error) {
          console.error('Error fetching students:', error);
          alert('Có lỗi xảy ra khi tải danh sách học sinh!');
        }
      },
      handlePrevPage() {
        if (this.page > 1) {
          this.page--;
          this.fetchStudents();
        }
      },
      handleNextPage() {
        this.page++;
        this.fetchStudents();
      },
      async deleteStudent(id) {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`https://concentrateapi.sblearning.workers.dev/api/deletestudent/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            alert('Xóa học sinh thành công!');
            this.fetchStudents();
          } else {
            console.error('Error deleting student:', data.error);
            alert(data.error || 'Không thể xóa học sinh!');
          }
        } catch (error) {
          console.error('Error deleting student:', error);
          alert('Có lỗi xảy ra khi xóa học sinh!');
        }
      },
      viewDetails(student) {
        alert(`Chi tiết học sinh:\nTên: ${student.name}\nEmail: ${student.email}\nSố điện thoại: ${student.phone}`);
      },
    },
    mounted() {
      this.fetchStudents();
    },
  };
  </script>
  