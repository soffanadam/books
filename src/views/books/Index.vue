<template>
  <div v-if="state.paginator?.meta?.total" class="flex flex-col">
    <div class="bg-white p-5">
      <h1 class="text-3xl font-normal">Books</h1>
      <loading-text :when="state.busy">
        {{ state.paginator.meta.total }} books found
      </loading-text>
    </div>
    <div v-if="state.busy" class="p-5 flex justify-center">
      <spinner />
    </div>
    <template v-else>
      <book-row
        v-for="book in state.paginator.data"
        :key="book.id"
        :book="book"
        class="border-t"
      />
      <pagination
        :total="state.paginator.meta.total"
        :rows="15"
        :current="$route.query.page"
        class="p-5 border-t"
        @change="pageChangeHandler"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { State as BookState } from '@/store/modules/book'
import { override } from '@/utils/query'
import BookRow from '@/components/book/BookRow.vue'
import LoadingText from '@/components/utils/LoadingText.vue'
import Pagination from '@/components/ui/Pagination.vue'
import Spinner from '@/components/ui/Spinner.vue'

export default defineComponent({
  components: { BookRow, Pagination, LoadingText, Spinner },
  setup() {
    const store = useStore()
    const state: ComputedRef<BookState> = computed(() => store.state.book)

    const route = useRoute()
    const fetch = () => {
      store.dispatch('book/paginate', route.query)
    }

    fetch()
    watch(() => route.query, fetch)

    const router = useRouter()
    const pageChangeHandler = (page: number) => {
      const query = override(route.query, { page })
      router.push({ query })
    }

    return { state, pageChangeHandler }
  },
})
</script>
