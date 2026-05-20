<template>
  <div class="min-h-screen bg-white font-body">

    <AppNav />

    <ErrorBoundary>

      <!-- Page transition -->
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">

          <Suspense>
            <template #default>
              <component :is="Component" />
            </template>
            <template #fallback>
              <div class="min-h-[60vh] flex items-center justify-center">
                <div class="flex flex-col items-center gap-4">
                  <div class="spinner"></div>
                  <p class="text-sm text-[#A8998A]">Loading posts...</p>
                  <p class="text-xs text-[#A8998A]">Please wait a moment.</p>
                </div>
              </div>
            </template>
          </Suspense>

        </Transition>
      </RouterView>

    </ErrorBoundary>

    <!-- Footer -->
    <AppFooter />

  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
</script>