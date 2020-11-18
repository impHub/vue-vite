<template>
  <div>
    <Todos />
  </div>
</template>

<script>
import { computed, reactive, onMounted, onUnmounted, ref, toRefs } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Todos from './components/todos/Todos.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Todos
  },
}
</script>
