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
      {epoch: 1, batch: 1, accuracy: 0.56, loss: 0.7, runningAccuracy: 0.5, runningLoss: 0.72},
      {epoch: 1, batch: 2, accuracy: 0.56, loss: 0.7, runningAccuracy: 0.5, runningLoss: 0.72},
      {epoch: 1, batch: 3, accuracy: 0.56, loss: 0.7, runningAccuracy: 0.5, runningLoss: 0.72}
    ],
    allAccuracies: [1, 2, 4],
    allLosses: [1, 2, 3]
  },

  mutations: {
    addBatches (state, batches) {
      batches.forEach(batch => {
        state.allAccuracies.push(batch.accuracy)
        state.allLosses.push(batch.loss)
        state.batchData.push(batch)
      })
    }
  },

  getters: {
    accuracies: state => {
      if (state.allAccuracies.length > 0) {
        if (state.allAccuracies.length > 1000) {
          return state.allAccuracies.splice(state.allAccuracies.length - 1000)
        } else {
          return state.allAccuracies
        }
      } else {
        return null
      }
    },
    losses: state => {
      if (state.allLosses.length > 0) {
        if (state.allLosses.length > 1000) {
          return state.allLosses.splice(state.allLosses.length - 1000)
        } else {
          return state.allLosses
        }
      } else {
        return null
      }
    },
    lastBatches: state => {
      if (state.batchData.length > 0) {
        let lastBatches = []
        let start = 0
        if (state.batchData.length > 1000) {
          start = state.batchData.length - 1000
        }
        for (let i = start; i < state.batchData.length; i++) {
          lastBatches.push(state.batchData[i].batch)
        }
        return lastBatches
      } else {
        return null
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})
