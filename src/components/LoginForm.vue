<template>


    <div class="container mt-5">
      <div class="card mx-auto p-4 shadow">
        <h3 class="text-center mb-4">Đăng nhập</h3>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Tài khoản</label>
            <input
              type="text"
              id="username"
              class="form-control shadow"
              v-model="username"
              placeholder="Nhập tài khoản của bạn..."
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mật khẩu</label>
            <input
              type="password"
              id="password"
              class="form-control shadow"
              v-model="password"
              placeholder="Nhập mật khẩu của bạn..."
              required
            />
          </div>
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <button type="submit" class="btn shadow btn-primary w-100">Login</button>
          
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async login() {
        this.error = null;
        try {
          const response = await fetch('https://concentrateapi.sblearning.workers.dev/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            this.error = errorData.error || 'Invalid credentials';
            return;
          }
  
          const data = await response.json();
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          window.location.href = '/home'
        } catch (error) {
          this.error = 'An error occurred. Please try again later.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
  }
  
  .text-center {
    font-size: 1.5rem;
  }
  </style>
  