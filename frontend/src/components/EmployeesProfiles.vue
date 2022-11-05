<template>
  <div class="container p-5 wrapper" v-if="employees">
    <nav aria-label="Page navigation example mx-auto">
      <ul class="pagination">
        <!-- <li class="page-item"><span class="page-link cursor-pointer">Previous</span></li> -->
        <li class="page-item" @click="getEmployees(1)"><span class="page-link cursor-pointer">1</span></li>
        <li class="page-item" @click="getEmployees(2)"><span class="page-link cursor-pointer">2</span></li>
        <li class="page-item" @click="getEmployees(3)"><span class="page-link cursor-pointer">3</span></li>
        <!-- <li class="page-item"><span class="page-link cursor-pointer">Next</span></li> -->
      </ul>
    </nav>
    <div class="row d-flex">
      <div
        class="list-group p-2 w-75 m-auto bg-dark text-white"
        v-for="employee in employees"
        :key="employee.id"
      >
        <RouterLink
          :to="{ path: `/employees/${employee.id}` }"
          class="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div class="d-flex w-100 justify-content-between">
            <label
              ><span class="fw-bold">Name: </span> {{ employee.name }}
            </label>
          </div>
          <p class="mb-1">
            <span class="fw-bold">City: </span> {{ employee.city }}
          </p>
          <p class="mb-1">
            <span class="fw-bold">Email: </span> {{ employee.email }}
          </p>
          <p class="mb-1">
            <span class="fw-bold">Skills: </span> {{ employee.skills }}
          </p>
          <p class="mb-1">
            <span class="fw-bold">Experience Level: </span>
            {{ employee.experience_level }}
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
  <div v-else>Not Found!</div>
</template>
<script>
import { instance } from "../axios/axios";
import { store } from "../axios/store";
export default {
  data() {
    return {
      employees: [],
      pageNumber: 1,
    };
  },
  methods: {
    async getEmployees(number) {
      let token = localStorage.getItem("token");
    const result = await instance.get(`/employees?page=${number}`, {
      headers: { authorization: token },
    });
    this.employees = result.data.data;
    }
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
