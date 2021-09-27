<template>
  <template v-if="when">Loading...</template>
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    when: { type: Boolean, default: false },
  },
})
</script>
