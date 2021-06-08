import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export { store }

function truncateData(arr) {
  if (arr.length > 0) {
    if (arr.length > 1000) {
      return arr.splice(arr.length - 1000)
    } else {
      return arr
    }
  } else {
    return null
  }
}

const store = new Vuex.Store({
  state: {
    currentModel: '',
    availableModels: [],
    batchData: [],
    allAccuracies: [],
    allLosses: [],
    allRunningAccuracies: [],
    allRunningLosses: []
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
          model_name: state.currentModel,
          epoch: getEpoch,
          batch: getBatch
        }
      }).then(response => {
        let newBatches = response.data.data
        newBatches.forEach(batch => {
          batch.id = batch.epoch + '-' + batch.batch
          state.allAccuracies.push(batch.accuracy)
          state.allLosses.push(batch.loss)
          state.allRunningAccuracies.push(batch.runningAccuracy)
          state.allRunningLosses.push(batch.runningLoss)
          state.batchData.push(batch)
        })
      })
    },
    getAvailableModels (state) {
      axios.get('http://localhost:3000/get_avail_models', {}).then(response => {
        state.availableModels = response.data.data
        state.currentModel = response.data.data[0]
      })
    },
    changeModel (state, modelName) {
      state.batchData = []
      state.allAccuracies = []
      state.allLosses = []
      state.allRunningAccuracies = []
      state.allRunningLosses = []
      state.currentModel = modelName
    }
  },

  getters: {
    accuracies: state => {
      return truncateData(state.allAccuracies)
    },
    losses: state => {
      return truncateData(state.allLosses)
    },
    runningAccuracies: state => {
      return truncateData(state.allRunningAccuracies)
    },
    runningLosses: state => {
      return truncateData(state.allRunningLosses)
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
    },
    updateAvailableModels ({ commit }) {
      commit('getAvailableModels')
    }
  }
})
