<template>
  <div class="bg-white p-5">
    <router-link to="/books" class="mb-2 inline-flex items-center"
      ><icon
        name="md_twotone:chevron-left"
        class="mr-2 mb-1"
      />Back</router-link
    >
    <h1 class="text-3xl font-normal">New Book</h1>
  </div>
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
import Icon from '@/components/ui/Icon.vue'
import BookForm from '@/components/book/BookForm.vue'
import Btn from '@/components/ui/form/Btn.vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { Icon, BookForm, Btn },
  setup() {
    const store = useStore()
    const router = useRouter()

    const submitHandler = async () => {
      try {
        const book = await store.dispatch('book/store')

        notify({
          type: 'success',
          title: 'Success',
          text: 'New book created',
        })

        router.push({ path: `/books/${book.id}` })
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
