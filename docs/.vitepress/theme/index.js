import DefaultTheme from 'vitepress/theme'
import ValineComment from '../../ValineComment/index.vue'
import MyLayout from './MyLayout.vue'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that injects the slots
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('ValineComment', ValineComment)
  }
}