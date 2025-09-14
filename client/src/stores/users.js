import { defineStore } from "pinia";
import { ref } from "vue";
import Cookie from "js-cookie";
import router from "../routes";
import { useAuth } from "./auth";
import { backendClient } from "../plugins/interceptor";
import { toast } from "vue3-toastify";
import { toastOptions } from "../utils";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: ref([]),
    user: ref(null),
    messages: ref([]),
    loading: ref(false),
    error: ref(null),
  }),

  getters: {
    getUsers(state) {
      return state.users;
    },
    getUser(state) {
      return state.user;
    },
    getMessages(state) {
      return state.messages;
    },
    isLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
  },

  actions: {
    logoutOnUnauthorized() {
      const authStore = useAuth();
      authStore.logout();
      router.push("/login");
      toast.error("Session expired. Please log in again.", toastOptions);
    },

    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const authData = Cookie.get("user");
        const headers = {
          Authorization: `Bearer ${JSON.parse(authData).access}`,
        };
        const response = await backendClient.get("users", { headers });
        this.users = response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.logoutOnUnauthorized();
        } else {
          toast.error("Failed to fetch users. Please try again.", toastOptions);
          this.error = error;
        }
      } finally {
        this.loading = false;
      }
    },

    async getUserById(id) {
      this.loading = true;
      this.error = null;
      try {
        const authData = Cookie.get("user");
        const headers = {
          Authorization: `Bearer ${JSON.parse(authData).access}`,
        };
        const response = await backendClient.get(`users/${id}`, { headers });
        if (response.status === 200) {
          this.user = response.data;
        }
      } catch (error) {
        this.error = error;
        if (error.response && error.response.status === 401) {
          this.logoutOnUnauthorized();
        } else {
          toast.error("Failed to fetch user. Please try again.", toastOptions);
        }
        return null;
      } finally {
        this.loading = false;
      }
    },
  },

  resetUsers() {
    this.users = [];
    this.user = null;
    this.loading = false;
    this.error = null;
  },
});
