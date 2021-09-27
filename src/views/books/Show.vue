<template>
  <div class="bg-white p-5">
    <router-link to="/books" class="mb-2 inline-flex items-center"
      ><icon
        name="md_twotone:chevron-left"
        class="mr-2 mb-1"
      />Back</router-link
    >
    <h1 class="text-3xl font-normal">{{ book ? book.title : 'Loading' }}</h1>
    Book Title
  </div>
  <template v-if="book">
    <div class="p-5 border-t">
      <div class="text-2xl">{{ book.year }}</div>
      Year
    </div>
    <div class="p-5 border-t">
      Description
      <div class="text-2xl">{{ book.description }}</div>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import Icon from '@/components/ui/Icon.vue'

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useStore()
    const book = computed(() => store.state.book.book)

    const route = useRoute()
    const fetch = () => {
      store.dispatch('book/show', route.params.id)
    }

    fetch()

    return { book }
  },
})
</script>
