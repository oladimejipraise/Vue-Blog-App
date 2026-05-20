<template>
  <div class="min-h-[80vh] flex items-center justify-center px-8">
    <div class="flex flex-col items-center text-center max-w-sm">

      <!--404 -->
      <div class="relative mb-8">
        <span class="font-display text-[120px] font-semibold text-black/5 leading-none select-none">
          404
        </span>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B6456" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Heading -->
      <h1 class="font-display text-2xl font-semibold text-[#1C1A16] mb-2">
        Page Not Found
      </h1>

      <!-- Subtext -->
      <p class="text-sm text-[#6B6456] leading-relaxed mb-8">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center gap-3 w-full">
        <RouterLink
          to="/"
          class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1C1A16] text-[#F5F0E8] text-sm rounded hover:bg-[#2D2A24] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Go to home
        </RouterLink>

        <button
          @click="router.back()"
          class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 border border-black/15 text-[#6B6456] text-sm rounded hover:border-black/30 hover:text-[#1C1A16] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Go back
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()
</script>