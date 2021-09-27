<template>
  <div class="p-5 border-t">
    <div class="text-2xl">{{ state.book.year }}</div>
    Year
  </div>
  <div class="p-5 border-t">
    Description
    <div class="text-2xl">{{ state.book.description }}</div>
  </div>
  <div class="p-5 border-t flex">
    <btn
      variant="outline"
      class="danger-500 ml-auto"
      @click="deleteClickHandler"
    >
      <icon name="md_twotone:delete" />
      Delete
    </btn>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue'
import { notify } from '@kyvg/vue3-notification'
import { useStore } from '@/store'
import { State as BookState } from '@/store/modules/book'
import Btn from '@/components/ui/form/Btn.vue'
import Icon from '@/components/ui/Icon.vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: { Btn, Icon },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const state: ComputedRef<BookState> = computed(() => store.state.book)

    const deleteClickHandler = async () => {
      try {
        await store.dispatch('book/delete', route.params.id)

        notify({
          type: 'success',
          title: 'Success',
          text: 'Book deleted',
        })

        router.push({ path: '/books' })
      } catch (error) {
        notify({
          type: 'error',
          title: 'Error',
          text: 'Delete error',
        })
      }
    }

    return { state, deleteClickHandler }
  },
})
</script>
