<template>
  <div class="max-w-[720px] mx-auto px-6 py-12 bg-white dark:bg-stone-950 transition-colors duration-300">


    <!-- Meta -->
    <div class="flex items-center gap-2 mb-6">
      <span class="text-[11px] font-medium tracking-widest uppercase text-stone-400 dark:text-stone-500">
        {{ parseTags(post.tags)[0] || post.category || 'General' }}
      </span>
      <span class="text-stone-300 dark:text-stone-600">·</span>
      <span class="text-[12px] text-stone-400">{{ formatDate(post.createdAt) }}</span>
      <span class="text-stone-300">·</span>
      <span class="text-[12px] text-stone-400">{{ readTime(post.content) }}</span>
    </div>

    <!-- Title -->
    <h1 class="font-display text-[2.6rem] font-semibold text-stone-900 dark:text-white leading-[1.2] tracking-tight mb-6">
      {{ post.title }}
    </h1>

    <!-- Author row -->
    <div class="flex items-center gap-3 mb-10 pb-8 border-b border-stone-100 dark:border-stone-800">
      <div class="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-medium text-stone-500 dark:text-stone-400">
        {{ initials }}
      </div>
      <div>
        <p class="text-sm text-stone-700 dark:text-stone-300">
          {{ post.author?.name || post.author || 'Anonymous' }}
        </p>
        <p class="text-xs text-stone-400 dark:text-stone-500">
          {{ formatDate(post.publishedAt || post.createdAt) }}
        </p>
      </div>
    </div>

    <!-- Hero image -->
    <div class="w-full aspect-[16/9] rounded-xl overflow-hidden mb-12">
      <img
        :src="getPostImage(post)"
        :alt="post.title"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Body + TOC -->
    <div class="flex gap-16 items-start">

      <div
        class="prose-content flex-1 min-w-0 text-stone-800 dark:text-stone-300"
        v-html="post.content || '<p>No content available.</p>'"
      ></div>
    </div>

    <!-- Share row -->
    <div class="flex items-center justify-between mt-16 pt-8 border-t border-stone-100 dark:border-stone-800 flex-wrap gap-4">
      <div>
        <p class="text-xs text-stone-400 dark:text-stone-500 mb-3 tracking-wide uppercase">Share</p>
        <div class="flex items-center gap-2">

          <!-- Twitter -->
          <a
            :href="twitterUrl"
            target="_blank"
            rel="noopener noreferrer"
            cclass="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-white hover:border-stone-400 dark:hover:border-stone-400 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          <!-- LinkedIn -->
          <a
            :href="linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-700 hover:border-stone-400 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>

          <button
            @click="copyLink"
            class="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-700 hover:border-stone-400 transition-colors relative"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            <span
              v-if="copied"
              class="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-stone-800 text-white px-2 py-1 rounded whitespace-nowrap"
            >
              Copied!
            </span>
          </button>

        </div>
      </div>

      <!-- Next post -->
      <RouterLink
        v-if="nextPost"
        :to="nextPostUrl"
        class="text-right group max-w-[260px]"
      >
        <p class="text-[10px] text-stone-400 tracking-widest uppercase mb-1">Next post</p>
        <p class="text-sm text-stone-700 group-hover:text-stone-900 transition-colors leading-snug flex items-center gap-1 justify-end">
          {{ nextPost.title }}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="shrink-0">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </p>
      </RouterLink>

    </div>

    <!-- You might also like -->
    <div v-if="relatedPosts.length" class="mt-16 pt-10 border-t border-stone-100 dark:border-stone-800">
      <h3 class="text-[11px] font-medium tracking-widest uppercase text-stone-400 dark:text-stone-500 mb-8">
        You might also like
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <RouterLink
          v-for="related in relatedPosts"
          :key="related.id"
          :to="'/posts/' + related.id"
          class="group"
        >
          <div class="aspect-[3/2] rounded-lg overflow-hidden bg-stone-100 mb-3">
            <img
              :src="getPostImage(related)"
              :alt="related.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <p class="text-[10px] font-medium tracking-widest uppercase text-stone-400 mb-1">
            {{ parseTags(related.tags)[0] || related.category || 'General' }}
          </p>
          <p class="text-sm font-medium text-stone-800 dark:text-stone-200 leading-snug line-clamp-2 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">
            {{ related.title }}
          </p>
          <p class="text-[11px] text-stone-400 dark:text-stone-500 mt-1">
            {{ formatDate(related.createdAt) }}
          </p>
        </RouterLink>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  fetchPostById,
  fetchPosts,
  getPostImage,
  formatDate,
  readTime,
  parseTags,
} from '../composables/usePosts.js'

const emit = defineEmits(['title'])
const route = useRoute()

const [post, allPosts] = await Promise.all([
  fetchPostById(route.params.id),
  fetchPosts(1, 50),
])

emit('title', post.title)

