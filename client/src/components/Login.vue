<template>
   <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <app-logo />
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
          Login to Your <Acronym></Acronym>ccount
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="">
           
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <div v-if="isLoading" class="flex justify-center">
              <div
                class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 dark:border-gradient-to-bl"
              ></div>
            </div>

            <submit-button v-else @click="submitForm" :disabled="!isFormValid">
              CLogin</submit-button
            >

          

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Dont have an account?
              <a
                href="#"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                @click="redirectToSignup()"
                >SignUp here</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { weatherApi } from "../config";
import SubmitButton from "./Reusable/SubmitButton.vue";
import AppLogo from "./Reusable/AppLogo.vue";
export default {
    components: { SubmitButton, AppLogo },
  name: "LoginPage",
  props: {
    name: String,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
     redirectToSignup() {
      this.$router.push("/signup");
    },
    async submitForm() {
      try {
        const response = await axios.post(`${weatherApi}/auth/login`, {
          email: this.email,
          password: this.password,
        });
        if (response.data) {
          const token = response.data.token;
          // Save the token in local storage or as a cookie
          localStorage.setItem("token", token);
          alert("Login successful You'll be Redirected to Main Weather App");

          this.$router.push("/weather");
        } else {
          alert("Login failed");
        }
      } catch (err) {
        alert(err.response.data.error);
      }
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.form-group > label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group > input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #f0f0f0;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.form-group > input:focus {
  outline: none;
  background-color: #e0e0e0;
}

.card {
  background-color: #000;
  color: #fff;
  padding: 2em;
  width: 100%;
  max-width: 420px;
  margin: 1em;
  border-radius: 30px;
}

button {
  background-color: #08a308;
  color: white;
  border-radius: 10px;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #14641f;
}

h1.temp {
  margin: 0;
  margin-bottom: 0.4em;
}
</style>
