<template>
  <div @click="$emit('my-click')">
    自定义事件
  </div>
</template>

<script>
export default {
  // 仅被自定义事件处理不会触发原生click事件
  //   emits: ['click']
}
</script>

<style>
</style>