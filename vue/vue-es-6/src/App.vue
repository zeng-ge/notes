<template>
  <div id="app">
    <abc />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <TodoList /> -->
    <button @click="onClick">count {{a.b.c}}</button>
    <!-- <div v-highlight>abc</div> -->
    <!-- <Counter /> -->
    <Dynamic/>
    <CustomRender>
      <div>hello customRender</div>
      <div>2</div>
    </CustomRender>
    <router-view v-if="logined"></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Welcome from './components/Welcome.js'
// import TodoList from './components/TodoList.vue'
// import Highlight from './components/Highlight.vue'
// import Counter from './components/Counter.vue'
import Dynamic from './components/Dynamic/'
import CustomRender from './components/CustomRender'
import { setTimeout } from 'timers';

export default {
  name: 'app',
  components: {
    // HelloWorld,
    abc: Welcome,
    Dynamic,
    CustomRender,
    // TodoList,
    // Counter
  },
  // directives: {
  //   Highlight
  // },
  data: function(){
    return {
      a: {
        b: {
          c: 1
        }
      },
      count: 1,
      logined: false
    }
  },
  mounted: function() {
    console.log('app mounted')
    setTimeout(() => {
      this.logined = true
    }, 2000)
  },
  methods: {
    onClick: function(){
      this.a.b.c += 1
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
