<template>
  <div class="modal" v-if="visible">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted: function () {
    const container = document.createElement('div')
    container.className="model-wrapper"
    document.body.appendChild(container)
    container.appendChild(this.$el)
  }
}
</script>

