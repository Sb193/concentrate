<template>
    <div class="container mt-4">
      <h2 class="mb-3">Quản lý giáo viên</h2>
  
      <!-- Nút thêm giáo viên -->
      <button class="btn btn-primary mb-3">
        <router-link class="nav-link" to="/add-teacher">Thêm</router-link>
      </button>
  
      <!-- Ô tìm kiếm -->
      <input
        v-model="search"
        @input="fetchTeachers"
        class="form-control mb-3"
        type="text"
        placeholder="Tìm kiếm giáo viên..."
      />
  
      <!-- Bảng danh sách giáo viên -->
      <TeacherTable
        :teachers="teachers"
        :page="page"
        @prev-page="handlePrevPage"
        @next-page="handleNextPage"
        @delete-teacher="deleteTeacher"
        @view-details="viewDetails"
      />
    </div>
  </template>
  
  <script>
  import TeacherTable from '@/components/TeacherTable.vue';
  
  export default {
    name: 'TeacherManagement',
    components: { TeacherTable },
    data() {
      return {
        teachers: [],
        page: 1,
        limit: 10,
        search: '',
      };
    },
    methods: {
      async fetchTeachers() {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`https://concentrateapi.sblearning.workers.dev/api/teachers?page=${this.page}&limit=${this.limit}&search=${this.search}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            this.teachers = data.data || [];
          } else {
            console.error('Error fetching teachers:', data.error);
            alert(data.error || 'Không thể tải danh sách giáo viên!');
          }
        } catch (error) {
          console.error('Error fetching teachers:', error);
          alert('Có lỗi xảy ra khi tải danh sách giáo viên!');
        }
      },
      handlePrevPage() {
        if (this.page > 1) {
          this.page--;
          this.fetchTeachers();
        }
      },
      handleNextPage() {
        this.page++;
        this.fetchTeachers();
      },
      async deleteTeacher(id) {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`https://concentrateapi.sblearning.workers.dev/api/deleteteacher/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            alert('Xóa giáo viên thành công!');
            this.fetchTeachers();
          } else {
            console.error('Error deleting teacher:', data.error);
            alert(data.error || 'Không thể xóa giáo viên!');
          }
        } catch (error) {
          console.error('Error deleting teacher:', error);
          alert('Có lỗi xảy ra khi xóa giáo viên!');
        }
      },
      viewDetails(teacher) {
        alert(`Chi tiết giáo viên:\nTên: ${teacher.name}\nEmail: ${teacher.email}\nSố điện thoại: ${teacher.phone}`);
      },
      async addTeacher() {
        
      },
    },
    mounted() {
      this.fetchTeachers();
    },
  };
  </script>
  