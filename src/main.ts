import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// import {validateDirective,validateSubmit} from '../library/index'
// import '../library/validate.css'

// Vue.directive('validate', validateDirective)
// Vue.prototype.$validate = validateSubmit

new Vue({
  render: h => h(App),
}).$mount('#app')
