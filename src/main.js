import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import MainView from './views/MainView.vue'
import SentimentView from './views/SentimentView.vue'
import SummarizationView from './views/SummarizationView.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainView
  },
  {
    path: '/sentiment/:sentiment',
    name: 'Sentiment',
    component: SentimentView,
    props: true
  },
  {
    path: '/summarization/:summarization',
    name: 'Summarization',
    component: SummarizationView,
    props: true
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

createApp(App).use(router).mount('#app')
