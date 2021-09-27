<template>
  <div class="py-3 px-5 hover:bg-yellow-50 flex items-center group">
    <book-link :book="book" class="text-xl flex-1">
      <span class="font-normal text-xl">{{ book.title }}</span>
      <small class="text-gray-400 ml-4">({{ book.year }})</small>
    </book-link>
    <div class="invisible group-hover:visible">
      <book-update-link :book="book">
        <btn variant="icon" class="gray-300">
          <icon name="md_twotone:edit" />
        </btn>
      </book-update-link>
      <btn variant="icon" class="danger-500" @click="deleteClickHandler(book)"
        ><icon name="md_twotone:delete"
      /></btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { notify } from '@kyvg/vue3-notification'
import BookLink from './BookLink.vue'
import { Book } from '@/models/book'
import Btn from '@/components/ui/form/Btn.vue'
import Icon from '@/components/ui/Icon.vue'
import BookUpdateLink from './BookUpdateLink.vue'
import { useStore } from '@/store'

export default defineComponent({
  components: { BookLink, Icon, Btn, BookUpdateLink },
  props: {
    book: { type: Object as () => Book, required: true },
  },
  emits: ['deleted'],
  setup(props, { emit }) {
    const store = useStore()

    const deleteClickHandler = async (book: Book) => {
      try {
        await store.dispatch('book/delete', book.id)

        notify({
          type: 'success',
          title: 'Success',
          text: 'Book deleted',
        })

        emit('deleted', book)
      } catch (error) {
        notify({
          type: 'error',
          title: 'Error',
          text: 'Delete error',
        })
      }
    }

    return { deleteClickHandler }
  },
})
</script>
