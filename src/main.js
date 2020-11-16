import { createApp, createRenderer, h } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App)
    .component('comp', {
        render: ()=>{
            return h('div', 'I am comp')
        }
    })
    .mount('#app')
// 自定义渲染器
// const nodeOps = {
//     // 处理元素的创建
//     createElement(tag) {
//         return { tag }
//     },
//     // 处理元素的插入
//     insert() {

//     }
// }
// // 自定义渲染器
// createRenderer()