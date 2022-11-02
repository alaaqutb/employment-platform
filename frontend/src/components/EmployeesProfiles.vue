<template>
  <div class="container p-5">
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
</template>
<script>
import { instance } from "../axios/axios";
export default {
  data() {
    return {
      employees: [],
    };
  },
  methods: {},
  created: async function () {
    const result = await instance.get("/employees", {});
    this.employees = result.data.data;
  },
};
</script>

<style></style>
