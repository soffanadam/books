<template>
  <book-link :book="book" class="text-xl py-3 px-5 hover:bg-yellow-50">
    <span class="font-normal text-xl">{{ book.title }}</span>
    <small class="text-gray-400 ml-4">({{ book.year }})</small>
  </book-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BookLink from './BookLink.vue'
import { Book } from '@/models/book'

export default defineComponent({
  components: { BookLink },
  props: {
    book: { type: Object as () => Book, required: true },
  },
})
</script>
