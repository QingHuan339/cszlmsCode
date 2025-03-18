import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' //路由
import ElementPlus from 'element-plus' 
import 'element-plus/dist/index.css' 

const app = createApp(App)

app.use(ElementPlus)

const elementstyle = document.createElement('style')
elementstyle.textContent = `
    :root {
        --el-color-primary:#1890ff;
    }
`
document.head.appendChild(elementstyle)

app.use(router)

app.mount('#app')
