<template>
  <div class="container p-5 wrapper">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">City</th>
          <th scope="col">Email</th>
          <th scope="col">Skills</th>
          <th scope="col">Level</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="employee in employees"
          :key="employee.id"
          class="cursor-pointer"
        >
          <th scope="row"></th>
          <td>{{ employee.name }}</td>
          <td>{{ employee.city }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.skills }}</td>
          <td>{{ employee.experience_level }}</td>
          <td>{{ employee.status }}</td>
          <td>
            <button
              v-if="employee.status === 'pending'"
              type="button"
              class="btn btn-outline-success mx-2"
              @click="approveEmployee(employee.id)"
            >
              Approve
            </button>
            <button
              v-if="employee.status === 'pending'"
              type="button"
              class="btn btn-outline-danger mx-2"
              @click="rejectEmployee(employee.id)"
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { instance } from "./../../axios/axios";
import { notify } from "@kyvg/vue3-notification";
export default {
  data: () => {
    return {
      employees: null,
    };
  },
  methods: {
    async approveEmployee(id) {
      this.id = this.$route.params.id;
      const token = localStorage.getItem("token");
      const result = await instance.post(
        `/jobs/${this.id}/employees/${id}?status=accepted`,
        {},
        { headers: { authorization: token } }
      );
      if (result) {
        notify({
          title: result.data.message,
        });
      }
    },
    async rejectEmployee(id) {
      this.id = this.$route.params.id;
      const token = localStorage.getItem("token");
      const result = await instance.post(
        `/jobs/${this.id}/employees/${id}?status=rejected`,
        {},
        { headers: { authorization: token } }
      );
      if (result) {
        notify({
          title: result.data.message,
        });
      }
    },
  },
  created: async function () {
    const token = localStorage.getItem("token");
    this.id = this.$route.params.id;
    const employees = await instance.get(`/jobs/${this.id}/employees`, {
      headers: { authorization: token },
    });
    this.employees = employees.data ? employees.data.data : {};
  },
};
</script>
<style scoped></style>
