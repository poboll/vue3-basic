import { ref } from 'vue'
import axios from 'axios'

// 泛型
function useURLLoader<T> (url: string) {
    // Ref代表不同的状态和结果
    // 希望result获得对应的类型而不是自动类型推断null
    const result = ref<T | null>(null) // 使用时传入类型
    const loading = ref(true)
    const loaded = ref(false)
    const error = ref(null)

    // 发送异步请求
    axios.get(url).then((rawData) => {
        loading.value = false
        loaded.value = true
        result.value = rawData.data
    }).catch(e => {
        error.value = e
        loading.value = false
    })

    return {
        result,
        loading,
        error,
        loaded
    }
    
}

export default useURLLoader