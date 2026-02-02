import { createStore } from 'vuex'
import user from './model/user'

const store = createStore({
    modules: {
        user
    }
})
export default store
