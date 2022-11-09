<template>
  <div>
    <HeaderComponent />
    <div class="components-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import HeaderComponent from "./components/Header.vue";
import LoginComponent from "./components/Login.vue";
import RegisterComponent from "./components/Register.vue";
import HomeComponent from "./components/Home.vue";
import CreateJob from "./components/job/CreateJob.vue";
import EmployeesProfilesVue from "./components/EmployeesProfiles.vue";
import EmployeeProfile from "./components/Profile.vue";
import SearchComponent from "./components/SearchComponent.vue";
import NotFoundComponent from "./components/NotFoundComponent.vue";

export default {
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
  components: {
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreateJob,
    EmployeesProfilesVue,
    EmployeeProfile,
    SearchComponent,
    NotFoundComponent
  },
};
</script>

<style>
body {
  background-color: lightgray;
}
.components-wrapper {
  /* height: 100px; */
  margin: 8px;
  background-color: white;
  border-radius: 5px;
}
</style>
