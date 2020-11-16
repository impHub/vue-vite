<template>
  <div @click="$emit('update:num', num + 10)">
    counter: {{num}}
  </div>
</template>

<script>
export default {
  name: 'VmodelTest',
  props: {
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>
</style>