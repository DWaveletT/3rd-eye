import '../node_modules/element-plus/dist/index.css';

import '@/assets/base.scss';

import '@/assets/koishi.scss';
import '@/assets/satori.scss';

import '@/assets/highlight/github.css';
import '@/assets/highlight/github-dark.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
