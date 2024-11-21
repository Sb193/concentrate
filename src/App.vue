<template>
  <div>
    <nav v-if="isAuthenticated" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/home">
          <img src="@/assets/logo.png" width="60px" alt="">
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li v-if="isAuthor" class="nav-item">
              <router-link class="nav-link" to="/teacher">Giáo viên</router-link>
            </li>
            <li v-if="isAuthor" class="nav-item">
              <router-link class="nav-link" to="/student">Học sinh</router-link>
            </li>
            <li v-if="isAuthor" class="nav-item">
              <router-link class="nav-link" to="/subject">Môn học</router-link>
            </li>
            <li v-if="!isAuthor"  class="nav-item">
              <router-link class="nav-link" to="/class">Quản lý lớp</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout">Đăng xuất</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token'); // Kiểm tra token có trong localStorage không
    },
    isAuthor() {
      return localStorage.getItem('role') === "admin"; // Kiểm tra token có trong localStorage không
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token'); // Xóa token khi đăng xuất
      localStorage.removeItem('role')
      this.$router.push('/login'); // Chuyển về trang đăng nhập
    }
  },
};
</script>
