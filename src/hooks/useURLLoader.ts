import { ref } from 'vue'
import axios from 'axios'

function useURLLoader (url: string) {
    // Ref代表不同的状态和结果
    const result = ref(null)
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