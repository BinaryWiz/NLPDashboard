import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import { store } from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

Vue.use(VModal, {dynamic: true})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})

store.dispatch('updateBatchData')
