<template>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" v-model="username" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async register() {
        const response = await fetch('YOUR_API_BASE_URL/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        const result = await response.json();
        alert(result.message);
      }
    }
  };
  </script>
  