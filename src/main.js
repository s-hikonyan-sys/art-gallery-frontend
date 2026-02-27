import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Gallery from './views/Gallery.vue'
import ArtworkDetail from './views/ArtworkDetail.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import './styles/main.css'

const routes = [
  { path: '/', component: Home },
  { path: '/gallery', component: Gallery },
  { path: '/artwork/:id', component: ArtworkDetail },
  { path: '/about', component: About },
  { path: '/contact', component: Contact }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')


