import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import AlanViteComponent from "@xiaomh/vue3-alan-vite-component"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import HomeBackgrount from "./components/HomeBackgrount.vue"
import '@xiaomh/vue3-alan-vite-component/lib/style.css';
import "./global.scss"
export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that injects the slots
  Layout: MyLayout,
  enhanceApp ({ app }) {
    app.use(AlanViteComponent)
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('HomeBackgrount', HomeBackgrount)
  }
}