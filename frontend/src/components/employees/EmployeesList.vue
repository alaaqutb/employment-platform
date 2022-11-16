<template>
  <div class="container p-5 wrapper" v-if="employees">
    <div class="container-fluid w-50">
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="keyword"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          @click.prevent="sendSearchRequest()"
        >
          Search
        </button>
      </form>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">result:</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ul class="list-group m-3" v-for="item in result" :key="item.id">
              <li class="list-group-item">Name: {{ item.name }}</li>
              <li class="list-group-item">City: {{ item.city }}</li>
              <li class="list-group-item">Email: {{ item.email }}</li>
              <li class="list-group-item">Skills: {{ item.skills }}</li>
              <li class="list-group-item">
                Level: {{ item.experience_level }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <form class="form-inline d-flex">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button class="btn btn-outline-secondary my-2 my-sm-0 m-2" type="submit">
        Search
      </button>
    </form> -->
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
  <div v-else style="text-align: center">
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
      keyword: "",
      result: [],
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
    async sendSearchRequest() {
      //this.keyword = this.$route.query.keyword;
      const token = localStorage.getItem("token");
      //console.log(this.url);
      const result = await instance.get(
        `/employees/name?name=${this.keyword}`,
        {
          headers: { authorization: token },
        }
      );
      console.log(result);
      this.result = result.data.data;
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
