<template>
  <form class="w-50 m-auto mt-5">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label my-form-label"
        >Email address</label
      >
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="loginForm.email"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label my-form-label"
        >Password</label
      >
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="loginForm.password"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="login">
      Submit
    </button>
  </form>
</template>
<script>
import { instance } from "../axios/axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations(["setToken"]),
    async login() {
      const result = await instance.post("employees/login", this.loginForm);
      const { token } = result?.data;
      console.log(token);
      this.setToken(token);
    },
  },
};
</script>

<style>
.my-form-label {
  font-weight: bold;
}
</style>
