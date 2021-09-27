<template>
  <div class="p-5 border-t">
    <div class="text-2xl">{{ state.book.year }}</div>
    Year
  </div>
  <div class="p-5 border-t">
    Description
    <div class="text-2xl">{{ state.book.description }}</div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue'
import { useStore } from '@/store'
import { State as BookState } from '@/store/modules/book'

export default defineComponent({
  setup() {
    const store = useStore()
    const state: ComputedRef<BookState> = computed(() => store.state.book)

    return { state }
  },
})
</script>
