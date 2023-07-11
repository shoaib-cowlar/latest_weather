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
            Create and account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="">
            <div>
              <label
                for="firstName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >FirstName</label
              >
              <input
                v-model="firstName"
                type="firstName"
                name="firstName"
                id="firstName"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required=""
              />
            </div>
            <div>
              <label
                for="lastName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >LastName</label
              >
              <input
                v-model="lastName"
                type="lastName"
                name="lastName"
                id="lastName"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required=""
              />
            </div>
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
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Confirm password</label
              >
              <input
                v-model="confirmPassword"
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  v-model="acceptTerms"
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div class="ml-3 text-sm">
                <label
                  for="terms"
                  class="font-light text-gray-500 dark:text-gray-300"
                  >I accept the
                  <a
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                    >Terms and Conditions</a
                  ></label
                >
              </div>
            </div>

            <div v-if="isLoading" class="flex justify-center">
              <div
                class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 dark:border-gradient-to-bl"
              ></div>
            </div>

            <submit-button v-else @click="submitForm" :disabled="!isFormValid">
              Create account</submit-button
            >

            <!-- Error message -->
            <p v-if="!acceptTerms" class="text-sm text-red-500">
              Please accept the Terms and Conditions.
            </p>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <a
                href="#"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                @click="redirectToLogin()"
                >Login here</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { userSignup } from "../services/authService";
import SubmitButton from "./Reusable/SubmitButton.vue";
import AppLogo from "./Reusable/AppLogo.vue";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  components: { SubmitButton, AppLogo },
  name: "SignUpPage",

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      isLoading: false,
    };
  },
  computed: {},
  methods: {
    redirectToLogin() {
      this.$router.push("/login");
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
    isFormValid() {
      return (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.password &&
        this.confirmPassword &&
        this.acceptTerms
      );
    },
    validateEmail(email) {
      const re = /^[^@]+@[^.]+\.[cC][oO][mM]$/;
      return re.test(email);
    },
    validatePassword(password, repeatedPassword) {
      if (password !== repeatedPassword) {
        return false;
      } else {
        return true;
      }
    },

    async submitForm() {
      if (this.isLoading) return; // Prevent multiple form submissions

      // Check emppty validity
      if (!this.isFormValid()) {
        this.isLoading = false; // Stop the loading spinner
        this.triggerToast("Please Fill all fields' ");
        return;
      }

      // Check email validity
      if (!this.validateEmail(this.email)) {
        this.isLoading = false; // Stop the loading spinner
        this.triggerToast(
          "Invalid email address.  The format should be 'example@example.com' ",
        );
        return;
      }
      // Check if passwords match
      if (!this.validatePassword(this.password, this.confirmPassword)) {
        this.isLoading = false;
        this.triggerToast("Passwords do not match");
        return;
      }
      try {
        this.isLoading = true;
        // Delay the execution for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await userSignup({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });
        console.log(response.data);
        if (response.data) {
          this.isLoading = false;
          this.triggerToast(
            "Registration successful You'll be Redirected To Login Screen",
          );
          this.redirectToLogin();
        } else {
          this.triggerToast("Registration failed");
        }
      } catch (err) {
        console.log(err);
        this.triggerToast(err.response.data.error);
      } finally {
        this.isLoading = false; // Stop the loading spinner
      }
    },
  },
};
</script>

<style scoped></style>
