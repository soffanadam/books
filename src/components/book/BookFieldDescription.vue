<template>
  <field
    label="Description"
    :error="'description' in state.errors"
    :feedback="state.errors.description"
    required
  >
    <text-input
      :value="state.form.description"
      type="textarea"
      placeholder="What is the book about"
      :error="'description' in state.errors"
      :disabled="state.saving"
      @update:modelValue="inputHandler"
    />
  </field>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent, ComputedRef, computed } from 'vue'
import { State as BookState } from '@/store/modules/book'
import Field from '@/components/ui/form/Field.vue'
import TextInput from '@/components/ui/form/TextInput.vue'

export default defineComponent({
  components: { Field, TextInput },
  setup() {
    const store = useStore()
    const state: ComputedRef<BookState> = computed(() => store.state.book)

    const inputHandler = (value: string) => {
      store.commit('book/UPDATE_FIELD', { key: 'description', value })
    }

    return { state, inputHandler }
  },
})
</script>
