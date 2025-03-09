import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createBootstrap} from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);


const app = createApp(App)
app.use(createBootstrap)
app.component('font-awesome-icon',FontAwesomeIcon)
app.mount('#app')

