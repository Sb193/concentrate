import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from '../views/RegisterPage.vue';
import LoginPage from '../views/LoginPage.vue';
import AddTeacherPage from '../views/AddTeacherPage.vue';
import CreateClassPage from '../views/CreateClassPage.vue';
import RecordConcentrationPage from '../views/RecordConcentrationPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/add-teacher', component: AddTeacherPage, meta: { requiresAuth: true } },
  { path: '/create-class', component: CreateClassPage, meta: { requiresAuth: true } },
  { path: '/record-concentration', component: RecordConcentrationPage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard để kiểm tra quyền truy cập
router.beforeEach((to, from, next) => {
  // Kiểm tra nếu route yêu cầu đăng nhập
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      // Nếu không có token, chuyển hướng đến trang đăng nhập
      next('/login');
    } else {
      // Nếu có token, cho phép truy cập
      next();
    }
  } else {
    // Nếu route không yêu cầu đăng nhập, cho phép truy cập
    next();
  }
});

export default router;
