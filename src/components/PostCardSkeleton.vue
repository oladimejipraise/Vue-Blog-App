<template>
  <div class="flex items-stretch gap-5 bg-[#FDFAF4] border border-black/10 rounded-lg p-4">
    
    <div class="w-[130px] shrink-0 rounded overflow-hidden">
      <div class="skeleton w-full h-full min-h-[90px]"></div>
    </div>

    <div class="flex flex-col justify-between flex-1 py-0.5 gap-3">
      
      <!-- Top -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-3">
          <div class="skeleton h-2.5 w-16 rounded"></div>
          <div class="skeleton h-2.5 w-20 rounded"></div>
          <div class="skeleton h-2.5 w-14 rounded"></div>
        </div>

        <!-- Title -->
        <div class="skeleton h-4 w-3/4 rounded"></div>
        <div class="skeleton h-4 w-1/2 rounded"></div>

        <div class="skeleton h-3 w-full rounded mt-1"></div>
        <div class="skeleton h-3 w-5/6 rounded"></div>
      </div>

      <div class="flex justify-end">
        <div class="skeleton h-4 w-4 rounded"></div>
      </div>

    </div>
  </div>
</template>