<template>
  <div>
    <nav v-if="isAuthenticated" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Quản lý học sinh</a>
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
            <li class="nav-item">
              <router-link class="nav-link" to="/add-teacher">Add Teacher</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/create-class">Create Class</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/record-concentration">Record Concentration</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout">Logout</a>
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
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token'); // Xóa token khi đăng xuất
      this.$router.push('/login'); // Chuyển về trang đăng nhập
    }
  },
};
</script>
