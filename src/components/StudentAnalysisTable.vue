<template>
    <div>
      <table class="table table-bordered table-striped">
        <thead class="table-primary">
          <tr>
            <th>#</th>
            <th>Tên Học Sinh</th>
            <th>Email</th>
            <th>Số Điện Thoại</th>
            <th>Thời Gian Tham Gia (Phút)</th>
            <th>Tỷ Lệ Tập Trung Trung Bình</th>
            <th>Tỷ Lệ Tham Gia (%)</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.student_id">
            <td>{{ index + 1 }}</td>
            <td>{{ student.student_name }}</td>
            <td>{{ student.student_email }}</td>
            <td>{{ student.student_phone }}</td>
            <td>{{ student.minutes_participated }}</td>
            <td>{{ student.avg_concentration ?? "Chưa có dữ liệu" }}</td>
            <td>{{ student.participation_percentage }}</td>
            <td>
              <span
                :class="student.avg_concentration === null ? 'text-danger' : 'text-success'"
              >
                {{ student.avg_concentration === null ? "Không tham gia" : "Có tham gia" }}
              </span>
            </td>
            <td>
              <button
                class="btn btn-info btn-sm"
                @click="viewDetails(student.student_id)"
              >
                Chi Tiết
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      students: {
        type: Array,
        required: true,
      },
      classId: {
        type: Number,
        required: true,
      },
    },
    methods: {
      viewDetails(studentId) {
        this.$router.push({
            name: "StudentDetailPage",
            query: { student_id: studentId, class_id: this.classId },
        });
      },
    },
  };
  </script>
  