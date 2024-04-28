<template>
  <div id = "app">
    <img src="./assets/logo.png" alt="Vue logo">
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <h1>{{greetings}}</h1>
    <ul>
      <li v-for="number in numbers" :key="number"><h1>{{number}}</h1></li>
    </ul>
    <h1>{{person.name}}</h1>
    <button @click="increase">👍+1</button>
    <br>
    <button @click="updateGreeting">Update Title</button>
  </div>
</template>

<script lang="ts">
// 简单计数器
import { ref, computed, reactive, toRefs, onMounted, onUpdated, onRenderTriggered, watch } from 'vue'
// 新建一个类型
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
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
    // 使用reactive包裹对象
    // const count = ref(0)
    // // conputed含有一个函数回调可以处理他的值
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   count.value++
    // }
    // 初始化打印
    onMounted(() => {
      console.log('mounted')
    })
    // 更新后打印
    onUpdated(() => {
      console.log('updated')
    })
    // 监听
    // set更新值：{effect: ReactiveEffect, target: ComputedRefImpl, type: 'set', key: 'value', newValue: undefined}
    onRenderTriggered((event) => {
      console.log(event)
    })
    const data: DataProps = reactive({
      count: 0,
      increase: () => { data.count++ },
      // typescript报错：类型错误=>computed回调中使用data.count会推断为darta:any：需要新建一个类型
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {}
    })
    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'Hello!'
    }
    // 回调函数分别指代新的值和旧的值
    // 若想watch多个值则[]双管齐下，data为reactive对象为Proxy对调试不友好则取data.count，取出来warn:（拿出来是number) watch必须是一个响应式对象和[function]即可
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log('old', oldValue)
      console.log('new', newValue)
      document.title = 'updated' + greetings.value + data.count
    })
    data.numbers[0] = 5
    data.person.name = 'viking'
    const refData = toRefs(data)
    return {
      // 使用reactive包裹对象
      // data在template需要data.
      // 使用ES6语法将对象展开：无效（检查是否为响应式对象）
      // ...data
      // count: data.count,
      // increase: data.increase,
      // double: data.double
      // 因为普通的javascript类型而不是响应式的类型，从响应式的对象中取出来会丧失响应性
      // toRefs解决：接受一个reactive对象作为参数返回一个普通的对象（Ref类型）
      ...refData, // 展开的每一项即为响应式对象
      greetings,
      updateGreeting
      // // Vue3：精确控制哪些属性和方法可以被导出使用
      // // 更好追踪引用和更新的情况
      // count,
      // increase,
      // double
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
