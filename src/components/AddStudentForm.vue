<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow" style="width: 400px; padding: 20px;">
        <h3 class="text-center mb-4">Thêm Học Sinh</h3>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="username" class="form-label">Tên tài khoản</label>
            <input
              type="text"
              id="username"
              class="form-control"
              v-model="username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mật khẩu</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
              required
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Họ và tên</label>
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              class="form-control"
              v-model="phone"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Thêm Học Sinh</button>
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
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        message: null,
        error: false,
      };
    },
    methods: {
      async submitForm() {
        this.message = null;
        this.error = false;
  
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("https://concentrateapi.sblearning.workers.dev/api/student/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
              name: this.name,
              email: this.email,
              phone: this.phone,
            }),
          });
  
          const result = await response.json();
  
          if (!response.ok) {
            this.error = true;
            this.message = result.error || "Đã xảy ra lỗi.";
            return;
          }
  
          this.message = result.message || "Thêm học sinh thành công!";
          this.username = "";
          this.password = "";
          this.name = "";
          this.email = "";
          this.phone = "";
        } catch (err) {
          this.error = true;
          this.message = "Không thể kết nối với máy chủ.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
  </style>
  