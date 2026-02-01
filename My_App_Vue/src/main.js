import { createApp } from 'vue'
import './style/index.scss'
import App from './App.vue'
import router from './js/router.js'
import './mock/index.js'
const app = createApp(App);
app.use(router);
app.mount('#app');
