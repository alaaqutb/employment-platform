<template>
  <div class="container p-5 wrapper" v-if="employees">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">City</th>
          <th scope="col">Email</th>
          <th scope="col">Skills</th>
          <th scope="col">Level</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(employee, index) in employees"
          :key="employee.id"
          class="cursor-pointer"
          @click="goToEmployeeProfile(employee.id)"
        >
          <th scope="row">{{ (pageNumber - 1) * 10 + index + 1 }}</th>
          <td>{{ employee.name }}</td>
          <td>{{ employee.city }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.skills }}</td>
          <td>{{ employee.experience_level }}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example mx-auto">
      <ul class="pagination">
        <li
          class="page-item"
          v-for="index in pages"
          :key="index"
          @click="getEmployees(index)"
        >
          <span class="page-link cursor-pointer">{{ index }}</span>
        </li>
      </ul>
    </nav>
  </div>
  <div v-else style="text-align: center;">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
<script>
import { instance } from "../../axios/axios";

export default {
  data() {
    return {
      employees: null,
      pageNumber: 1,
      totalCount: 0,
      pages: 0,
    };
  },
  methods: {
    async getEmployees(number) {
      try {
        this.pageNumber = number;
        let token = localStorage.getItem("token");
        const result = await instance.get(`/employees?page=${number}`, {
          headers: { authorization: token },
        });
        this.employees = result.data.data;
        this.totalCount = result.data.totalCount;
        this.pages =
          this.totalCount / 10 > parseInt(this.totalCount / 10)
            ? parseInt(this.totalCount / 10) + 1
            : parseInt(this.totalCount / 10);
      } catch (err) {
        this.employees = null;
        this.totalCount = null;
      }
    },
    goToEmployeeProfile(employeeId) {
      this.$router.push(`/employees/${employeeId}`);
    },
  },
  created: async function () {
    this.getEmployees(this.pageNumber);
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
