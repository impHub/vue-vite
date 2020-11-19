<template>
  <div
    :class="{active: isActive}"
    @click="navigate"
  >
    {{router.name}}
  </div>
</template>

<script>
export default {
  props: {
    type: Number
  },
  setup() {
    return {}
  }
}
</script>

<style>
</style>