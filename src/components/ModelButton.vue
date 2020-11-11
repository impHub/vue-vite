<template>
  <div>
    <button @click="modelOpen=true">弹出一个莫泰窗口</button>
    <!-- 挂载到body里 -->
    <teleport to="body">
      <div
        v-if="modelOpen"
        class="modal"
      >
        <div>
          这是一个弹窗
          父元素是body
          <button @click="modelOpen = false">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelOpen: false
    }
  }
}
</script>

<style>
</style>