<template>

<div class="student-list">
  <div class="item" @click="detail(item.id)" v-for="(item, index) in list" :key="index">
      {{item.name}}
      {{item.age}}
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from 'vue'
// import router from '../../router'
export default defineComponent({
    props: ['myRoute'],
  setup (props, context) {
    //   console.log(props, context)
    const router = inject('Route') as any
    const list = reactive([
        { id: 1, name: 'zhangsan', age: 12, other: '....'},
        { id: 2, name: 'zhangwu', age: 32, other: '....'},
        { id: 3, name: 'xxx', age: 12, other: '....'},
        { id: 4, name: 'ewrwrw', age: 2, other: '....'},
        { id: 5, name: 'hjell', age: 1, other: '....'},
    ])
    const detail = (id: number) => {
        router.push({
            name: 'stuDetail',
            params: {
                id
            }
        })
    }
    return {
        list,
        detail
    }
  }
})
</script>

<style scoped lang="less">
.student-list {
    padding: 20px;
    .item {
        padding: 10px;
        cursor: pointer;
    }
}
</style>
