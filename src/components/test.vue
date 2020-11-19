<template>
  <div>
    <h4>test</h4>
    <div>name: {{name}}</div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      name: 'yu',
      obj: { age: 11 }
    })
    console.log(state.name);
    return { ...toRefs(state) }
  }
}
</script>

<style>
</style>