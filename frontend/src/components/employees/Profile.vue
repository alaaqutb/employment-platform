<template>
  <div class="container p-5 d-flex" v-if="employee">
    <div class="card w-25 mx-3" style="width: 18rem">
      <img class="card-img-top" src="/profile.jpg" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">{{ employee.name }}</h5>
        <p class="card-text">
          {{ employee.bio_text }}
        </p>
      </div>
    </div>
    <div class="card w-75 p-5 mx-3" style="width: 18rem">
      <table class="table m-auto">
        <tbody>
          <tr>
            <th scope="row">Email</th>
            <td>{{ employee.email }}</td>
          </tr>
          <tr>
            <th scope="row">City</th>
            <td>{{ employee.city }}</td>
          </tr>
          <tr>
            <th scope="row">Skills</th>
            <td>{{ employee.skills }}</td>
          </tr>
          <tr>
            <th scope="row">Level</th>
            <td>{{ employee.experience_level }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      id: "",
      employee: null,
    };
  },
  methods: {},
  created: async function () {
    try {
      let token = localStorage.getItem("token");
      let url;
      if (this.$route.name === 'employee') {
        this.id = this.$route.params.id;
        url = `/employees/${this.id}`;
      } else if (this.$route.name === 'profile') {
        url = `/profile`;
      }
      const result = await instance.get(url, {
        headers: { authorization: token },
      });
      this.employee = result.data ? result.data.data : {};
    } catch (err) {
      this.employee = null;
    }
  },
};
</script>
<style scoped>
.text-bold {
  font-weight: bold;
}
</style>
