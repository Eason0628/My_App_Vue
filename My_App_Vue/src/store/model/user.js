export default {
    namespaced: true,//开启命名空间
    state: {
        name:'张三'
    },
    mutations: {
        setName(state,value){
            state.name=value
        }
    },
    actions: {
    },
    getters: {
        getName(state){
            return state.name
        }
    }
}
 