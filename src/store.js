import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export { store }

const store = new Vuex.Store({
  state: {
    batchData: [
    ],
    allAccuracies: [],
    allLosses: []
  },

  mutations: {
    getNewBatches (state) {
      let getEpoch = 1
      let getBatch = 0
      if (state.batchData.length > 0) {
        getEpoch = state.batchData[state.batchData.length - 1].epoch
        getBatch = state.batchData[state.batchData.length - 1].batch
      }
      axios.get('http://localhost:3000/get_batch_data', {
        params: {
          model_name: 'test',
          epoch: getEpoch,
          batch: getBatch
        }
      }).then(response => {
        let newBatches = response.data.data
        newBatches.forEach(batch => {
          batch.id = batch.epoch + '-' + batch.batch
          state.allAccuracies.push(batch.accuracy)
          state.allLosses.push(batch.loss)
          state.batchData.push(batch)
        })
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
  },

  actions: {
    updateBatchData ({ commit }) {
      setInterval(() => {
        commit('getNewBatches')
      }, 2000)
    }
  }
})
