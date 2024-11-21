<template>
    <div class="container mt-4">
      <h2 class="mb-3">Quản lý môn học</h2>
  
      <!-- Nút thêm môn học -->
      <button  class="btn btn-primary mb-3">
        <router-link class="nav-link" to="/add-subject">Thêm</router-link>
      </button>
  
      <!-- Ô tìm kiếm -->
      <input
        v-model="search"
        @input="fetchSubjects"
        class="form-control mb-3"
        type="text"
        placeholder="Tìm kiếm môn học..."
      />
  
      <!-- Bảng danh sách môn học -->
      <SubjectTable
        :Subjects="Subjects"
        :page="page"
        @prev-page="handlePrevPage"
        @next-page="handleNextPage"
        @delete-Subject="deleteSubject"
        @view-details="viewDetails"
      />
    </div>
  </template>
  
  <script>
  import SubjectTable from '@/components/SubjectTable.vue';
  
  export default {
    name: 'SubjectManagement',
    components: { SubjectTable },
    data() {
      return {
        Subjects: [],
        page: 1,
        limit: 10,
        search: '',
      };
    },
    methods: {
      async fetchSubjects() {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`https://concentrateapi.sblearning.workers.dev/api/subjects?page=${this.page}&limit=${this.limit}&search=${this.search}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            this.Subjects = data.data || [];
          } else {
            console.error('Error fetching Subjects:', data.error);
            alert(data.error || 'Không thể tải danh sách môn học!');
          }
        } catch (error) {
          console.error('Error fetching Subjects:', error);
          alert('Có lỗi xảy ra khi tải danh sách môn học!');
        }
      },
      handlePrevPage() {
        if (this.page > 1) {
          this.page--;
          this.fetchSubjects();
        }
      },
      handleNextPage() {
        this.page++;
        this.fetchSubjects();
      },
      async deleteSubject(id) {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`https://concentrateapi.sblearning.workers.dev/api/subject/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            alert('Xóa môn học thành công!');
            this.fetchSubjects();
          } else {
            console.error('Error deleting Subject:', data.error);
            alert(data.error || 'Không thể xóa môn học!');
          }
        } catch (error) {
          console.error('Error deleting Subject:', error);
          alert('Có lỗi xảy ra khi xóa môn học!');
        }
      },
      viewDetails(Subject) {
        alert(`Chi tiết môn học:\nTên: ${Subject.subject_name}\nGiáo viên phụ trách: ${Subject.teacher_name}`);
      },
    },
    mounted() {
      this.fetchSubjects();
    },
  };
  </script>
  