const currentIndex = allPosts.findIndex(p => p.id === route.params.id)
const nextPost = allPosts[currentIndex + 1] || null

// Related posts
const relatedPosts = allPosts
  .filter(p => p.id !== route.params.id)
  .slice(0, 3)

// Author initials
const initials = computed(() => {
  const name = post.author?.name || post.author || 'AU'
  return String(name).split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

// URL for sharing
const currentUrl = ref('')
onMounted(() => { currentUrl.value = window.location.href })

// Copy link
const copied = ref(false)
function copyLink() {
  navigator.clipboard.writeText(currentUrl.value).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}

// Computed URLs
const twitterUrl = computed(() =>
  'https://twitter.com/intent/tweet?text=' + encodeURIComponent(post.title)
)
const linkedinUrl = computed(() =>
  'https://linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(currentUrl.value)
)
const nextPostUrl = computed(() =>
  nextPost ? '/posts/' + nextPost.id : '/'
)

// Table of contents
const headings = ref([])
const activeHeading = ref('')
let observer = null

onMounted(() => {
  const els = document.querySelectorAll(
    '.prose-content h1, .prose-content h2, .prose-content h3'
  )
  headings.value = Array.from(els).map((el, i) => {
    const id = 'heading-' + i
    el.id = id
    return { id, text: el.textContent?.trim() }
  })

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activeHeading.value = entry.target.id
      })
    },
    { rootMargin: '-20% 0px -70% 0px' }
  )

  document.querySelectorAll('.prose-content h1, .prose-content h2, .prose-content h3')
    .forEach(el => observer.observe(el))
})

onUnmounted(() => { observer?.disconnect() })
</script>

<style scoped>
.prose-content {
  font-size: 1.0625rem;
  line-height: 1.85;
}
.prose-content :deep(h1),
.prose-content :deep(h2),
.prose-content :deep(h3) {
  font-family: 'Playfair Display', Georgia, serif;
  color: #1c1917;
  margin: 2.5rem 0 1rem;
  line-height: 1.25;
  letter-spacing: -0.01em;
}
.prose-content :deep(h1) { font-size: 1.75rem; font-weight: 600; }
.prose-content :deep(h2) { font-size: 1.375rem; font-weight: 600; }
.prose-content :deep(h3) { font-size: 1.125rem; font-weight: 500; }
.prose-content :deep(p) {
  margin-bottom: 1.6rem;
  color: #44403c;
}
.prose-content :deep(a) {
  color: #1c1917;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: #d6d3d1;
  transition: text-decoration-color 0.2s;
}
.prose-content :deep(a:hover) {
  text-decoration-color: #1c1917;
}
.prose-content :deep(ul),
.prose-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1.6rem;
  color: #44403c;
}
.prose-content :deep(li) { margin-bottom: 0.5rem; }
.prose-content :deep(blockquote) {
  border-left: 2px solid #e7e5e4;
  padding: 0.25rem 0 0.25rem 1.25rem;
  color: #78716c;
  margin: 2rem 0;
  font-style: italic;
  font-size: 1.0625rem;
}
.prose-content :deep(code) {
  background: #f5f5f4;
  color: #44403c;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: ui-monospace, monospace;
}
.prose-content :deep(pre) {
  background: #1c1917;
  color: #f5f5f4;
  padding: 1.5rem;
  border-radius: 10px;
  overflow-x: auto;
  margin: 2rem 0;
  font-size: 0.875rem;
  line-height: 1.7;
}
.prose-content :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
  font-size: inherit;
}
.prose-content :deep(img) {
  border-radius: 10px;
  margin: 2.5rem 0;
  width: 100%;
}
.prose-content :deep(hr) {
  border: none;
  border-top: 1px solid #e7e5e4;
  margin: 3rem 0;
}
.prose-content :deep(strong) { color: #1c1917; font-weight: 600; }

/* Dark mode prose */
:global(.dark) .prose-content {
  color: #d6d3d1;
}
:global(.dark) .prose-content :deep(h1),
:global(.dark) .prose-content :deep(h2),
:global(.dark) .prose-content :deep(h3) {
  color: #f5f5f4;
}
:global(.dark) .prose-content :deep(p) {
  color: #a8a29e;
}
:global(.dark) .prose-content :deep(strong) {
  color: #f5f5f4;
}
:global(.dark) .prose-content :deep(blockquote) {
  border-left-color: #44403c;
  color: #78716c;
}
:global(.dark) .prose-content :deep(code) {
  background: #292524;
  color: #d6d3d1;
}
:global(.dark) .prose-content :deep(a) {
  color: #f5f5f4;
  text-decoration-color: #44403c;
}
:global(.dark) .prose-content :deep(ul),
:global(.dark) .prose-content :deep(ol) {
  color: #a8a29e;
}
:global(.dark) .prose-content :deep(hr) {
  border-top-color: #292524;
}
</style>