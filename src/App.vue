<template>
  <div id = "app">
    <img src="./assets/logo.png" alt="Vue logo">
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <h1>{{greetings}}</h1>
    <p>{{error}}</p>
    <Suspense>
      <template #default>
        <!-- 需要等待加载的异步内容 -->
        <div>
          <async-show />
          <dog-show />
        </div>
      </template>
      <template #fallback>
        <!-- 加载时显示的内容 -->
        <h1>Loading !...</h1>
      </template>
    </Suspense>
    <button @click="openModal">Open Modal</button>
    <br>
    <h1 v-if="loading">Loading!...</h1>
    <!-- ':src'将Vue实例中的表达式结果作为实际的src属性值进行渲染 -->
    <!-- 狗狗 -->
    <!-- <img v-if="loaded" :src="result.message" > -->
    <!-- 猫猫 -->
    <img v-if="loaded" :src="result[0].url" >
    <ul>
      <li v-for="number in numbers" :key="number"><h1>{{number}}</h1></li>
    </ul>
    <h1>{{person.name}}</h1>
    <h1>X:{{x}}, Y{{y}}</h1>
    <!-- 直接使用嵌套在其他结构中 -->
    <modal :isOpen="modalIsOpen" @close-modal="onModalClose"> My Modal !!!!</modal>
    <button @click="increase">👍+1</button>
    <br>
    <button @click="updateGreeting">Update Title</button>
  </div>
</template>

<script lang="ts">
// 简单计数器
import { ref, computed, reactive, toRefs, onUpdated, onRenderTriggered, watch, onMounted, onUnmounted, onErrorCaptured } from 'vue'
// 引用函数
import useMousePosistion from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
import Modal from './components/ModalWindow.vue';
import AsyncShow from './components/AsyncShow.vue';
import DogShow from './components/DogShow.vue' 
// 新建一个类型
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
// Dog API
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default {
  name: 'App',
  components: { 
    Modal,
    AsyncShow,
    DogShow,
  },
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
    // 捕获Suspense错误
    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      return true
    })
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
    const { x, y }= useMousePosistion() // X、Y均为Ref，已实现代码重用
    // const { result, loading, loaded } = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
    const { result, loading, loaded } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    watch(result, () => {
      // 需要传入相关类型[泛型]
      // console.log(result.value.message)
      // 联合类型首先判断是否存在
      if(result.value) {
        // 狗狗
        // console.log('value', result.value.message)
        // 猫猫
        console.log('value', result.value[0].url)
      }
    })
    // // [弃用]已在函数中抽离出具体的功能
    // // 捕捉当前鼠标坐标：两个响应式对象记录x、y位置
    // // 初始化
    // const x = ref(0)
    // const y = ref(0)
    // // 事件点击时更新：点击事件MouseEvent
    // const updateMouse = (e: MouseEvent) => {
    //   x.value = e.pageX
    //   y.value = e.pageY
    // }
    // // 添加事件
    // onMounted(() => {
    //   document.addEventListener('click', updateMouse)
    // })
    // onUnmounted(() => {
    //   document.removeEventListener('click', updateMouse)
    // })
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log('old', oldValue)
      console.log('new', newValue)
      document.title = 'updated' + greetings.value + data.count
    })
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
    // 响应式对象控制全局提示框是否显示
    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }
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
      updateGreeting,
      x,
      y,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose,
      error,
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
