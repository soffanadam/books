<template>
  <div :class="classObject">
    <textarea
      v-if="type == 'textarea'"
      v-bind="$attrs"
      @input="updateHandler"
    />
    <input v-else v-bind="$attrs" @input="updateHandler" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { FormSizes } from '@/components/ui/form'

export default defineComponent({
  inheritAttrs: false,
  props: {
    type: { type: String, default: 'text' },
    size: { type: String as () => FormSizes, default: FormSizes.medium },
    error: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const classObject = computed(() => {
      return [
        'text-input',
        { 'text-input--error': props.error },
        { 'text-input--sm': props.size === FormSizes.small },
        { 'text-input--lg': props.size === FormSizes.large },
      ]
    })

    const updateHandler = (e: Event) => {
      const target = e.target as HTMLInputElement
      emit('update:modelValue', target.value)
    }

    return { classObject, updateHandler }
  },
})
</script>
