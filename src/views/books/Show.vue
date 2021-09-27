<template>
  <div class="bg-white p-5">
    <router-link to="/books" class="mb-2 inline-flex items-center"
      ><icon
        name="md_twotone:chevron-left"
        class="mr-2 mb-1"
      />Back</router-link
    >
    <div class="flex justify-between">
      <div>
        <h1 class="text-3xl font-normal">
          <loading-text :when="state.busy">{{ state.book.title }}</loading-text>
        </h1>
        Book Title
      </div>
      <div v-if="state.book" class="flex items-center">
        <book-link v-if="$route.name == 'Update Book'" :book="state.book">
          <btn variant="outline" class="gray-400">
            <icon name="md_twotone:close" />
            Discard
          </btn>
        </book-link>
        <book-update-link v-else :book="state.book">
          <btn class="gray-300">
            <icon name="md_twotone:edit" />
            Update
          </btn>
        </book-update-link>
      </div>
    </div>
  </div>
  <div v-if="state.busy" class="flex justify-center p-5">
    <spinner />
  </div>
  <router-view v-else />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { State as BookState } from '@/store/modules/book'
import Icon from '@/components/ui/Icon.vue'
import LoadingText from '@/components/utils/LoadingText.vue'
import Spinner from '@/components/ui/Spinner.vue'
import Btn from '@/components/ui/form/Btn.vue'
import BookUpdateLink from '@/components/book/BookUpdateLink.vue'
import BookLink from '@/components/book/BookLink.vue'

export default defineComponent({
  components: { Icon, LoadingText, Spinner, Btn, BookUpdateLink, BookLink },
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
