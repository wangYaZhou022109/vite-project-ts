<template>
  <img alt="Vue logo" src="./assets/logo.png" @clik="one($event), two($event)"/>
  <ul>
  <template v-for="item in items" :key="item.msg">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation">xxx</li>
  </template>
</ul>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  {{count}}
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    let count:any = ref(0)
    const items = reactive([
      {msg: '1234'},
      {msg: '1235'},
      {msg: '1236'},
      {msg: '1237'},
    ])
    const one = (event: any) => {
      console.log('one', event)
    // 第一个事件处理器逻辑...
  }
  const two = (event: any)=> {
   // 第二个事件处理器逻辑...
   console.log('two', event)
  }
    function action() {
      count++
    }
    return {count, items, one, two}
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>