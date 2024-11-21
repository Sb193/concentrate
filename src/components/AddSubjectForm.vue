<template>
    <div class="d-flex justify-content-center align-items-center">
      <div class="card shadow" style="width: 400px; padding: 20px;">
        <h3 class="text-center mb-4">Thêm Môn Học</h3>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name" class="form-label">Tên môn học</label>
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="teacher" class="form-label">Chọn giáo viên</label>
            <select
              id="teacher"
              class="form-select"
              v-model="teacherId"
            >
              <option value="" disabled>Chọn giáo viên</option>
              <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
                {{ teacher.name }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary w-100">Thêm Môn Học</button>
          <div v-if="message" :class="{'text-danger': error, 'text-success': !error}" class="mt-3">
            {{ message }}
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        teacherId: "",
        teachers: [],
        message: null,
        error: false,
      };
    },
    methods: {
      async fetchTeachers() {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("https://concentrateapi.sblearning.workers.dev/api/teachers", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const result = await response.json();
  
          if (response.ok) {
            this.teachers = result.data || [];
          } else {
            this.teachers = [];
            this.message = result.error || "Không thể tải danh sách giáo viên.";
          }
        } catch (err) {
          this.teachers = [];
          this.message = "Lỗi kết nối máy chủ.";
        }
      },
      async submitForm() {
        this.message = null;
        this.error = false;
  
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("https://concentrateapi.sblearning.workers.dev/api/subject/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: this.name,
              teacher_id: this.teacherId || null,
            }),
          });
  
          const result = await response.json();
  
          if (!response.ok) {
            this.error = true;
            this.message = result.error || "Đã xảy ra lỗi.";
            return;
          }
  
          this.message = result.message || "Thêm môn học thành công!";
          this.name = "";
          this.teacherId = "";
        } catch (err) {
          this.error = true;
          this.message = "Không thể kết nối với máy chủ.";
        }
      },
    },
    mounted() {
      this.fetchTeachers();
    },
  };
  </script>
  
  <style scoped>
  .card {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
  </style>
  