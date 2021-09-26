<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ msg: string }>()
</script>

<template>
  <div
    class="
      h-screen
      w-full
      flex
      items-center
      justify-center
      bg-gradient-to-b
      from-accent-50
      to-accent-100
    "
  >
    <h1 class="text-3xl">
      <span
        class="
          bg-clip-text
          text-transparent
          bg-gradient-to-r
          from-accent-400
          to-green-600
        "
      >
        {{ msg }}
      </span>
    </h1>
  </div>
</template>
