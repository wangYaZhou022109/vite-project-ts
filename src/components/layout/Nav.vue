<template>
  <ul class="nav">
    <li class="user" @click="jump('stuList')">学员</li>
    <li class="user" @click="jump('user')">用户</li>
    <li class="user" @click="jump('msg')">消息</li>
    <li class="user" @click="jump('com')">组件</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '../../router'
export default defineComponent({
  setup (props) {
    const jump = (type: string) => {
      router.push({
        name: type
      })
    }
    return {
      jump
    }
  }
})
</script>

<style scoped lang="less">
.nav {
  height: 100vh;
  width: 60px;
  background: orange;
  li {
    padding: 20px 0;
    text-align: center;
    cursor: pointer;
  }
}
</style>
