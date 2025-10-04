<template>
  <div>
    <h2 class="text-white text-2xl text-center py-3 bg-tertiary">
      IMDB Clone
    </h2>
    <Disclosure :class="[
      'border-b-4 lg:py-2 fixed top-16 z-20 w-full transition-all duration-300',
      isScrolledDown
        ? 'bg-dark dark:bg-slate-800'
        : 'bg-danger dark:bg-slate-700 dark:text-white',
    ]" as="nav" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          <div class="flex items-center w-full justify-center">
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <span v-if="authStore.getAuthData" class="text-white px-3 py-2 rounded-md font-medium">
                  Welcome
                </span>

                <button v-if="authStore.getAuthData" @click="logoutUtil()"
                  class="text-white bg-red-600 hover:bg-red-700 transition-all duration-200 px-3 py-2 rounded-md font-medium ml-2">
                  Logout
                </button>
                <router-link v-for="link in userLinks" :key="link.name" :to="link.href"
                  class="text-white hover:bg-primary transition-all duration-200 hover:text-white px-3 py-2 rounded-md font-medium">
                  {{ link.name }}
                </router-link>
              </div>
            </div>
          </div>

          <div class="-mr-2 flex sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-info hover:text-white hover:bg-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link v-for="link in userLinks" :key="link.name" :to="link.href"
            class="text-gray-300 hover:bg-primary transition-all duration-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            {{ link.name }}
          </router-link>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";
import { useAuth } from "../stores/auth";

const isScrolledDown = ref(false);
const authStore = useAuth();
const links = [
  { name: "Home", href: "/" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

const authLinks = [
  { name: "Profile", href: "/profile" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Movies", href: "/movies" },
  { name: "Shows", href: "/shows" },
  { name: "Indian Movies", href: "/indian-movies" },
];

const userLinks = computed(() => {
  return authStore.getAuthData ? authLinks : links;
});

const checkScroll = () => {
  if (window.scrollY > 100) {
    isScrolledDown.value = true;
  } else {
    isScrolledDown.value = false;
  }
};

const logoutUtil = () => {
  authStore.logout();
  window.location.href = "/";
};

window.addEventListener("scroll", checkScroll);

onMounted(() => {
  checkScroll();
});
</script>
