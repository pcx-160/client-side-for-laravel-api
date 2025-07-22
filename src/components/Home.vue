<script setup>
import { usePostsStore } from "@/stores/posts";
import { onMounted, ref } from "vue";

const posts = ref([]);
const isLoading = ref(true); // <- loading state
const { getAllPosts } = usePostsStore();

onMounted(async () => {
  posts.value = await getAllPosts();
  isLoading.value = false; // <- stop loading
});
</script>

<template>
  <main class="min-h-screen bg-gray-100 pt-20 px-4 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">LATEST POSTS</h1>

    <!-- Skeleton Loader -->
    <div v-if="isLoading" class="w-full max-w-2xl space-y-6">
      <div
        v-for="n in 6"
        :key="n"
        class="animate-pulse bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <div class="h-6 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-full"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>

    <!-- Posts List -->
    <div v-else-if="posts.length > 0" class="w-full max-w-2xl space-y-6">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
      >
        <h2 class="text-2xl font-semibold text-blue-600 mb-2">
          {{ post.title }}
        </h2>
        <p class="text-sm text-gray-500 mb-1">Posted by {{ post.user.name }}</p>
        <p class="text-gray-700">{{ post.body }}</p>
        <RouterLink
          :to="{ name: 'show', params: { id: post.id } }"
          class="text-blue-500 font-bold underline"
          >Read more...</RouterLink
        >
      </div>
    </div>

    <!-- No posts -->
    <div v-else class="text-gray-500 mt-4">No posts available.</div>
  </main>
</template>
