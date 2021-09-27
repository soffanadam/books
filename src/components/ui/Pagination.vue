<template>
  <ul v-if="total > 0" class="pagination">
    <li
      :class="[
        'pagination__item flex-1 md:flex-initial text-center',
        { disabled: current <= 1 },
      ]"
      @click.stop.prevent="prevHandler"
    >
      <svg-icon name="chevron_left" />
    </li>
    <template v-if="simple">
      <li class="pagination__item">
        <input
          class="w-16 text-center"
          type="text"
          :value="current"
          @keydown.enter="toPageHandler($event.target.value)"
          @input="inputHandler($event)"
        />
      </li>
    </template>
    <template v-else>
      <li class="pagination__item md:hidden">
        <input
          class="w-16 text-center"
          type="text"
          :value="current"
          @keydown.enter="toPageHandler($event.target.value)"
          @input="inputHandler($event)"
        />
      </li>
      <li
        :class="['pagination__item hidden md:block', { active: current === 1 }]"
        @click.stop.prevent="firstHandler"
      >
        1
      </li>
      <li
        v-if="pages > 5 && current > 3"
        class="pagination__item disabled hidden md:block"
      >
        ...
      </li>
      <template v-for="i in pages">
        <li
          v-if="inFive(i)"
          :key="i"
          :class="[
            'pagination__item hidden md:block',
            { active: current == i },
          ]"
          @click.stop.prevent="clickHandler(i)"
        >
          {{ i }}
        </li>
      </template>
      <li
        v-if="pages > 5 && pages - current > 3"
        class="pagination__item disabled hidden md:block"
      >
        ...
      </li>
      <li
        v-if="pages > 1"
        :class="[
          'pagination__item hidden md:block',
          { active: current === pages },
        ]"
        @click.stop.prevent="lastHandler"
      >
        {{ pages }}
      </li>
    </template>
    <li
      :class="[
        'pagination__item flex-1 md:flex-initial text-center',
        { disabled: current >= pages },
      ]"
      @click.stop.prevent="nextHandler"
    >
      <svg-icon name="chevron_right" />
    </li>
    <li
      class="
        pagination__item
        total
        w-full
        md:w-auto
        text-center
        md:text-right
        mt-5
        md:mt-0
      "
      v-html="totalRender(total, [(current - 1) * rows + 1, current * rows])"
    ></li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    total: { type: Number, required: true },
    current: { type: Number, default: 1 },
    rows: { type: Number, default: 10 },
    simple: { type: Boolean, default: false },
    totalRender: {
      type: Function,
      default: (total: number, range: number[]) =>
        `${range[0]}-${range[1]} / ${total}`,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const pages = computed(() => Math.ceil(props.total / props.rows))

    const clickHandler = (page: number) => {
      if (page !== props.current) {
        emit('change', page)
      }
    }

    const toPageHandler = (v: string) => {
      if (/^\s*$/.test(v)) {
        clickHandler(props.current)
      } else {
        clickHandler(Number(v))
      }
    }

    const inputHandler = (e: Event) => {
      const target = e.target as HTMLInputElement
      const v = target.value

      if (/^\s*$/.test(v)) {
        return
      }

      if (
        !(/(^\d+$)/.test(v) && parseInt(v) >= 1 && parseInt(v) <= pages.value)
      ) {
        target.value = String(props.current)
      }
    }

    const firstHandler = () => {
      if (props.current > 1) {
        emit('change', 1)
      }
    }

    const lastHandler = () => {
      if (props.current < pages.value) {
        emit('change', pages)
      }
    }

    const prevHandler = () => {
      if (props.current > 1) {
        emit('change', props.current - 1)
      }
    }

    const nextHandler = () => {
      if (props.current < pages.value) {
        emit('change', props.current + 1)
      }
    }

    const inFive = (index: number) => {
      if (index > 1 && index < pages.value) {
        let before = props.current - 2
        let after = props.current + 2
        if (before <= 0) after -= before - 1
        if (after >= pages.value) {
          before -= after - pages.value
          after = index
        }

        if (before <= index && after >= index) return true
        return false
      }
      return false
    }

    return {
      pages,
      clickHandler,
      toPageHandler,
      inputHandler,
      firstHandler,
      lastHandler,
      prevHandler,
      nextHandler,
      inFive,
    }
  },
})
</script>
