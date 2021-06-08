import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import { store } from './store'
import 'jquery/dist/jquery.js'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VModal, {dynamic: true})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})

store.dispatch('updateBatchData')
store.dispatch('updateAvailableModels')
