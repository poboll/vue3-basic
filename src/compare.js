// 对比Ref和Reactive区别
// style 1: separate variables（Ref）
let x = 0
let y = 0

// 特殊时刻更新
function updateNumber() {
    x = 2
    y = 3
}

// -- compared to --

// style 2: single object（Reactive）
const pos = {
    x: 0,
    y: 0
}

// 特殊时刻更新
function updateObject() {
    pos.x = 2
    pos.v = 3
}

// 只有在一起的时候才能更新，单独更新会丧失响应式
const { x } = pos
pos.x = 3