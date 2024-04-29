// 使用习惯：抽离出具体的功能
import {ref, onMounted, onUnmounted } from 'vue'
// 新建一个函数抽象逻辑功能
function useMousePosition() {
    // 捕捉当前鼠标坐标：两个响应式对象记录x、y位置
    // 初始化
    const x = ref(0)
    const y = ref(0)
    // 事件点击时更新：点击事件MouseEvent
    const updateMouse = (e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    }
    // 添加事件
    onMounted(() => {
        document.addEventListener('click', updateMouse)
    })
    onUnmounted(() => {
        document.removeEventListener('click', updateMouse)
    })
    return {x, y}
}

// 导出函数
export default useMousePosition