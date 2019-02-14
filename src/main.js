import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'


import './plugins/bootstrap-vue'

import './plugins/axios'

Vue.config.productionTip = false
Vue.use(VueSweetalert2)


new Vue({
  render: h => h(App),
  
}).$mount('#app')

