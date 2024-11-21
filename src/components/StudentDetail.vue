<template>
    <div class="container mt-4">
      <!-- Thông tin học sinh -->
      <div class="card mb-4">
        <div class="card-header">
          <h3>Thông Tin Học Sinh</h3>
        </div>
        <div class="card-body">
          <p><strong>Tên:</strong> {{ student.student_name }}</p>
          <p><strong>Email:</strong> {{ student.student_email }}</p>
          <p><strong>Điện thoại:</strong> {{ student.student_phone }}</p>
        </div>
      </div>
  
      <!-- Biểu đồ tập trung -->
      <div class="card">
        <div class="card-header">
          <h3>Biểu Đồ Tập Trung</h3>
        </div>
        <div class="card-body">
          <canvas id="concentrationChart"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart } from "chart.js/auto";
  
  export default {
    data() {
      return {
        student: {},
        concentrationRecords: [],
        studentId: this.$route.query.student_id || null,
        classId: this.$route.query.class_id || null,
        chart: null,
      };
    },
    methods: {
      async fetchStudentData() {
        try {
            const token = localStorage.getItem("token");
          const response = await fetch(
            `https://concentrateapi.sblearning.workers.dev/api/class/${this.classId}/student/${this.studentId}`,
            {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },}
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this.student = data.student;
          this.concentrationRecords = data.concentration_records;
  
          this.renderChart(); // Gọi hàm vẽ biểu đồ sau khi nhận dữ liệu
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      },
      renderChart() {
        const labels = this.concentrationRecords.map((record) =>
          new Date(record.recorded_at).toLocaleTimeString()
        );
        const data = this.concentrationRecords.map(
          (record) => record.concentration_level
        );
  
        // Tạo biểu đồ bằng Chart.js
        const ctx = document.getElementById("concentrationChart").getContext("2d");
        if (this.chart) {
          this.chart.destroy(); // Hủy biểu đồ cũ nếu đã tồn tại
        }
        this.chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Mức Độ Tập Trung",
                data: data,
                borderColor: "#4caf50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                borderWidth: 2,
                pointBackgroundColor: "#4caf50",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Thời Gian",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Mức Độ Tập Trung",
                },
                beginAtZero: true,
                max: 100,
              },
            },
          },
        });
      },
    },
    mounted() {
      this.fetchStudentData();
    },
  };
  </script>
  
  <style scoped>
  .card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .card-header {
    background-color: #007bff;
    color: white;
    font-size: 18px;
  }
  
  .card-body {
    font-size: 16px;
  }
  
  canvas {
    max-width: 100%;
    height: 400px;
  }
  </style>
  