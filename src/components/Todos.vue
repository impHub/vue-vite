<template>
  <div>
    <!-- 新增todo -->
    <input
      type="text"
      v-model="newTodo"
      @keyup.enter="addTodo"
      autofocus
      placeholder="今日待办"
      autocomplete="off"
    >
    <!-- todo列表 -->
    <ul>
      <li
        v-for="todo in filterTodos"
        :key="todo.id"
        :class="{completed:todo.completed, editing: todo === editedTodo}"
      >
        <!-- 绑定完成状态 -->
        <div class="view">
          <input
            type="checkbox"
            v-model="todo.completed"
          >
          <label @dblclick="editTodo(todo)">{{todo.title}}</label>
          <button @click="removeTodo(todo)">X</button>
        </div>
        <!-- 编辑待办 -->
        <input
          type="text"
          class="edit"
          v-todo-focus="todo === editedTodo"
          v-model="todo.title"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(todo)"
        />
      </li>
    </ul>
    <!-- 过滤 -->
    <p class="filters">
      <span
        @click="visibility = 'all'"
        :class="{selected : visibility === 'all'}"
      >All</span>
      <span
        @click="visibility = 'active'"
        :class="{selected : visibility === 'active'}"
      >Active</span>
      <span
        @click="visibility = 'completed'"
        :class="{selected : visibility === 'completed'}"
      >Completed</span>
    </p>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watchEffect } from 'vue'
const filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => !todo.completed)
  },
  completed(todos) {
    return todos.filter(todo => todo.completed)
  }
}
// 缓存操作
const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem('vue3-todos') || '[]')
    todos.forEach((todo, index) => {
      todo.id = index + 1
    });
    return todos
  },
  save(todos) {
    localStorage.setItem('vue3-todos', JSON.stringify(todos))
  }
}
export default {
  setup() {
    const state = reactive({
      newTodo: '',
      todos: todoStorage.fetch(),
      beforeEditCache: '', // 缓存编辑前的title
      editedTodo: null, //正在编辑的todo
      visibility: 'all',
      filterTodos: computed(() => {
        return filters[state.visibility](state.todos)
      })
    });
    function addTodo() {
      state.todos.push({
        id: state.todos.length + 1,
        title: state.newTodo,
        completed: false
      })
      state.newTodo = ''
    }
    // 删除
    function removeTodo(todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    }
    // 双击后赋值
    function editTodo(todo) {

      state.beforeEditCache = todo.title
      state.editedTodo = todo
      console.log(todo === state.editedTodo);
    }
    // 使用esc后,取消修改
    function cancelEdit(todo) {
      todo.title = state.beforeEditCache
      state.editedTodo = null
    }
    // 用户回车或失去焦点(完成)
    function doneEdit(todo) {
      state.editedTodo = null
    }
    watchEffect(() => {
      todoStorage.save(state.todos)
    })

    return {
      ...toRefs(state),
      addTodo,
      removeTodo,
      editTodo,
      cancelEdit,
      doneEdit
    }
  },
  // 自定义指令
  directives: {
    "todo-focus": (el, { value }) => {
      if (value) {
        // 聚焦
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
.completed label {
  text-decoration: line-through;
}
.edit,
.editing .view {
  display: none;
}
.view,
.editing .edit {
  display: block;
}
.filters > span {
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}
.filters > span.selected {
  border-color: teal;
}
</style>