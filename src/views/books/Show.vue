<template>
  <div class="bg-white p-5">
    <router-link to="/books" class="mb-2 inline-flex items-center"
      ><icon
        name="md_twotone:chevron-left"
        class="mr-2 mb-1"
      />Back</router-link
    >
    <h1 class="text-3xl font-normal">
      <loading-text :when="state.busy">{{ state.book.title }}</loading-text>
    </h1>
    Book Title
  </div>
  <div v-if="state.busy" class="flex justify-center p-5">
    <spinner />
  </div>
  <template v-else>
    <div class="p-5 border-t">
      <div class="text-2xl">{{ state.book.year }}</div>
      Year
    </div>
    <div class="p-5 border-t">
      Description
      <div class="text-2xl">{{ state.book.description }}</div>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { State as BookState } from '@/store/modules/book'
import Icon from '@/components/ui/Icon.vue'
import LoadingText from '@/components/utils/LoadingText.vue'
import Spinner from '@/components/ui/Spinner.vue'

export default defineComponent({
  components: { Icon, LoadingText, Spinner },
  setup() {
    const store = useStore()
    const state: ComputedRef<BookState> = computed(() => store.state.book)

    const route = useRoute()
    const fetch = () => {
      store.dispatch('book/show', route.params.id)
    }

    fetch()

    return { state }
  },
})
</script>
