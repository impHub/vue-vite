<template>
  <div>
    <!-- 新增todo -->
    <EditTodo
      v-model:todoTitle="newTodo"
      @keyup.enter="addTodo"
      autofocus
      placeholder="今日待办"
      autocomplete="off"
    ></EditTodo>
    <!-- todo列表 -->
    <ul>
      <todo-item
        v-for="todo in filterTodos"
        :key="todo.id"
        :todo="todo"
        v-model:edited-todo="editedTodo"
        @removeTodo="removeTodo"
      >

    </ul>
    <!-- 过滤 -->
    <p class="filters">
      <span
        v-for="(item, index) in filtersArr"
        :key="index"
        @click="visibility = item"
        :class="{selected : visibility === item}"
      >
        {{item}}
      </span>
      <!-- <span
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
      >Completed</span> -->
    </p>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watchEffect } from 'vue'
import TodoItem from './TodoItem.vue'
// import EditTodo from './EditTodo.vue'
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
  components: { TodoItem },
  // components: { EditTodo },
  setup() {
    const state = reactive({
      newTodo: '',
      todos: todoStorage.fetch(),
      beforeEditCache: '', // 缓存编辑前的title
      editedTodo: null, //正在编辑的todo
      visibility: 'all', //当前item
      filtersArr: ['all', 'active', 'completed'],
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
    watchEffect(() => {
      todoStorage.save(state.todos)
    })

    return {
      ...toRefs(state),
      addTodo,
      removeTodo,
    }
  },

}
</script>

<style scoped>
.completed label {
  text-decoration: line-through;
}
/* edit:none,view:block默认class
当双击是显示editing;
view:none; edit:block */
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