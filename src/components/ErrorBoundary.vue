<template>
  <div v-if="error" class="min-h-[60vh] flex items-center justify-center px-8">
    <div class="text-center max-w-md">

      <!-- Icon -->
      <div class="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mx-auto mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B6456" stroke-width="1.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>

      <!-- Heading -->
      <h2 class="font-display text-2xl font-semibold text-[#1C1A16] mb-3">
        Something went wrong.
      </h2>

      <!-- Message -->
      <p class="text-sm text-[#6B6456] leading-relaxed mb-6">
        We couldn't load the blog posts. Please try again later.
      </p>

      <!-- Error detail box -->
      <div class="bg-black/5 rounded-lg px-4 py-3 mb-8 text-left">
        <p class="text-[11px] text-[#A8998A] mb-1">Error details</p>
        <code class="text-[12px] text-[#6B6456] font-mono break-all">
          {{ error.message || 'An unexpected error occurred' }}
        </code>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-center gap-3">
        <button
          @click="retry"
          class="flex items-center gap-2 px-5 py-2.5 bg-[#1C1A16] text-[#F5F0E8] text-sm rounded hover:bg-[#2D2A24] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Try again
        </button>

        <RouterLink
          to="/"
          class="flex items-center gap-2 px-5 py-2.5 border border-black/15 text-[#6B6456] text-sm rounded hover:border-black/30 hover:text-[#1C1A16] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Go home
        </RouterLink>
      </div>

    </div>
  </div>

  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { RouterLink } from 'vue-router'

const error = ref(null)

onErrorCaptured((err) => {
  error.value = err
  return false 
})

function retry() {
  error.value = null 
}
</script>