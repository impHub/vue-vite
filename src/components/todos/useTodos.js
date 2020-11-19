import { ref, watchEffect } from 'vue'
// 缓存操作
const todoStorage = {
    fetch() {
        // 获取缓存里的值
        let todos = JSON.parse(localStorage.getItem('vue3-todos') || '[]')
        todos.forEach((todo, index) => {
            todo.id = index + 1
        });
        return todos
    },
    save(todos) {
        // 把新增的值添加到缓存
        localStorage.setItem('vue3-todos', JSON.stringify(todos))
    }
}

export function useTodos(state) {
    // 初始值
    const todos = ref(todoStorage.fetch())
    console.log(todos.value);
    // 添加
    function addTodo() {
        todos.value.push({
            id: todos.value.length + 1,
            title: state.newTodo,
            completed: false
        })
        state.newTodo = ''
    }
    // 删除
    function removeTodo(todo) { 
        console.log(todo,state.editedTodo);
        todos.value.splice(todos.value.indexOf(todo), 1)
    }
    // 值的改变添加到缓存
    watchEffect(() => {
        todoStorage.save(todos.value)
    })
    return { todos, removeTodo, addTodo }
}