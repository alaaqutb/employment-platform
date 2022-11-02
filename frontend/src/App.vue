<template>
  <div>
    <HeaderComponent/>
    <RouterView/>
  </div>
</template>

<script>
import HeaderComponent from "./components/Header.vue";
import LoginComponent from "./components/Login.vue";
import RegisterComponent from "./components/Register.vue";
import HomeComponent from "./components/Home.vue";
import { RouterView } from "vue-router";
import CreateJob from './components/job/CreateJob.vue';
import EmployeesProfilesVue from "./components/EmployeesProfiles.vue";
import EmployeeProfile from "./components/Profile.vue";

export default {
//   data() {
//     return {
//         //
//     };
//   },
//   methods: {
//     //
//   },
  components: {
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreateJob,
    EmployeesProfilesVue,
    EmployeeProfile
  },
};
</script>

<style></style>
