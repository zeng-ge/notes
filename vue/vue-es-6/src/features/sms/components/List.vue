<template>
  <div>
    <span>current page: {{currentPage}}</span>
    <button @click="onPrev">prev</button>
    <button @click="onNext">next</button>
  </div>
</template>

<script>
import { noop } from 'lodash'
export default {
  props: {
    currentPage: {
      type: Number
    }
  },
  methods: {
    onPrev () {
      this.$emit('prev')
    },
    onNext() {
      this.$listeners.next()
    }
  }
}
</script>

