<template>
  <div>
    <SearchForm @submit="onSubmit" :form="form"/>
    <List @next="onNext" @prev="onPrev" :currentPage="currentPage"/>
  </div>
</template>
<script>
import List from '../../components/List'
import SearchForm from '../../components/SearchForm'

export default {
  components: {
    List,
    SearchForm
  },
  data () {
    return {
      currentPage: 1,
      form: {
        name: ''
      }//这个form传递给searchform, 这样search form里面值变化时，从this.form里面能拿到最新的值
    }
  },
  methods: {
    onNext () {
      ++this.currentPage
      console.log(this.form)
    },
    onPrev () {
      --this.currentPage
      console.log(this.form)
    },
    onSubmit () {
      console.log(this.form)
    }
  }
}
</script>

