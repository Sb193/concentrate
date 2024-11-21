<template>

  <div class="container py-5">
    <!-- Danh sách học sinh trong lớp -->
    <div class="card mb-4">
      <div class="card-header bg-primary text-white">
        <h3 class="card-title">Danh sách học sinh trong lớp {{ selectedClass }}</h3>
      </div>
      <div class="card-body">
        <input
          type="text"
          v-model="classStudentsSearch"
          placeholder="Tìm kiếm học sinh trong lớp"
          class="form-control mb-3"
        />
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th>Mã</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in filteredClassStudents" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.phone }}</td>
              <td>
                <button
                  class="btn btn-sm btn-danger"
                  @click="removeStudentFromClass(student.id)"
                >
                  Xóa
                </button>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Nút mở pop-up -->
    <button
      @click="showAddStudentPopup"
      class="btn btn-success mb-3"
    >
      Thêm học sinh
    </button>

    <!-- Pop-up thêm học sinh -->
    <div
      v-if="this.showPopup"
      class="modal fade show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm học sinh</h5>
            <button
              type="button"
              class="btn-close"
              @click="showAddStudentPopup"
            ></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              v-model="allStudentsSearch"
              placeholder="Search students"
              class="form-control mb-3"
            />
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Số điện thoại</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in filteredAllStudents" :key="student.id">
                  <td>{{ student.id }}</td>
                  <td>{{ student.name }}</td>
                  <td>{{ student.phone }}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-primary"
                      @click="addStudentToClass(student.id)"
                    >
                      Thêm
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showAddStudentPopup()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      selectedClass: '', // Lấy từ đường dẫn
      allStudents: [],
      classStudents: [],
      allStudentsSearch: '',
      classStudentsSearch: '',
      allStudentsPage: 0,
      classStudentsPage: 0,
      hasMoreAllStudents: false,
      hasMoreClassStudents: false,
      showPopup: false,
      success: false,
      message: ''
    };
  },
  computed: {
    filteredAllStudents() {
      return this.allStudents.filter((student) =>
        student.name.toLowerCase().includes(this.allStudentsSearch.toLowerCase())
      );
    },
    filteredClassStudents() {
      return this.classStudents.filter((student) =>
        student.name.toLowerCase().includes(this.classStudentsSearch.toLowerCase())
      );
    },
  },
  methods: {
    async fetchStudents() {
      try {
        const token = localStorage.getItem('token');
        const classStudentsResponse = await fetch(
          `https://concentrateapi.sblearning.workers.dev/api/students-by-class?class_id=${this.selectedClass}&page=${this.classStudentsPage}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const classStudentsData = await classStudentsResponse.json();
        this.classStudents = classStudentsData.data;
        this.hasMoreClassStudents = classStudentsData.has_more;

        const allStudentsResponse = await fetch(
          `https://concentrateapi.sblearning.workers.dev/api/students?page=${this.allStudentsPage}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const allStudentsData = await allStudentsResponse.json();
        const alldata = allStudentsData.data;
        this.allStudents = alldata.filter(student2 =>
          !this.classStudents.some(student1 => student1.id === student2.id)
        );
        this.hasMoreAllStudents = allStudentsData.has_more;
      } catch (error) {
        console.error(error);
      }
    },
    async addStudentToClass(student_id) {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');
        console.log(student_id)

        const response = await fetch('https://concentrateapi.sblearning.workers.dev/api/joinStudent', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ class_id: this.selectedClass, student_id: student_id , status: true }),
        });

        const result = await response.json();
        if (!result.success) {
          this.message = 'Học sinh đã có trong class.';
          this.success = false;
        } else {
          this.message = 'Thêm học sinh thành công.';
          this.success = true;
          this.fetchStudents(); // Cập nhật danh sách học sinh
        }
      } catch (error) {
        console.error(error.message);
        this.message = 'Lỗi khi thêm học sinh!';
        this.success = false;
      }

      alert(this.message)
      
    },
    async removeStudentFromClass(student_id) {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await fetch(
          `https://concentrateapi.sblearning.workers.dev/api/student-class`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              class_id: this.selectedClass,
              student_id: student_id,
            }),
          }
        );

        const result = await response.json();
        if (!result.success) {
          this.message = 'Không thể xóa học sinh khỏi lớp.';
          this.success = false;
        } else {
          this.message = 'Xóa học sinh thành công.';
          this.success = true;
          this.fetchStudents(); // Cập nhật danh sách học sinh sau khi xóa
        }
      } catch (error) {
        console.error(error.message);
        this.message = 'Lỗi khi xóa học sinh!';
        this.success = false;
      }

      alert(this.message);
    },

    showAddStudentPopup() {
      this.showPopup = !this.showPopup;
      console.log(this.showPopup)
    },
    closePopup() {
      this.showPopup = false;
    },
    nextAllPage() {
      this.allStudentsPage++;
      this.fetchStudents();
    },
    prevAllPage() {
      this.allStudentsPage--;
      this.fetchStudents();
    },
    nextClassPage() {
      this.classStudentsPage++;
      this.fetchStudents();
    },
    prevClassPage() {
      this.classStudentsPage--;
      this.fetchStudents();
    },
    searchAllStudents() {
      this.allStudentsPage = 1;
      this.fetchStudents();
    },
    searchClassStudents() {
      this.classStudentsPage = 1;
      this.fetchStudents();
    },
  },
  mounted() {
    this.selectedClass = this.$route.params.class_id;
    if (this.selectedClass) {
      this.fetchStudents();
      console.log(this.selectedClass)
    }
  },
};
</script>

<style scoped>
.modal.show {
  display: block;
}

</style>
