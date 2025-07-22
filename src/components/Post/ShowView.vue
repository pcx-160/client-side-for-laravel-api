<script setup>
import { useAuthStore } from "@/stores/auth";
import { usePostsStore } from "@/stores/posts";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const { getPost, deletePost } = usePostsStore();
const authStore = useAuthStore();
const post = ref(null);

onMounted(async () => (post.value = await getPost(route.params.id)));
</script>

<template>
  <main class="min-h-screen bg-gray-100 pt-24 px-4 flex flex-col items-center">
    <div v-if="post" class="w-full max-w-3xl">
      <article
        class="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300 space-y-5"
      >
        <header>
          <h1 class="text-3xl font-extrabold text-blue-800">
            {{ post.title }}
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Posted by
            <span class="font-medium text-gray-700">{{ post.user.name }}</span>
          </p>
        </header>

        <section>
          <p class="text-gray-800 text-base leading-relaxed">{{ post.body }}</p>
        </section>

        <footer
          v-if="authStore.user && authStore.user.id === post.user_id"
          class="flex flex-wrap gap-3 pt-4"
        >
          <form @submit.prevent="deletePost(post)">
            <button
              type="submit"
              class="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete Post
            </button>
          </form>

          <RouterLink
            :to="{ name: 'update', params: { id: post.id } }"
            class="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
          >
            Update
          </RouterLink>
        </footer>
      </article>
    </div>

    <div v-else class="mt-10 text-gray-500 text-lg font-medium">
      No posts available.
    </div>
  </main>
</template>
