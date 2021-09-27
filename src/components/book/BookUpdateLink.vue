<template>
  <router-link :to="`/books/${book.id}/update`"><slot /></router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Book } from '@/models/book'

export default defineComponent({
  props: {
    book: { type: Object as () => Book, required: true },
  },
})
</script>
