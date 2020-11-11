import { computed, reactive, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
export const useCounter = () => {
    // counter相关
    const data = reactive({
      counter: 7,
      doubleCounter: computed(() => {
        return data.counter * 2
      })
    })
    let timer
    // 生命周期
    onMounted(() => {
      timer = setInterval(() => {
        data.counter++
      }, 1000)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    return toRefs(data)
  }