## 初识 Vue3.0：新特性

### Vue3新特性巡礼

1. Vue3：两年开发，99位贡献者，2600次提交，628次PR
2. Vue3支持2的大多数特性
3. 官网: [v3.vuejs.org](https://v3.vuejs.org)
4. 性能提升：
   - 打包大小减少41%
   - 初次渲染快55%，更新快133%
   - 内存使用减少54%
5. Composition API（API合集）
   - ref和reactive
   - computed和watch
   - 新的生命周期函数
   - 自定义函数-Hooks函数
6. 其他新增特性
   - Teleport-瞬移组件的位置
   - Suspense-异步加载组件的新福音
   - 全局API的修改和优化
   - 更多的试验性特性
7. 更好的Typescript支持

### Vue2遇到的难题

1. 随着功能的增长，复杂组件的代码变得难以维护、随着复杂度的上升、带来的问题。
    例：List筛选&分页：分散到多个地方=>Mixin
2. Mixin的缺点
   - 命名冲突
   - 不清楚暴露出来变量的作用
   - 重用到其他component经常会遇到的问题
3. Vue2对于typescript的支持非常有限

## 快速创建脚手架

1. 全局安装脚手架

```
npm install -g @vue/cli
```

确认是否成功安装

```
vue --version
```

2. 快速创建脚手架

```
vue create vue3-basic
```

3. 图形化界面

```
vue ui
```

访问 [http://localhost:8000](http://localhost:8000) 即可

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm run serve
```

### Compiles and minifies for production

```
pnpm run build
```

### Lints and fixes files

```
pnpm run lint
```
 
### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


## Vue生命周期

![Vue生命周期](https://cn.vuejs.org/assets/lifecycle_zh-CN.W0MNXI0C.png)

[思维导图](https://whimsical.com/Djb2TcWsLTPeapFdM3NaX)

[组合式 API：生命周期钩子](https://cn.vuejs.org/api/composition-api-lifecycle.html)

> 暴露一系列钩子供开发者操作

每个主要Vue生命周期事件被分成两个钩子，分别在事件之前和之后调用。Vue应用程序中有4个主要事件(8个主要钩子)。

### 1. 创建 — 在组件创建时执行

- `beforeCreate`: 在实例初始化之后，数据观测 (data observation) 和 event/watcher 事件配置之前被调用。
- `created`: 在实例创建完成后被立即调用。实例已完成以下的配置：数据观测 (data observation)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

### 2. 挂载 — DOM 被挂载时执行

- `beforeMount`: 在挂载开始之前被调用：相关的 render 函数首次被调用。
- `mounted`: `el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。

### 3. 更新 — 当响应数据被修改时执行

- `beforeUpdate`: 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
- `updated`: 由于数据更改导致的虚拟 DOM 重新渲染和打补丁后调用。

### 4. 销毁 — 在元素被销毁之前立即运行

- `beforeDestroy`: 在实例销毁之前调用。在这一步，实例仍然完全可用。
- `destroyed`: 在实例销毁之后调用。该钩子被调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

### 完整流程：

1. 新建Vue实例 `new Vue()`
2. 初始化事件&生命周期：`setup`方法
   - `beforeCreate`
   - `created`
3. 初始化注入&校验
4. 是否指定“el”（元素）选项
   - 否：当调用 `vm.$mount(el)` 函数时
   - 是：是否指定“template”（模板）选项
     - 是：将 `template` 编译到 `render` 函数中（渲染）
     - 否：将 `el` 外部的HTML作为 `template` 编译
   - `beforeMount`
5. 创建 `vm.$el` 并用其替换“el”
   - `mounted`
6. 挂载完毕
   - 当响应式数据 `data` 被修改时->`beforeUpdate`
   - 虚拟DOM重新渲染并应用更新
   - `updated`
7. 当调用 `vm.$destroy()` 函数时
   - 卸载`beforeDestroy`->`beforeUnmount`
8. 解除绑定：销毁子组件以及事件监听器
9. 销毁完毕
   - `destroyed`->`unmounted`

### 官方文档

- `onMounted()`: 注册一个回调函数，在组件挂载完成之后执行。
- `onUpdated()`: 注册一个回调函数，在组件因为响应式状态变更而更新其DOM树之后停用。
- `onUnmounted()`: 注册一个回调函数，在组件实例被卸载之后调用。
- `onBeforeMount()`: 注册一个钩子，在组件被挂在之前被调用。
- `onBeforeUpdate()`: 注册一个钩子，在组件即将因为响应式状态变更而更新其DOM树之前被调用。
- `onBeforeUnmount()`: 注册一个钩子，在组件实例被卸载之前调用。
- `onErrorCaptured()`: 注册一个钩子，在捕获了后代组件传递的错误时调用。
- `onRenderTracked()`: 注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。
- `onRenderTriggered()`: 注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。
- `onActivated()`: 注册一个回调函数，若组件实例是`<KeepAlive>`缓存树的一部分，当组件被插入到DOM中时被调用。
- `onDeactivated()`: 注册一个回调函数，若组件实例是`<KeepAlive>`缓存树的一部分，当组件从DOM被一处时调用。
- `onServerPrefetch()`: 注册一个异步函数，在组件实例在服务器上被渲染之前调用。

### 生命周期API映射

- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> `onUnmounted`
- `activated` -> `onActivated`
- `deactivated` -> `onDeactivated`
- `errorCaptured` -> `onErrorCaptured`

### 添加的调试钩子

- `onRenderTracked`
- `onRenderTriggered`

使用CompositionAPI解决：

1. 相关feature结合在一起
2. 更高灵活度

### 模块化&逻辑重用的方法

1. 鼠标追踪器
   - 捕捉当前鼠标坐标

2. 网页状态加载
   实现异步请求Axios
   ```
   // Make a request for a user with a given ID
   axios.get('/user?ID=12345')
   .then(function (response) {
      // handle success
      console.log(response);
   })
   .catch(function (error) {
      // handle error
      console.log(error);
   })
   .finally(function () {
      // always executed
   });
   ```
   [https://dog.ceo/dog-api/](https://dog.ceo/api/breeds/image/random)获取狗狗图片

   模块化结合typescript-泛型改造`<T | null>`
   > 发送任意种类的异步请求
   
   [https://api.thecatapi.com/v1/images/search?limit=1](https://api.thecatapi.com/v1/images/search?limit=1)
   获取猫猫图片