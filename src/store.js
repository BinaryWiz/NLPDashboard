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
    currentTable: '',
    currentEpoch: null,
    availableTables: [],
    availableModels: [],
    availableEpochs: [],
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
          table: state.currentTable,
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
          if (!state.availableEpochs.includes(batch.epoch)) {
            state.availableEpochs.push(batch.epoch)
          }
          state.currentEpoch = state.availableEpochs[0]
          state.batchData.push(batch)
        })
      })
    },
    getAvailableModels (state) {
      axios.get('http://localhost:3000/get_avail_models', {}).then(response => {
        state.availableModels = response.data.data
        this.commit('changeModel', response.data.data[0])
      })
    },
    changeModel (state, modelName) {
      state.batchData = []
      state.allAccuracies = []
      state.allLosses = []
      state.allRunningAccuracies = []
      state.allRunningLosses = []
      state.currentEpoch = null
      state.availableEpochs = []
      state.currentModel = modelName
      axios.get('http://localhost:3000/get_table_names', {
        params: {
          model_name: modelName
        }
      }).then(response => {
        state.availableTables = response.data.data
        state.currentTable = response.data.data[0]
      })
    },
    changeTable (state, table) {
      state.batchData = []
      state.allAccuracies = []
      state.allLosses = []
      state.allRunningAccuracies = []
      state.allRunningLosses = []
      state.currentTable = table
    },
    changeEpoch (state, epoch) {
      state.currentEpoch = epoch
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
    },
    epochBatches: state => {
      let epochBatches = []
      state.batchData.forEach(batch => {
        if (batch.epoch == state.currentEpoch) {
          epochBatches.push(batch)
        }
      })
      return truncateData(epochBatches)
    },
    epochAccuracies: (state, getters) => {
      let accuracies = []
      if (getters.epochBatches != null) {
        getters.epochBatches.forEach(batch => {
          accuracies.push(batch.accuracy)
        })
      }
      return truncateData(accuracies)

    },
    epochLosses: (state, getters) => {
      let losses = []
      if (getters.epochBatches != null) {
        getters.epochBatches.forEach(batch => {
          losses.push(batch.loss)
        })
      }
      return truncateData(losses)
    },
    epochRunningAccuracies: (state, getters) => {
      let runningAccuracies = []
      if (getters.epochBatches != null) {
        getters.epochBatches.forEach(batch => {
          runningAccuracies.push(batch.runningAccuracy)
        })
      }
      return truncateData(runningAccuracies)
    },
    epochRunningLosses: (state, getters) => {
      let runningLosses = []
      if (getters.epochBatches != null) {
        getters.epochBatches.forEach(batch => {
          runningLosses.push(batch.runningLoss)
        })
      }
      return truncateData(runningLosses)
    },
    epochLastBatches: (state, getters) => {
      let epochBatches = getters.epochBatches
      if (epochBatches != null) {
        if (epochBatches.length > 0) {
          let lastBatches = []
          let start = 0
          if (epochBatches.length > 1000) {
            start = epochBatches.length - 1000
          }
          for (let i = start; i < epochBatches.length; i++) {
            lastBatches.push(epochBatches[i].batch)
          }
          return lastBatches
        } else {
          return null
        }
      } else {
        return null
      }
    }
  },

  actions: {
    updateBatchData ({ commit }) {
      setInterval(() => {
        commit('getNewBatches')
      }, 1500)
    },
    updateAvailableModels ({ commit }) {
      commit('getAvailableModels')
    }
  }
})
