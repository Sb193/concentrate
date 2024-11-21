<template>
    <div class="container mt-4">
      <h1 class="text-center">Thống Kê Lớp Học</h1>
      <StudentTable :students="students" :classId="classId" v-if="students.length > 0" />
      <div v-else class="text-center mt-5">
        <p class="text-muted">Không có dữ liệu học sinh trong lớp này.</p>
      </div>
    </div>
  </template>
  
  <script>
  import StudentTable from "../components/StudentAnalysisTable.vue";
  
  export default {
    components: { StudentTable },
    data() {
      return {
        students: [],
        classId: this.$route.params.classId,
      };
    },
    created() {
      this.fetchClassData();
    },
    methods: {
      async fetchClassData() {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`https://concentrateapi.sblearning.workers.dev/api/classStudents/${this.classId}`,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this.students = data.students || [];
        } catch (error) {
          console.error("Error fetching class data:", error);
        }
      },
    },
  };
  </script>
  