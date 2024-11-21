<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div class="text-center">
        <h1 class="display-1 fw-bold text-danger">404</h1>
        <p class="lead">Ối! Trang bạn đang tìm kiếm không tồn tại.</p>
        <p>Trang có thể đã được di chuyển hoặc xóa. Vui lòng kiểm tra URL hoặc quay lại trang chủ.</p>
        <router-link to="/" class="btn btn-primary btn-lg mt-3">Trở về trang chủ</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  /* Optional: Style to make sure the 404 page is centered */
  .container-fluid {
    background-color: #f8f9fa;
  }
  
  h1 {
    font-size: 6rem;
  }
  
  p {
    font-size: 1.25rem;
  }
  
  .router-link {
    text-decoration: none;
  }
  </style>
  