<template>
  <div id = "app">
    <img src="./assets/logo.png" alt="Vue logo">
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <button @click="increase">👍+1</button>
  </div>
</template>

<script lang="ts">
// 简单计数器
import { ref, computed } from 'vue'
export default {
  name: 'App',
  // Vue2
  // data() {
  //   return {
  //     count: 0
  //   };
  // },
  // methods: {
  //   increase(this: { count: number }) {
  //     this.count++;
  //   }
  // }
  setup() {
    // 准备 生命周期之前
    // 响应式对象
    const count = ref(0)
    // conputed含有一个函数回调可以处理他的值
    const double = computed(() => {
      return count.value * 2
    })
    const increase = () => {
      count.value++
    }
    return {
      // Vue3：精确控制哪些属性和方法可以被导出使用
      // 更好追踪引用和更新的情况
      count,
      increase,
      double
    }
  }
};

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
