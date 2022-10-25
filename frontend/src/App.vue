<template>
  <HeaderComponent></HeaderComponent>
  <!-- <HomeComponent></HomeComponent>
    <RegisterComponent></RegisterComponent>
    <LoginComponent></LoginComponent> -->
    <!-- <CreateJob></CreateJob> -->
  <RouterView />
</template>

<script>
import HeaderComponent from "./components/Header.vue";
import LoginComponent from "./components/Login.vue";
import RegisterComponent from "./components/Register.vue";
import HomeComponent from "./components/Home.vue";
import { RouterView } from "vue-router";
import CreateJob from './components/job/CreateJob.vue';

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
    CreateJob
  },
};
</script>

<style></style>
