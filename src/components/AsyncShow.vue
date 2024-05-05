<template>
    <h1>{{result}}</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        // 由于return异步可以用Suspense处理
        return new Promise((resolve) => {
            setTimeout(() => {
                // 三秒后返回
                return resolve({
                    result: 42
                })
            }, 3000)
        })
    },
})
</script>
