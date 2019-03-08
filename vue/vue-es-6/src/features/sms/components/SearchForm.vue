<template>
  <div>
    <input type="text" name="name" v-model="form.name"/>
    <button @click="onSubmit">submit</button>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    }
  },
  methods: {
    onSubmit () {
      this.$listeners.submit(this.form.name)
    }
  }
}
</script>


