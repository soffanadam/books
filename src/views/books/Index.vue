<template>
  <div v-if="paginator?.meta?.total" class="flex flex-col">
    <div class="bg-white p-5">
      <h1 class="text-3xl font-normal">Books</h1>
      {{ paginator.meta.total }} books found
    </div>
    <book-row
      v-for="book in paginator.data"
      :key="book.id"
      :book="book"
      class="border-t"
    />
    <pagination
      :total="paginator.meta.total"
      :rows="15"
      :current="$route.query.page"
      class="p-5 border-t"
      @change="pageChangeHandler"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import BookRow from '@/components/book/BookRow.vue'
import Pagination from '@/components/ui/Pagination.vue'
import { override } from '@/utils/query'

export default defineComponent({
  components: { BookRow, Pagination },
  setup() {
    const store = useStore()
    const paginator = computed(() => store.state.book.paginator)

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

    return { paginator, pageChangeHandler }
  },
})
</script>
