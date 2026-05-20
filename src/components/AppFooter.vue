<template>
  <footer class="border-t border-stone-100 mt-20 py-8">
    <div class="max-w-[1100px] mx-auto px-8 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="font-display text-[20px] font-semibold text-stone-900">a.</span>
        <span class="text-xs text-stone-400">© {{ year }} a. Blog. All rights reserved.</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="#" class="text-xs text-stone-400 hover:text-stone-700 transition-colors">Home</a>
        <a href="#" class="text-xs text-stone-400 hover:text-stone-700 transition-colors">About</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>