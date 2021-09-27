<template>
  <router-link :to="link"><slot /></router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Book } from '@/models/book'

export const url = (id: number | string): string => {
  return `/books/${id}`
}

export default defineComponent({
  props: {
    book: { type: Object as () => Book, required: true },
  },
  setup(props) {
    const link = computed(() => url(props.book.id))
    return { link }
  },
})
</script>
