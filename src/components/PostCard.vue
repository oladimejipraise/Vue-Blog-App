<template>
  <RouterLink
    :to="'/posts/' + post.id"
    class="group flex items-stretch gap-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-5 hover:border-stone-300 dark:hover:border-stone-500 hover:shadow-md transition-all duration-200"
  >
    <!-- Thumbnail -->
    <div class="w-[160px] shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800">
      <img
        :src="getPostImage(post)"
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-col justify-between flex-1 min-w-0 py-1">

      <!-- Top -->
      <div>
        
        <div class="flex items-center gap-2 mb-3 flex-wrap">
          <span class="text-[11px] font-semibold tracking-widest uppercase text-stone-400 dark:text-stone-500">
            {{ firstTag }}
          </span>
          <span class="text-stone-300 dark:text-stone-600">·</span>
          <span class="text-[12px] text-stone-400 dark:text-stone-500">{{ formatDate(post.createdAt) }}</span>
          <span class="text-stone-300 dark:text-stone-600">·</span>
          <span class="text-[12px] text-stone-400 dark:text-stone-500">{{ readTime(post.content) }}</span>
        </div>

        <!-- Title -->
        <h2 class="font-display text-[20px] font-bold text-black dark:text-white leading-snug mb-3 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
          {{ post.title }}
        </h2>

        <!-- Excerpt -->
        <p class="text-[14px] text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
          {{ post.excerpt || getExcerpt(post.content) }}
        </p>
      </div>

      <!-- Bottom -->
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-stone-100 dark:border-stone-700">
        <span class="text-[12px] font-medium text-stone-500 dark:text-stone-400">
          {{ post.category || firstTag }}
        </span>
        <span class="text-stone-300 dark:text-stone-600 group-hover:text-stone-600 dark:group-hover:text-stone-300 group-hover:translate-x-1 transition-all duration-200">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>

    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getPostImage, getExcerpt, formatDate, readTime, parseTags } from '../composables/usePosts.js'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const firstTag = computed(() => {
  const tags = parseTags(props.post.tags)
  return tags[0] || props.post.category || 'General'
})
</script>