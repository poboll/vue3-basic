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
访问http://localhost:8000即可

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
