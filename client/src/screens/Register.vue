<template>
  <div class="min-h-screen bg-info flex items-center justify-center p-4">
    <div
      class="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl flex"
    >
      <!-- Left Column - Form -->
      <div class="w-1/2 p-8">
        <!-- Logo/Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-primary">Create Account</h1>
          <p class="text-gray-600 mt-2">Sign up for a new account</p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Full Name Field -->
          <div class="flex space-x-4">
            <!-- First Name Field -->
            <div class="flex-1">
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                v-model="firstName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your first name"
              />
            </div>

            <!-- Last Name Field -->
            <div class="flex-1">
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                v-model="lastName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <!-- Username and Email Fields Row -->
          <div class="flex space-x-4">
            <div class="flex-1">
              <label
                for="username"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                v-model="username"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div class="flex-1">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <!-- Password Fields Row -->
          <div class="flex space-x-4">
            <!-- Password Field -->
            <div class="flex-1">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div class="flex-1">
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="agreeTerms"
              v-model="agreeTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label for="agreeTerms" class="ml-2 block text-sm text-gray-700">
              I agree to the
              <a href="#" class="text-primary hover:underline"
                >Terms and Conditions</a
              >
            </label>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading">Creating account...</span>
            <span v-else>Sign Up</span>
          </button>
        </form>

        <!-- Sign In Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link
              to="/login"
              class="text-primary hover:underline font-medium"
            >
              Sign in
            </router-link>
          </p>
        </div>
      </div>

      <!-- Right Column - Image -->
      <div class="w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naW58ZW58MHx8MHx8fDA%3D"
          alt="Movie App"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <Loader v-if="loading" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Loader from "../components/Loader.vue";
import { useAuth } from "../stores/auth.js";

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const agreeTerms = ref(false);
const loading = ref(false);
const errors = ref({});
const auth = useAuth();

const handleRegister = async () => {
  // Reset errors
  errors.value = {};
  if (!email.value || !password.value || !confirmPassword.value) {
    errors.value.general = "All fields are required.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    errors.value.password = "Passwords do not match.";
    return;
  }

  loading.value = true;

  try {
    // Add your registration logic here
    console.log("Registration attempt:", {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      email: email.value,
      password: password.value,
      agreeTerms: agreeTerms.value,
    });

    await auth.registerAction({
      first_name: firstName.value,
      last_name: lastName.value,
      username: username.value,
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    console.error("Registration error:", error);
    alert("Registration failed. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>
