<template>
<div class="layout">
  <Nav></Nav>
  <div class="content">
  <Header></Header>
  <router-view></router-view>
</div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './Header.vue'
import Nav from './Nav.vue'
export default defineComponent({
  components: { Header, Nav },
    setup(props) {
        
    }


})
</script>

<style scoped lang="less">
.layout {
  display: flex;
  .content {
    flex: 1;
  }
}
</style>
