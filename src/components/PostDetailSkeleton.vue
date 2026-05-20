<template>
  <div class="max-w-[1100px] mx-auto px-8 py-10">
    <div class="flex gap-12">

      <div class="flex-1 min-w-0 flex flex-col gap-4">

        <!-- Meta row -->
        <div class="flex items-center gap-3">
          <div class="skeleton h-2.5 w-16"></div>
          <div class="skeleton h-2.5 w-20"></div>
          <div class="skeleton h-2.5 w-14"></div>
        </div>

        <!-- Title -->
        <div class="skeleton h-9 w-3/4"></div>
        <div class="skeleton h-9 w-1/2"></div>

        <!-- Author -->
        <div class="flex items-center gap-3 py-4 border-y border-black/10">
          <div class="skeleton w-9 h-9 rounded-full"></div>
          <div class="flex flex-col gap-2">
            <div class="skeleton h-3 w-28"></div>
            <div class="skeleton h-2.5 w-20"></div>
          </div>
        </div>

        <div class="skeleton w-full h-[340px] rounded-lg"></div>

        <div class="flex flex-col gap-3 mt-4">
          <div class="skeleton h-3 w-full"></div>
          <div class="skeleton h-3 w-full"></div>
          <div class="skeleton h-3 w-5/6"></div>
          <div class="skeleton h-3 w-full"></div>
          <div class="skeleton h-3 w-4/5"></div>
          <div class="skeleton h-3 w-full"></div>
          <div class="skeleton h-3 w-3/4"></div>
        </div>

      </div>

      <div class="hidden lg:flex flex-col gap-2 w-[200px] shrink-0 pt-1">
        <div class="skeleton h-2.5 w-20 mb-2"></div>
        <div class="skeleton h-2.5 w-24"></div>
        <div class="skeleton h-2.5 w-20"></div>
        <div class="skeleton h-2.5 w-28"></div>
        <div class="skeleton h-2.5 w-16"></div>
      </div>

    </div>
  </div>
</template>