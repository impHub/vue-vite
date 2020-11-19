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
    <Filters
      v-model:visibility="visibility"
      :filtersArr="filtersArr"
    />
    <!-- 回退到看板 -->
    <button @click="backToDash">dashbaoard</button>
  </div>
</template>
<script>
import { reactive, toRefs, watch, } from 'vue'
import TodoItem from './TodoItem.vue'
import Filters from './Filters.vue'
import { useTodos } from './useTodos'
import { useFiltr } from './usefilter'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
export default {
  components: { TodoItem, Filters },
  // components: { EditTodo },
  setup() {
    const todoState = reactive({
      newTodo: '',
      editedTodo: null //正在编辑的todo
    })
    const { todos, addTodo, removeTodo } = useTodos(todoState)
    const filterState = useFiltr(todos);

    //获取路由器实例并使用
    const router = useRouter()
    // route是响应式对象,可以监听
    const route = useRoute()
    watch(() => route.query, query => {
      console.log(query);
    })
    function backToDash() {
      router.push('/')
    }
    // 守卫
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm('你确定离开当前页面吗?')
      console.log(answer);
      if (!answer) {
        // 默认跳转;返回false,就不跳转;
        return false
      }
    })
    return {
      ...toRefs(filterState),
      ...toRefs(todoState),
      addTodo,
      removeTodo,
      backToDash
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