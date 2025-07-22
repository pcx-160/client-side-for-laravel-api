<script setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <nav class="fixed top-0 w-full z-50 bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <RouterLink to="/" class="flex items-center">
            <img
              class="h-8 w-auto"
              src="https://images.seeklogo.com/logo-png/61/1/club-atletico-social-pinto-logo-png_seeklogo-612160.png"
              alt="Logo"
            />
            <span class="ml-2 font-bold text-xl text-gray-800">Test</span>
          </RouterLink>
        </div>

        <p v-if="authStore.user" class="text-xl font-bold">
          {{ authStore.user.name }}
        </p>

        <!-- Navigation Buttons -->
        <div class="flex items-center">
          <div v-if="authStore.user" class="flex space-x-4">
            <form @submit.prevent="authStore.logout">
              <button
                class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Log out
              </button>
            </form>

            <RouterLink to="/create">
              <button
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Create Post
              </button>
            </RouterLink>
          </div>
          <div v-else class="flex space-x-4">
            <RouterLink to="/login">
              <button
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Login
              </button>
            </RouterLink>
            <RouterLink to="/register">
              <button
                class="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
              >
                Register
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
