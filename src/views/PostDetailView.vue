<template>
  <div class="min-h-screen bg-white dark:bg-stone-950 transition-colors duration-300">

    <!-- Back bar -->
    <div class="border-b border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-950 sticky top-[60px] z-40">
      <div class="max-w-[1100px] mx-auto px-8 h-11 flex items-center gap-4">

        <!-- Back button -->
        <button
          @click="router.back()"
          class="flex items-center gap-2 text-[11px] text-stone-400 dark:text-stone-500 min-w-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to posts
        </button>

        <span class="text-stone-200 dark:text-stone-700">|</span>

        <div class="flex items-center gap-2 text-[11px] text-stone-400 min-w-0">
          <RouterLink to="/" class="hover:text-stone-600 dark:hover:text-stone-300 transition-colors shrink-0">
            Home
          </RouterLink>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="shrink-0">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span class="text-stone-600 dark:text-stone-400 truncate">{{ pageTitle }}</span>
        </div>

      </div>
    </div>

    <!-- Content -->
    <ErrorBoundary>
      <Suspense>
        <template #default>
          <PostContent @title="setTitle" />
        </template>
        <template #fallback>
          <PostDetailSkeleton />
        </template>
      </Suspense>
    </ErrorBoundary>

  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import PostDetailSkeleton from '../components/PostDetailSkeleton.vue'
import ErrorBoundary from '../components/ErrorBoundary.vue'

const router = useRouter()
const pageTitle = ref('Loading...')

function setTitle(title) {
  pageTitle.value = title
}

const PostContent = defineAsyncComponent(() =>
  import('../components/PostContent.vue')
)
</script>