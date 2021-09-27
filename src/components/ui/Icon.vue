<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span class="inline-flex justify-center" v-html="content"></span>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Icon from '@/assets/js/ui/icon.js'

export default defineComponent({
  props: {
    name: { type: String, required: true },
    attrs: { type: Object, default: () => ({}) },
  },
  setup(props) {
    const content = ref('')

    // Load icon
    ;(async () => {
      const icon = new Icon(props.name, props.attrs)
      await icon.load()
      content.value = icon.toSvg()
    })()

    return { content }
  },
})
</script>
