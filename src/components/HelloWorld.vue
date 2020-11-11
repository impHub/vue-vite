<template>
  <div>
    <p>{{doubleCounter}}</p>
    <p>{{counter}}</p>
    <p ref='desc'></p>
    <button>btn</button>
    <!-- Teleport -->
    <ModelButton />
    <!-- Emits选项 -->
    <Emits @my-click="onClick" />
  </div>
</template>
<script>
import { computed, reactive, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { useCounter } from '../utils/useCounter'
import ModelButton from './ModelButton.vue'
import Emits from './Emits.vue'
export default {
  name: 'HelloWorld',
  components: {
    ModelButton,
    Emits
  },
  methods: {
    onClick() {
      console.log('Emits');
    }
  },
  setup() {
    // toRefs
    const { counter, doubleCounter } = useCounter()
    // 其他数据,单值响应式
    const msg2 = ref('some message')
    // 使用元素引用
    const desc = ref(null)
    // watch
    // 如果counter没被toRefs,第一个参数就传函数 () => data.counter
    watch(counter, (val, oldVal) => {
      const p = desc.value
      p.textContent = `${val} to ${oldVal}`
    })


    return { counter, doubleCounter, msg2, desc }
  }
}
// const useCounter = () => {
//   // counter相关
//   const data = reactive({
//     counter: 7,
//     doubleCounter: computed(() => {
//       return data.counter * 2
//     })
//   })
//   let timer
//   // 生命周期
//   onMounted(() => {
//     timer = setInterval(() => {
//       data.counter++
//     }, 1000)
//   })
//   onUnmounted(() => {
//     clearInterval(timer)
//   })
//   return toRefs(data)
// }
</script>
