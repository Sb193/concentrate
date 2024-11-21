<template>
    <div class="container mt-4">

        <div class="card shadow">
            <div class="card-header d-flex justify-content-between align-item-center">
                <h2 class="mb-4">Quản lý lớp</h2>
                <button type="button" class="btn btn-success">
                    <router-link class="nav-link" to="/create-class">Thêm</router-link>
                </button>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Môn</th>
                        <th>Giảng Viên</th>
                        <th>Thời Gian Bắt Đầu</th>
                        <th>Thời Gian Kết Thúc</th>
                        <th>Link Google Meet</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="classItem in classes" :key="classItem.id">
                        <td>{{ classItem.id }}</td>
                        <td>{{ classItem.subject_name }}</td>
                        <td>{{ classItem.name }}</td>
                        <td>{{ formatTime(classItem.start_time) }}</td>
                        <td>{{ formatTime(classItem.end_time) }}</td>
                        <td>
                        <a :href="classItem.google_meet_link" target="_blank" class="btn btn-link">Tham gia Google Meet</a>
                        </td>
                        <td>
                          <button @click="goToClassPage(classItem.id)" class="btn btn-primary btn-sm">Chi tiết</button>
                          <button @click="goToStudentList(classItem.id)" class="btn btn-warning btn-sm">Danh sách</button>
                          <button @click="deleteClass(classItem.id)" class="btn btn-danger btn-sm">Xóa</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
      
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        classes: [], // Dữ liệu lớp sẽ lưu ở đây
      };
    },
    created() {
      // Gửi API khi trang được tạo
      this.fetchClasses();
    },
    methods: {
      // Fetch dữ liệu từ API
      async fetchClasses() {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('Token not found');

          const response = await fetch('https://concentrateapi.sblearning.workers.dev/api/getteacherbytoken', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await response.json();
          if (!data.result) throw new Error('Failed to fetch teacher data');

          const teacherId = data.result.id;
          const classesResponse = await fetch(`https://concentrateapi.sblearning.workers.dev/api/classbyteacher?teacher_id=${teacherId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const classesData = await classesResponse.json();
          if (!classesData.success) throw new Error('Failed to fetch classes');

          this.classes = classesData.data;
        } catch (error) {
          console.error(error.message);
          this.message = error.message;
          this.success = false;
        }
      },
      // Chuyển hướng đến trang AnalysisClassPage
      goToClassPage(classId) {
        this.$router.push({ name: 'AnalysisClassPage', params: { classId } });
      },
      // Chuyển hướng đến trang danh sách sinh viên
      goToStudentList(classId) {
        this.$router.push({ path: `/join-student/${classId}` });
      },
      // Gửi API xóa lớp học
      async deleteClass(classId) {
        if (confirm('Bạn có chắc chắn muốn xóa lớp học này không?')) {
          try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');

            const response = await fetch(`https://concentrateapi.sblearning.workers.dev/api/class/${classId}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            });

            const result = await response.json();
            if (result.success) {
              alert('Xóa lớp học thành công!');
              this.fetchClasses(); // Tải lại danh sách lớp học
            } else {
              throw new Error(result.message || 'Xóa lớp học thất bại!');
            }
          } catch (error) {
            alert(error.message);
          }
        }
      },
      // Hàm chuyển đổi thời gian từ timestamp
      formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Định dạng thời gian theo ý muốn
      },
    },
  };
  </script>
  
  <style scoped>
  /* Các style tùy chỉnh nếu cần */
  table {
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  