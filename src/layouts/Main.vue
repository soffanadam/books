<template>
  <header>
    <div class="bg-gray-600 px-5 pt-16">
      <div class="container max-w-3xl">
        <div
          class="
            p-5
            bg-gray-500 bg-opacity-50
            border-t border-r border-l border-gray-500
          "
        >
          <h1 class="text-white text-2xl">Book Collection</h1>
        </div>
      </div>
    </div>
  </header>
  <div class="container border border-t-0 bg-gray-50 max-w-3xl">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  //
})
</script>
