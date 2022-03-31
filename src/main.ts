import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import { ElMessage } from 'element-plus'

createApp(App)
.use(router)
.use(createPinia())
.use(ElementPlus)
.mount('#app')
