<template>
  <div class="min-h-screen bg-info flex items-center justify-center p-4">
    <div
      class="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex"
    >
      <!-- Left Column - Form -->
      <div class="w-1/2 p-8">
        <!-- Logo/Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-primary">Welcome Back</h1>
          <p class="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
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

          <div>
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

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" class="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Sign Up Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <router-link to="/register" class="text-primary hover:underline font-medium">
              Sign up
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
import { ref, computed, watch } from "vue";
import Loader from "../components/Loader.vue";
import { useRouter } from "vue-router";
import { useAuth } from "../stores/auth.js";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const loading = ref(false);
const router = useRouter();
const userStore = useAuth();
const isSuccess = computed(() => userStore.isSuccess);

// isSuccess watcher to reset success state after login
watch(isSuccess, (newValue) => {
  if (newValue) {
    router.push("/dashboard");
    setTimeout(() => {
      userStore.resetSuccess();
    }, 3000); // Reset after 3 seconds
  }
});

const handleLogin = async () => {
  loading.value = true;

  try {
    // Add your login logic here
    console.log("Login attempt:", {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    });

    await userStore.loginAction({
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    console.error("Login error:", error);
  } finally {
    loading.value = false;
  }
};
</script>
