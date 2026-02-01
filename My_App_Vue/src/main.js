import { createApp } from 'vue'
import './style/index.scss'
import App from './App.vue'
import router from './js/router.js'
import './mock/index.js'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);
app.use(router);
app.use(Antd);
app.mount('#app');
