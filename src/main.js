import { createApp, createRenderer, h } from 'vue'
import App from './App.vue'
import './index.css'
import EditTodo from './components/todos/EditTodo.vue'
// 1.引入
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Todos from './components/todos/Todos.vue'
import Dashboard from './components/Dashboard.vue'
// 2.创建
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', component: Dashboard},
        {path: '/todos', component: Todos},
    ]
})
// 特性：动态路由
router.addRoute({
    path: '/about',
    name: 'about',
    component: () => import ('./components/About.vue')
})
// 动态路由指定父级
router.addRoute('about', {
    path: '/about/info',
    component: {
        render() {
            return h('div', 'hahah info')
        }
    }
})
// composition


createApp(App)
    //3.use
    .use(router)
    .component('comp', {
        render: ()=>{
            return h('div', 'I am comp')
        }
    })
    .component('EditTodo', EditTodo)
    .directive('color', (el, dom) => {
        el.style.backgroundColor = dom.value
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