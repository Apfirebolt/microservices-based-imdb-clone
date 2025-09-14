<template>
  <div class="bg-info">
    <div class="bg-white shadow-lg rounded-lg p-4">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 mt-12 gap-4">
        <!-- Title & Description Box -->
        <div class="bg-gray-100 rounded-lg p-4 flex-1">
          <h1 class="text-4xl font-bold text-primary mb-2">Profile</h1>

          <p class="text-dark leading-relaxed mb-4">
            Manage your profile information here. You can update your details
            and preferences.
          </p>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-4">Your Information</h2>
        <form @submit.prevent="editProfileUtil({ username, email, password })"
          class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="username">Username</label>
            <input id="username" v-model="username" type="text"
              class="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter username" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="email">Email</label>
            <input id="email" v-model="email" type="email"
              class="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter email" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="password">Password</label>
            <input id="password" v-model="password" type="password"
              class="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter new password" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="first_name">First Name</label>
            <input id="first_name" v-model="first_name" type="text"
              class="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter first name" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="last_name">Last Name</label>
            <input id="last_name" v-model="last_name" type="text"
              class="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter last name" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="profile_picture">
              Profile Picture
            </label>
            <input id="profile_picture" type="file" accept="image/*" @change="onProfilePictureChange"
              class="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>

          <div class="col-span-1 md:col-span-3 flex flex-col items-center justify-center">
            <img v-if="profile_picture_preview" :src="profile_picture_preview" alt="Profile Picture"
              class="w-64 h-64 rounded-full object-cover mt-2" />
            <p v-else class="text-gray-500 mt-2 text-center">
              No profile picture selected.
            </p>
          </div>

          <div class="col-span-1 md:col-span-3 flex items-center mt-2">
            <input
              id="is_locked"
              type="checkbox"
              v-model="is_locked"
              class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label for="is_locked" class="ml-2 block text-sm font-medium text-gray-700">
              Lock Profile
            </label>
          </div>

          <div class="col-span-1 md:col-span-3">
            <p class="text-sm text-gray-500">
              Note: Password is optional. If you leave it blank, it won't be changed.
            </p>
            <p class="text-sm text-gray-500">
              Profile visibility is controlled by the "Lock Profile" setting. If you lock your profile, it will not be visible to others.
            </p>
          </div>
          <div class="col-span-1 md:col-span-3 flex justify-end mt-4">
            <button type="submit"
              class="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark transition">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>

    <Loader v-if="loading" />
  </div>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { onMounted, ref, computed, watch } from "vue";
import { useAuth } from "../stores/auth";
import Loader from "../components/Loader.vue";

const authStore = useAuth();
const email = ref("");
const username = ref("");
const password = ref("");
const first_name = ref("");
const last_name = ref("");
const profile_picture = ref(null);
const is_locked = ref(false);
const profile_picture_preview = ref(null);
const loading = computed(() => authStore.isLoading);
const profile = computed(() => authStore.getProfileData);

const editProfileUtil = async () => {
  try {
    const formData = new FormData();

    // Append all your text fields
    formData.append("username", username.value);
    formData.append("email", email.value);
    // Only append password if it's not empty, as it's optional
    if (password.value) {
      formData.append("password", password.value);
    }
    formData.append("first_name", first_name.value);
    formData.append("last_name", last_name.value);
    formData.append("is_locked", is_locked.value);

    if (profile_picture.value) {
      formData.append("profile_picture", profile_picture.value);
    }
    await authStore.updateProfile(formData);

  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

watch(profile, (newProfile) => {
  if (newProfile) {
    username.value = newProfile.username;
    email.value = newProfile.email;
    first_name.value = newProfile.first_name || "";
    last_name.value = newProfile.last_name || "";
    is_locked.value = newProfile.is_locked || false;
    profile_picture_preview.value = newProfile.profile_picture
      ? newProfile.profile_picture
      : null;
  }
});

const onProfilePictureChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check file size
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("Profile picture size exceeds 5MB.");
      return;
    }

    // Use FileReader to create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      profile_picture_preview.value = e.target.result;
    };
    reader.readAsDataURL(file);

    // Assign the file to the profile_picture ref for later upload
    profile_picture.value = file;
  } else {
    // Clear the preview if the user cancels the file selection
    profile_picture_preview.value = null;
  }
};

onMounted(() => {
  authStore.getProfileAction();
});
</script>
