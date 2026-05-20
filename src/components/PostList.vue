<template>
  <div class="flex flex-col gap-4">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
    <div v-if="posts.length === 0" class="text-center py-20">
      <p class="text-sm text-[#A8998A]">No posts found.</p>
    </div>
  </div>
</template>

<script setup>
import { fetchPosts } from '../composables/usePosts.js'
import PostCard from './PostCard.vue'

const posts = await fetchPosts()
</script>