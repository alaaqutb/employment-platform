<template>
  <div>
    <notifications position="bottom right"/>
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
import EmployeesListVue from "./components/employees/EmployeesList.vue";
import EmployeeProfile from "./components/employees/Profile.vue";
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
    EmployeesListVue,
    EmployeeProfile,
    SearchComponent,
    NotFoundComponent,
  },
};
</script>

<style>
body {
  background-color: lightgray;
}
.components-wrapper {
  margin: 13px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 10px;
}
</style>
