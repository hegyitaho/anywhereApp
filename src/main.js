import Vue from 'vue'
import GAuth from 'vue-google-oauth2'
import App from './App.vue'

Vue.config.productionTip = false
const gauthOption = {
  clientId: '748723176251-kk8i1m6h1dmcduriooi86c2o6f61v5m0.apps.googleusercontent.com',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  render: h => h(App),
}).$mount('#app')
