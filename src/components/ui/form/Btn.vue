<template>
  <component :is="tagName" v-bind="$attrs" :class="classObject">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { FormSizes } from '@/components/ui/form'

export enum Variant {
  outline = 'outline',
  flat = 'flat',
  icon = 'icon',
  gradient = 'gradient',
}

export enum TagName {
  button = 'button',
  a = 'a',
}

export default defineComponent({
  props: {
    variant: { type: String as () => Variant, default: '' },
    tagName: { type: String as () => TagName, default: TagName.button },
    size: { type: String as () => FormSizes, default: FormSizes.medium },
  },
  setup(props) {
    const classObject = computed(() => [
      'button',
      { 'button--outline': props.variant === Variant.outline },
      { 'button--flat': props.variant === Variant.flat },
      { 'button--icon': props.variant === Variant.icon },
      { 'button--gradient': props.variant === Variant.gradient },
      { 'button--sm': props.size === FormSizes.small },
      { 'button--lg': props.size === FormSizes.large },
    ])

    return { classObject }
  },
})
</script>
