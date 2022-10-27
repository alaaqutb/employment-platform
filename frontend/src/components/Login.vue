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
    <div class="mb-3 d-flex justify-content-center">
      <button
        type="submit"
        class="btn btn-primary w-25 m-2"
        @click.prevent="adminLogin"
      >
        Login As Admin
      </button>
      <button
        type="submit"
        class="btn btn-primary w-25 m-2"
        @click.prevent="userLogin"
      >
        Login As User
      </button>
    </div>
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
    ...mapMutations(["setUser", "setToken"]),
    async userLogin() {
      try {
        const result = await instance.post("employees/login", this.loginForm);
        const { token } = result?.data;
        console.log(this.setToken);
        // this.setUser(user);
        this.setToken(token);
        alert(result.data.message);
        if (token) {
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err.stack);
      }
    },
    async adminLogin() {
      try {
        const result = await instance.post("employers/login", this.loginForm);
        const { token } = result?.data;
        alert(result.data.message);
        if (token) {
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err.stack);
      }
    },
  }
};
</script>

<style>
.my-form-label {
  font-weight: bold;
}
</style>
