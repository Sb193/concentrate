import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from '../views/RegisterPage.vue';
import LoginPage from '../views/LoginPage.vue';
import AddTeacherPage from '../views/AddTeacherPage.vue';
import AddStudentPage from '../views/AddStudentPage.vue'
import AddSubjectPage from '../views/AddSubjectPage.vue'
import CreateClassPage from '../views/CreateClassPage.vue';
import JoinStudentPage from '../views/JoinStudentPage.vue';
import AnalysisClassPage from "../views/AnalysisClassPage.vue";
import StudentDetailPage from '../views/StudentDetailPage.vue'
import HomePage from '../views/HomePage.vue'
import ClassListPage from '../views/ClassListPage.vue'
import TeacherListPage from '@/views/TeacherListPage.vue'
import StudentListPage from '@/views/StudentListPage.vue'
import SubjectListPage from '@/views/SubjectListPage.vue'
import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home',component: HomePage , meta: {requiresAuth: true}},
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/class/:classId', name: "AnalysisClassPage", component: AnalysisClassPage, meta: {requiresAuth: true}},
  {
    path: "/student/detail",
    name: "StudentDetailPage",
    component: StudentDetailPage,
    props: true, 
    meta: { requiresAuth: true }
  },
  {
    path: "/teacher",
    name: "TeacherListPage",
    component: TeacherListPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/student",
    name: "StudentListPage",
    component: StudentListPage,
    meta: { requiresAuth: true }
  },
  { path: '/add-teacher', component: AddTeacherPage, meta: { requiresAuth: true } },
  { path: '/add-subject', component: AddSubjectPage, meta: { requiresAuth: true } },
  { path: '/add-student', component: AddStudentPage, meta: { requiresAuth: true } },
  { path: '/join-student/:class_id', component: JoinStudentPage, meta: { requiresAuth: true } },
  { path: '/create-class', component: CreateClassPage, meta: { requiresAuth: true } },
  {
    path: '/class',
    name: 'ClassListPage',
    component: ClassListPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/subject',
    name: 'SubjectListPage',
    component: SubjectListPage,
    meta: { requiresAuth: true},
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
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
      next();
    }
  } else {
    next();
  }
});

export default router;
