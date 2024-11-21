<template>
  <div class="container mt-5">
    <h3>Create Class</h3>
    <form @submit.prevent="createClass">
      <!-- Dropdown chọn môn học -->
      <div class="mb-3">
        <label for="subject" class="form-label">Select Subject</label>
        <select id="subject" class="form-select" v-model="selectedSubject" required>
          <option value="" disabled>Select a subject</option>
          <option 
            v-for="subject in subjects" 
            :key="subject.subject_id" 
            :value="subject.subject_id"
          >
            {{ subject.subject_name }} ({{ subject.teacher_name }})
          </option>
        </select>
      </div>

      <!-- Nhập link Google Meet -->
      <div class="mb-3">
        <label for="googleMeetLink" class="form-label">Google Meet Link</label>
        <input 
          type="url" 
          id="googleMeetLink" 
          class="form-control" 
          v-model="googleMeetLink" 
          placeholder="Enter Google Meet Link" 
          required 
        />
      </div>

      <!-- Nút tạo lớp -->
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Class' }}
      </button>
    </form>

    <!-- Thông báo lỗi hoặc thành công -->
    <p v-if="message" class="mt-3" :class="{ 'text-success': success, 'text-danger': !success }">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjects: [], // Danh sách môn học
      selectedSubject: '', // Môn học được chọn
      googleMeetLink: '', // Link Google Meet
      loading: false, // Trạng thái đang xử lý
      message: '', // Thông báo
      success: false, // Trạng thái thành công hay thất bại
    };
  },
  created() {
    this.fetchSubjects(); // Lấy danh sách môn học khi component được tạo
  },
  methods: {
    async fetchSubjects() {
      try {
        const token = localStorage.getItem('token'); // Lấy JWT token từ localStorage
        if (!token) throw new Error('Token not found');

        // Lấy thông tin giáo viên qua token
        const teacherResponse = await fetch('https://concentrateapi.sblearning.workers.dev/api/getteacherbytoken', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const teacherData = await teacherResponse.json();
        if (!teacherData.result || teacherResponse.status !== 200) {
          throw new Error('Failed to fetch teacher data');
        }

        const teacherId = teacherData.result.id;

        // Lấy danh sách môn học của giáo viên
        const subjectsResponse = await fetch(`https://concentrateapi.sblearning.workers.dev/api/subjects?id=${teacherId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const subjectsData = await subjectsResponse.json();

        if (!subjectsData.success) {
          throw new Error('Failed to fetch subjects');
        }

        this.subjects = subjectsData.data; // Gán danh sách môn học vào data
      } catch (error) {
        console.error(error.message);
        this.message = 'Failed to load subjects. Please try again.';
        this.success = false;
      }
    },
    async createClass() {
      try {
        if (!this.selectedSubject || !this.googleMeetLink) {
          this.message = 'Please fill in all fields.';
          this.success = false;
          return;
        }

        this.loading = true;
        this.message = '';

        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        // Gửi yêu cầu tạo lớp học
        const response = await fetch('https://concentrateapi.sblearning.workers.dev/api/class/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subject_id: this.selectedSubject,
            google_meet_link: this.googleMeetLink,
          }),
        });

        const data = await response.json();
        if (response.status === 200) {
          this.message = data.message;
          this.success = true;
          this.googleMeetLink = '';
          this.selectedSubject = '';
        } else {
          throw new Error(data.error || 'Failed to create class');
        }
      } catch (error) {
        console.error(error.message);
        this.message = error.message;
        this.success = false;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
}
</style>
