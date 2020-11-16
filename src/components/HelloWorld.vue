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
    <!-- 实例方法定义组件 -->
    <comp></comp>
    <!-- v-model使用 -->
    <VmodelTest v-model:num="num"></VmodelTest>
    <!-- 渲染函数 -->
    <RenderTest v-model:num="num">
      <template v-slot:default>默认插槽</template>
      <template v-slot:num>具名插槽</template>
    </RenderTest>
  </div>
</template>
<script>
import { computed, reactive, onMounted, onUnmounted, ref, toRefs, watch, h } from 'vue'
import { useCounter } from '../utils/useCounter'
import ModelButton from './ModelButton.vue'
import Emits from './Emits.vue'
import VmodelTest from './VmodelTest.vue'
export default {
  name: 'HelloWorld',
  components: {
    ModelButton,
    Emits,
    VmodelTest,
    RenderTest: {
      props: {
        num: {
          type: Number,
          default: 0
        }
      },
      render() {
        // 默认插槽
        this.$slots.default()
        // 具名插槽
        this.$slots.num()
        const num = this.num
        const emit = this.$emit
        console.log(this);
        return h('div', [
          h('div', {
            onClick: this.onClick
          }, `I am RenderTest: ${num}`, [
            this.$slots.default(),
            this.$slots.num()
          ])
        ])
      },
      methods: {
        onClick() {
          this.$emit('update:num', this.num + 1)
        }
      }
    }
  },
  methods: {
    onClick() {
      console.log('Emits');
    }
  },
  data() {
    return {
      num: 9
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
