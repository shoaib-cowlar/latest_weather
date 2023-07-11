<template>
  <section class="bg-gray-50 dark:bg-gray-900 -mt-20">
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
            Login to Your Account
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
              Login</submit-button
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
import SubmitButton from "./Reusable/SubmitButton.vue";
import AppLogo from "./Reusable/AppLogo.vue";
import { userLogin } from "../services/authService";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  components: { SubmitButton, AppLogo },
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  computed: {
    isFormValid() {
      return this.email && this.password;
    },
  },
  mounted() {
    console.log(this.isFormValid);
  },
  methods: {
    redirectToSignup() {
      this.$router.push("/signup");
    },
    clearData() {
      this.email = "";
      this.password = "";
    },
    triggerToast(message) {
      this.toast(message, {
        position: "top-right",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: "fas fa-rocket",
        rtl: false,
      });
    },
    async submitForm() {
      if (this.isLoading) return; // Prevent multiple form submissions
      try {
        this.isLoading = true;
        // Delay the execution for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await userLogin({
          email: this.email,
          password: this.password,
        });
        if (response.data) {
          this.isLoading = false;
          const token = response.data.token;
          // Save the token in local storage or as a cookie
          localStorage.setItem("token", token);
          this.triggerToast(
            "Login successful You'll be Redirected to Main Weather App",
          );

          this.$router.push("/weather");
        } else {
          this.isLoading = false;
          this.triggerToast("Login failed");
        }
      } catch (err) {
        this.isLoading = false;
        this.triggerToast(err.response.data.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
