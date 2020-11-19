<template>
  <li :class="{completed:todo.completed, editing: todo === editedTodo}">
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
    <EditTodo
      class="edit"
      v-todo-focus="todo === editedTodo"
      v-model:todoTitle="todo.title"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.escape="cancelEdit(todo)"
    />
  </li>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  // 输入
  props: {
    todo: {
      type: Object,
      required: true
    },
    editedTodo: Object
  },
  //   输出
  emits: ['removeTodo', 'update:edited-todo'],
  setup(props, { emit }) {
    const state = reactive({
      beforeEditCache: '', // 缓存编辑前的title
    });
    // 删除
    function removeTodo(todo) {
      emit('removeTodo', todo)
    }
    // 1.双击后赋值
    function editTodo(todo) {
      state.beforeEditCache = todo.title
      console.log(todo);
      //   state.editedTodo = todo
      // editing: todo === editedTodo改变class
      emit('update:edited-todo', todo)
    }
    // 使用esc后,取消修改
    function cancelEdit(todo) {
      // 把缓存的值赋值回去
      todo.title = state.beforeEditCache
      //   state.editedTodo = null
      emit('update:edited-todo', null)
    }
    // 用户回车或失去焦点(完成)
    function doneEdit(todo) {
      //   state.editedTodo = null
      emit('update:edited-todo', null)
    }

    return {
      ...toRefs(state),
      removeTodo,
      editTodo, cancelEdit, doneEdit
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