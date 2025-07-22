<script setup>
import { useAuthStore } from "@/stores/auth";
import { usePostsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const { user } = storeToRefs(useAuthStore());
const { errors } = storeToRefs(usePostsStore());
const { getPost, updatePost } = usePostsStore();

const post = ref(null);

const formData = reactive({
  title: "",
  body: "",
});

onMounted(async () => {
  post.value = await getPost(route.params.id);

  if (user.value.id !== post.value.user_id) {
    router.push({ name: "home" });
  } else {
    formData.title = post.value.title;
    formData.body = post.value.body;
  }
});
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">
        Update your post
      </h1>

      <form @submit.prevent="updatePost(post, formData)" class="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Post Title"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="formData.title"
          />
          <p class="text-sm text-red-500" v-if="errors.title">
            {{ errors.title[0] }}
          </p>
        </div>

        <div>
          <textarea
            rows="6"
            placeholder="Post Content"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            v-model="formData.body"
          ></textarea>
          <p class="text-sm text-red-500" v-if="errors.body">
            {{ errors.body[0] }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  </main>
</template>
