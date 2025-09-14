// stores/auth.js

import { defineStore } from "pinia";
import { ref } from "vue";
import Cookie from "js-cookie";
import { backendClient, setupInterceptors } from "../plugins/interceptor";
import { toast } from 'vue3-toastify';
import { toastOptions } from "../utils";

export const useAuth = defineStore("auth", {
  state: () => ({
    authData: Cookie.get("user") ? JSON.parse(Cookie.get("user")) : null,
    profileData: ref(null),
    loading: ref(false),
    success: ref(false),
  }),

  getters: {
    getAuthData: (state) => state.authData,
    getProfileData: (state) => state.profileData,
    isLoading: (state) => state.loading,
    isSuccess: (state) => state.success,
    isLoggedIn: (state) => !!state.authData,
  },

  actions: {
    async loginAction(loginData) {
      try {
        const response = await backendClient.post("login", loginData);
        if (response.data) {
          this.authData = response.data;
          // Show success toast
          this.success = true;
          toast.success("Login successful!", toastOptions);
          // set the data in cookie
          Cookie.set("user", JSON.stringify(response.data), { expires: 30 });
          return response.data; // Return the auth data
        }
      } catch (error) {
        let message = "An error occurred!";
        if (error.response && error.response.data) {
          message = error.response.data.detail;
        }
        console.log('Some error', error);
        toast.error(message, toastOptions);
        throw error; // Re-throw the error so it can be handled by the caller
      }
    },

    async registerAction(registerData) {
      try {
        const response = await backendClient.post("register", registerData);
        if (response.data && response.status === 201) {
          this.authData = response.data;
          this.success = true;
          toast.success("Registration successful! Please login to continue", toastOptions);
          Cookie.set("user", JSON.stringify(response.data), { expires: 30 });
          return response.data;
        }
      } catch (error) {
        let message = "An error occurred!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        console.log(error);
        toast.error(message, toastOptions);
        throw error;
      }
    },

    async getProfileAction() {
      this.loading = true;
      try {
        const authData = Cookie.get("user");
        const headers = {
          Authorization: `Bearer ${JSON.parse(authData).access}`,
        };
        const response = await backendClient.get("profile", { headers });
        this.profileData = response.data;
        return response.data;
      } catch (error) {
        let message = "An error occurred!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        console.log(error);
        toast.error(message, toastOptions);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(profileData) {
      this.loading = true;
      try {
        const authData = Cookie.get("user");
        const headers = {
          Authorization: `Bearer ${JSON.parse(authData).access}`,
        };
        const response = await backendClient.put("profile", profileData, { headers });
        if (response.status === 200) {
          this.profileData = response.data;
          this.success = true;
          toast.success("Profile updated successfully!", toastOptions);
          return response.data;
        }
      } catch (error) {
        let message = "An error occurred!";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        console.log(error);
        toast.error(message, toastOptions);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.authData = null;
      toast.success("Logged out successfully!", toastOptions);
      Cookie.remove("user");
    },

    resetSuccess() {
      this.success = false;
    },

    resetAuth() {
      this.authData = {};
    },
  },
});

// Setup interceptors for auth-related actions
// This will ensure that any 401 errors trigger the logout action
export const setupAuthInterceptors = () => {
  const authStore = useAuth();
  setupInterceptors(authStore.logout);
};