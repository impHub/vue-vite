<template>
  <div>
    <HelloWorld />
  </div>
</template>

<script>
import { computed, reactive, onMounted, onUnmounted, ref, toRefs } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
}
</script>
