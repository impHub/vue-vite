import { reactive, computed } from 'vue'
const filters = {
    all(todos) {
        return todos
    },
    active(todos) {
        return todos.filter(todo => !todo.completed)
    },
    completed(todos) {
        return todos.filter(todo => todo.completed)
    }
}

export function useFiltr(todos) {
    const filterState = reactive({
        beforeEditCache: '', // 缓存编辑前的title
        visibility: 'all', //当前item
        filtersArr: ['all', 'active', 'completed'],
        filterTodos: computed(() => {
            return filters[filterState.visibility](todos.value)
        })
    });
    console.log(filterState.filtersArr);
    return filterState
}