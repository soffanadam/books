<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  defineAsyncComponent,
  Component,
  ComputedOptions,
  MethodOptions,
  Ref,
} from 'vue'
import { useRoute } from 'vue-router'

const layouts = import.meta.glob('/src/layouts/*.vue')
const layoutComponents: Record<
  string,
  Component<unknown, unknown, unknown, ComputedOptions, MethodOptions>
> = {}
Object.keys(layouts).forEach((path) => {
  const key = path.replace(/^.*[\\/]/, '').replace('.vue', '')
  layoutComponents[key] = defineAsyncComponent(layouts[path])
})

export default defineComponent({
  components: layoutComponents,
  setup() {
    const layout: Ref = ref('empty')
    const route = useRoute()

    watch(
      () => route.meta,
      async (meta) => {
        try {
          if (meta.layout) {
            layout.value = meta.layout
          } else {
            layout.value = 'main'
          }
        } catch (e) {
          layout.value = 'main'
        }
      },
      { immediate: true }
    )

    return { layout }
  },
})
</script>
