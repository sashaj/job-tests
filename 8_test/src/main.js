import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store.js'
import router from './router/router.js'
import './assets/styles/styles.scss'
import "material-design-icons-iconfont"

Vue.config.contactionTip = false

new Vue({
   store,
   router,
  render: h => h(App),
 
}).$mount('#app')
