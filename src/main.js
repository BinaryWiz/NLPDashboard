import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VModal from 'vue-js-modal'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

Vue.use(VModal, {dynamic: true})
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    batchData: [
      {epoch: 1, batch: 1, accuracy: 0.56, loss: 0.7, runningAccuracy: 0.5, runningLoss: 0.72}
    ]
  },

  mutations: {
    addBatches (state, batches) {
      batches.forEach(batch => {
        state.batchData.push(batch)
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})
