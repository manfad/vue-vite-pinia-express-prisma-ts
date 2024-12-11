import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

// Set up axios default authorization header if token exists
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app') 