<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(useAuthStore());

//const authStore = useAuthStore(); 1 approach
const { authenticate } = useAuthStore(); // 2 approach destructured

onMounted(() => (errors.value = {}));

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
</script>

<template>
  <main
    class="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-15"
  >
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Register a new account
      </h1>

      <!-- application of 1 approach
      <form
        @submit.prevent="
          () => {
            authStore.authenticate('register', formData);
          }
        "
        class="space-y-5"
      >-->

      <!--application of 2 approach much cleaner-->
      <form
        @submit.prevent="authenticate('register', formData)"
        class="space-y-5"
      >
        <!-- Name -->
        <div>
          <input
            type="text"
            placeholder="Full Name"
            v-model="formData.name"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-sm text-red-500" v-if="errors.name">
            {{ errors.name[0] }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <input
            type="email"
            placeholder="Email"
            v-model="formData.email"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-sm text-red-500" v-if="errors.email">
            {{ errors.email[0] }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <input
            type="password"
            placeholder="Password"
            v-model="formData.password"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-sm text-red-500" v-if="errors.password">
            {{ errors.password[0] }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            v-model="formData.password_confirmation"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  </main>
</template>
