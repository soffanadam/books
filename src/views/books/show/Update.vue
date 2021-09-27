<template>
  <form @submit.prevent="submitHandler">
    <book-form />
    <div class="p-5 border-t">
      <btn type="submit" class="w-full">Save</btn>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { notify } from '@kyvg/vue3-notification'
import BookForm from '@/components/book/BookForm.vue'
import Btn from '@/components/ui/form/Btn.vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { url as bookLinkUrl } from '@/components/book/BookLink.vue'

export default defineComponent({
  components: { BookForm, Btn },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    store.commit('book/UPDATE')

    const submitHandler = async () => {
      try {
        await store.dispatch('book/save')

        notify({
          type: 'success',
          title: 'Success',
          text: 'Book updated',
        })

        router.push({ path: bookLinkUrl(route.params.id as string) })
      } catch (error) {
        notify({
          type: 'error',
          title: 'Error',
          text: error.message,
        })
      }
    }

    return { submitHandler }
  },
})
</script>
