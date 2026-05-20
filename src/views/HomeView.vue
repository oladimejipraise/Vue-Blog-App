<template>
  <div class="min-h-screen bg-white dark:bg-[#1C1A16]">

    <section class="max-w-[1100px] mx-auto px-8 pt-14 pb-10">
      <div class="flex items-start justify-between gap-10">

        <div class="max-w-sm">
          <p class="text-[11px] font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-4">
            Latest Posts
          </p>
          <h1 class="font-display text-4xl font-black text-black dark:text-white leading-tight mb-4">
            Thoughts on design, code, and everything in between.
          </h1>
          <p class="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
            Stories and ideas to inspire your curiosity and keep you learning.
          </p>
          <button
            @click="scrollToPosts"
            class="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm rounded hover:opacity-80 transition-opacity"
          >
            Browse all posts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        <!-- Hero image -->
        <div class="hidden md:block flex-1 max-w-[420px] h-[220px] rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
            alt="Hero"
            class="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>

    <div class="max-w-[1100px] mx-auto px-8">
      <hr class="border-black/10 dark:border-white/10" />
    </div>

    <section id="posts-section" class="max-w-[1100px] mx-auto px-8 py-10">
      <h2 class="text-base font-bold text-black dark:text-white mb-6">
        All Posts
      </h2>

      <Suspense>
        <template #default>
          <PostList />
        </template>
        <template #fallback>
          <div class="flex flex-col gap-4">
            <PostCardSkeleton v-for="n in 4" :key="n" />
          </div>
        </template>
      </Suspense>

    </section>

  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import PostCardSkeleton from '../components/PostCardSkeleton.vue'

const PostList = defineAsyncComponent(() =>
  import('../components/PostList.vue')
)

function scrollToPosts() {
  document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>