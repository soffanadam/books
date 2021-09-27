<template>
  <header>
    <div class="bg-gray-600 px-5 pt-16">
      <div class="container max-w-3xl">
        <div
          class="
            p-5
            bg-gray-500 bg-opacity-50
            border-t border-r border-l border-gray-500
            flex
            justify-between
            items-center
          "
        >
          <h1 class="text-white text-2xl">
            <router-link to="/" class="text-gray-100 hover:text-accent-300"
              >Book Collection</router-link
            >
          </h1>
          <router-link to="/books/create">
            <btn class="accent-300" size="sm">
              <icon name="md_twotone:add" />
              New Book
            </btn>
          </router-link>
        </div>
      </div>
    </div>
  </header>
  <div class="container border border-t-0 bg-gray-50 max-w-3xl mb-16">
    <slot />
  </div>
</template>

<script lang="ts">
import Btn from '@/components/ui/form/Btn.vue'
import Icon from '@/components/ui/Icon.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Btn, Icon },
  //
})
</script>
