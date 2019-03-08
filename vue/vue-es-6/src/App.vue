<template>
  <div id="app">
    <div v-if="shouldIf">if</div>
    <abc />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <TodoList />
    <button @click="onClick">count {{a.b.c}}</button>
    <!-- <div v-highlight>abc</div> -->
    <!-- <Counter /> -->
    <Dynamic/>
    <CustomRender>
      <div>hello customRender</div>
      <div>2</div>
    </CustomRender>
    <ChildTest>
      <!-- <div>slots default</div> -->
    </ChildTest>
    <router-view v-if="logined"></router-view>
    <!-- <Dialog :visible="visible" title="abc" :appendToBody="visible">
      dialog {{hello1}} {{hello}}
    </Dialog> -->
    <input type="text" v-model="a.b.c" />
    <Modal :visible="visible">
      <div>my modal {{a.b.c}}</div>
    </Modal>
    <Sms />
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
// import HelloWorld from './components/HelloWorld.vue'
import Welcome from './components/Welcome.js'
import TodoList from './components/TodoList.vue'
// import Highlight from './components/Highlight.vue'
// import Counter from './components/Counter.vue'
import Dynamic from './components/Dynamic/'
import CustomRender from './components/CustomRender'
import { setTimeout } from 'timers'
import ChildTest from './components/ChildTest'
import { Dialog } from 'element-ui'
import Modal from './components/Modal'
import Sms from './features/sms/containers/sms'

export default {
  name: 'app',
  components: {
    Sms,
    // HelloWorld,
    abc: Welcome,
    Dynamic,
    CustomRender,
    ChildTest,
    TodoList,
    Dialog,
    Modal,
    // Counter
  },
  // directives: {
  //   Highlight
  // },
  minxi: [
    {
      computed: {
        hello1: function(){
          return 'abc'
        }
      }
    }
  ],
  data: function(){
    return {
      shouldIf: true,
      a: {
        b: {
          c: 1
        }
      },
      count: 1,
      logined: false,
      visible: false
    }
  },
  computed: {
    hello: function(){
      return 'ddd'
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
      this.shouldIf = !this.shouldIf
      this.a.b.c += 1
      this.visible = true
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
