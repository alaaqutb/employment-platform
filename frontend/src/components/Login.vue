<template>
  <form class="w-75 m-auto p-5">
    <div class="mb-3">
      <label class="form-label my-form-label">Email address</label>
      <input
        @blur="validateEmail()"
        type="email"
        class="form-control"
        :class="invalidEmail"
        aria-describedby="emailHelp"
        v-model="loginForm.email"
      />
      <div class="invalid-feedback">Invalid Email</div>
      <!-- <div class="valid-feedback">valid Email!</div> -->
    </div>
    <div class="mb-3">
      <label class="form-label my-form-label">Password</label>
      <input
        @blur="validatePassword()"
        type="password"
        class="form-control"
        :class="invalidPassword"
        v-model="loginForm.password"
      />
      <div class="invalid-feedback">Invalid Password</div>
      <!-- <div class="valid-feedback">valid Password!</div> -->
    </div>
    <div class="mb-3 d-flex justify-content-center">
      <button
        type="submit"
        class="btn btn-primary w-25 m-2"
        @click.prevent="adminLogin"
        :disabled="invalidPassword.length || invalidEmail.length"
      >
        Login As Admin
      </button>
      <button
        type="submit"
        class="btn btn-primary w-25 m-2"
        @click.prevent="userLogin"
        :disabled="invalidPassword.length || invalidEmail.length"
      >
        Login As User
      </button>
    </div>
    <p class="text-center">
      Don't have an account? <RouterLink to="/register">Sign up</RouterLink>
    </p>
  </form>
</template>
<script>
import { instance } from "../axios/axios";
import { notify } from "@kyvg/vue3-notification";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      invalidEmail: "",
      invalidPassword: "",
    };
  },
  created() {
    //
  },
  methods: {
    async userLogin() {
      try {
        const result = await instance.post("employees/login", this.loginForm);
        const { token } = result?.data;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("email", this.loginForm.email);
          localStorage.setItem("isAdmin", false);
          notify({
            title: result.data.message,
            // type: "success"
          });
          this.emitter.emit("user-is-logged-in", {
            email: this.loginForm.email,
          });
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
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("email", this.loginForm.email);
          localStorage.setItem("isAdmin", true);
          notify({
            title: result.data.message,
          });
          this.emitter.emit("user-is-logged-in", {
            email: this.loginForm.email,
          });
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err.stack);
      }
    },
    validateEmail() {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!this.loginForm.email.match(regex)) {
        this.invalidEmail = "is-invalid";
      } else {
        this.invalidEmail = "";
      }
    },
    validatePassword() {
      if (this.loginForm.password) {
        this.invalidPassword = "";
      } else {
        this.invalidPassword = "is-invalid";
      }
    },
  },
};
</script>

<style scoped>
.my-form-label {
  font-weight: bold;
}
</style>
