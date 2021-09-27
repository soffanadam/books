<template>
  <div :class="classObject">
    <div v-if="label || inline" :class="labelClassObject">
      <slot name="label">{{ label }}</slot>
    </div>
    <div :class="fieldClassObject">
      <slot />
      <p v-if="error && feedback" class="field__feedback">
        {{ typeof feedback === 'string' ? feedback : feedback[0] }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { FormSizes } from '.'

export default defineComponent({
  props: {
    label: { type: String, default: '' },
    labelClass: { type: [String, Object], default: '' },
    fieldClass: { type: [String, Object], default: '' },
    error: { type: Boolean, default: false },
    feedback: { type: [String, Array], default: '' },
    inline: { type: Boolean, default: false },
    size: { type: String as () => FormSizes, default: FormSizes.medium },
  },
  setup(props) {
    const classObject = computed(() => [
      'field',
      { 'field--error': props.error },
      { 'field--inline': props.inline },
      { 'field--sm': props.size === FormSizes.small },
      { 'field--lg': props.size === FormSizes.large },
    ])

    const labelClassObject = computed(() => ['field__label', props.labelClass])

    const fieldClassObject = computed(() => ['field__input', props.fieldClass])

    return { classObject, labelClassObject, fieldClassObject }
  },
})
</script>
