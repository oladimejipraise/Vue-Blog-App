<template>
  <nav class="sticky top-0 z-50 bg-white dark:bg-[#1C1A16] border-b border-black/10 dark:border-white/10 transition-colors duration-300">
    <div class="max-w-[1100px] mx-auto px-8 h-[60px] flex items-center gap-8">

      <!-- Logo -->
      <RouterLink
        to="/"
        class="font-display text-[22px] font-semibold text-[#1C1A16] dark:text-[#F5F0E8] tracking-tight mr-auto"
      >
        Blog.
      </RouterLink>

      <!-- Nav Links -->
      <ul class="flex gap-8 list-none">
        <li>
          <RouterLink
            to="/"
            class="text-sm text-[#6B6456] dark:text-[#A8998A] hover:text-[#1C1A16] dark:hover:text-[#F5F0E8] transition-colors pb-0.5"
            :class="{
              'text-[#1C1A16] dark:text-[#F5F0E8] border-b border-[#1C1A16] dark:border-[#F5F0E8]': route.path === '/'
            }"
          >
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/about"
            class="text-sm text-[#6B6456] dark:text-[#A8998A] hover:text-[#1C1A16] dark:hover:text-[#F5F0E8] transition-colors pb-0.5"
            :class="{
              'text-[#1C1A16] dark:text-[#F5F0E8] border-b border-[#1C1A16] dark:border-[#F5F0E8]': route.path === '/about'
            }"
          >
            About
          </RouterLink>
        </li>
      </ul>

      <!-- Actions -->
      <div class="flex gap-1">

        <!-- Dark mode toggle -->
        <button
          @click="toggleTheme"
          class="w-9 h-9 flex items-center justify-center rounded text-[#6B6456] dark:text-[#A8998A] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#1C1A16] dark:hover:text-[#F5F0E8] transition-colors"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <!--light mode -->
          <svg v-if="!isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <!-- Dark mode -->
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>

        <!-- Search toggle -->
        <button
          @click="toggleSearch"
          class="w-9 h-9 flex items-center justify-center rounded text-[#6B6456] dark:text-[#A8998A] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#1C1A16] dark:hover:text-[#F5F0E8] transition-colors"
          aria-label="Toggle search"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>

      </div>
    </div>

    <!-- Search Panel -->
    <Transition name="search">
      <div
        v-if="searchOpen"
        class="border-t border-black/10 dark:border-white/10 bg-[#F5F0E8] dark:bg-[#1C1A16] px-8 py-3"
      >
        <div class="max-w-[1100px] mx-auto flex items-center gap-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8998A" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="searchQuery"
            ref="searchInput"
            type="text"
            placeholder="Search posts..."
            class="flex-1 bg-transparent text-sm text-[#1C1A16] dark:text-[#F5F0E8] placeholder-[#A8998A] outline-none"
            @keydown.escape="closeSearch"
          />
          <button
            @click="closeSearch"
            class="text-xs text-[#A8998A] hover:text-[#1C1A16] dark:hover:text-[#F5F0E8] transition-colors px-2 py-1 border border-black/10 dark:border-white/10 rounded"
          >
            ESC
          </button>
        </div>

        <!-- Search Results -->
        <div
          v-if="searchQuery.trim() && filteredPosts.length"
          class="max-w-[1100px] mx-auto mt-3 flex flex-col gap-1 pb-2"
        >
          <RouterLink
            v-for="post in filteredPosts"
            :key="post._id || post.id"
            :to="`/posts/${post.slug || post._id || post.id}`"
            @click="closeSearch"
            class="flex items-center gap-3 px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A8998A" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span class="text-sm text-[#1C1A16] dark:text-[#F5F0E8]">{{ post.title }}</span>
            <span class="ml-auto text-[11px] text-[#A8998A]">
              {{ post.tags?.[0] || post.category || '' }}
            </span>
          </RouterLink>
        </div>

        <!-- No Results -->
        <div
          v-else-if="searchQuery.trim() && !filteredPosts.length"
          class="max-w-[1100px] mx-auto mt-3 pb-2"
        >
          <p class="text-sm text-[#A8998A]">
            No posts found for "<span class="text-[#6B6456]">{{ searchQuery }}</span>"
          </p>
        </div>

      </div>
    </Transition>

  </nav>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { fetchPosts } from '../composables/usePosts.js'

const route = useRoute()
const isDark = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const allPosts = ref([])

onMounted(async () => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }

  try {
    allPosts.value = await fetchPosts()
  } catch (e) {
    console.error('Search: could not load posts', e)
  }
})

watch(searchOpen, async (val) => {
  if (val) {
    await nextTick()
    searchInput.value?.focus()
  }
})

const filteredPosts = computed(() => {
  if (!searchQuery.value.trim()) return []
  const q = searchQuery.value.toLowerCase()
  return allPosts.value
    .filter((p) =>
      p.title?.toLowerCase().includes(q) ||
      p.excerpt?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
    )
    .slice(0, 6)
})

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (!searchOpen.value) searchQuery.value = ''
}

function closeSearch() {
  searchOpen.value = false
  searchQuery.value = ''
}
</script>

<style scoped>
.search-enter-active,
.search-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>