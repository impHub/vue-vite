<template>
  <p class="filters">
    <span
      v-for="(item, index) in filtersArr"
      :key="index"
      @click="$emit('update:visibility', item)"
      :class="{selected : visibility === item}"
    >
      {{item}}
    </span>
  </p>
</template>

<script>
export default {
  props: ['filtersArr', 'visibility'],
  emits: ['update:visibility']
}
</script>

<style scoped>
.filters > span {
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}
.filters > span.selected {
  border-color: teal;
}
</style>