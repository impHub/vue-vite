<template>
  <input
    type="text"
    :value="todoTitle"
    @input="onInputChange"
    v-bind="$attrs"
  >
  <!-- <input
    type="text"
    v-model="newTodo"
    @keyup.enter="addTodo"
    //将父组件中不被认为 props特性绑定的属性传入子组件中
    v-bind="$attrs" //
    autofocus
    placeholder="今日待办"
    autocomplete="off"
  > -->
</template>

<script>
export default {
  props: {
    todoTitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInputChange(e) {
      this.$emit('update:todoTitle', e.target.value)
    }
  }
}
</script>

<style>
</style>