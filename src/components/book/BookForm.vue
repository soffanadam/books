<template>
  <book-field-title class="px-5 pt-5 border-t" />
  <book-field-year class="px-5 pt-5 border-t" />
  <book-field-description class="px-5 pt-5 border-t" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BookFieldTitle from './BookFieldTitle.vue'
import BookFieldYear from './BookFieldYear.vue'
import BookFieldDescription from './BookFieldDescription.vue'

export default defineComponent({
  components: { BookFieldTitle, BookFieldYear, BookFieldDescription },
  setup() {
    //
  },
})
</script>
