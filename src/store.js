import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export { store }

const store = new Vuex.Store({
  state: {
    currentModel: '',
    currentTable: '',
    currentEpoch: null,
    availableTables: [],
    availableModels: [],
    availableEpochs: [],
    batchData: {},
    allAccuracies: {},
    allLosses: {},
    allRunningAccuracies: {},
    allRunningLosses: {},
    getBatchesRunning: false
  },

  mutations: {
    getNewBatches (state) {
      if (state.getBatchesRunning) {
        return
      } else {
        state.getBatchesRunning = true
      }
      let getEpoch = 1
      let getBatch = 0
      if (!(Object.keys(state.batchData).length === 0 && state.batchData.constructor === Object)) {
        let latestEpoch = state.batchData[state.availableEpochs[state.availableEpochs.length - 1]]
        getEpoch = latestEpoch[latestEpoch.length - 1].epoch
        getBatch = latestEpoch[latestEpoch.length - 1].batch
      }
      axios.get('http://localhost:3000/get_batch_data', {
        params: {
          model_name: state.currentModel,
          table: state.currentTable,
          epoch: getEpoch,
          batch: getBatch
        }
      })
        .then(response => {
          try {
            let newBatches = response.data.data
            newBatches.forEach(batch => {
              batch.id = batch.epoch + '-' + batch.batch
              if (!state.batchData.hasOwnProperty(batch.epoch)) {
                Vue.set(state.batchData, batch.epoch, [])
              }
              if (!state.allAccuracies.hasOwnProperty(batch.epoch)) {
                Vue.set(state.allAccuracies, batch.epoch, [])
              }
              if (!state.allLosses.hasOwnProperty(batch.epoch)) {
                Vue.set(state.allLosses, batch.epoch, [])
              }
              if (!state.allRunningAccuracies.hasOwnProperty(batch.epoch)) {
                Vue.set(state.allRunningAccuracies, batch.epoch, [])
              }
              if (!state.allRunningLosses.hasOwnProperty(batch.epoch)) {
                Vue.set(state.allRunningLosses, batch.epoch, [])
              }
              state.allAccuracies[batch.epoch].push(batch.accuracy)
              state.allLosses[batch.epoch].push(batch.loss)
              state.allRunningAccuracies[batch.epoch].push(batch.runningAccuracy)
              state.allRunningLosses[batch.epoch].push(batch.runningLoss)
              state.batchData[batch.epoch].push(batch)
              if (!state.availableEpochs.includes(batch.epoch)) {
                state.availableEpochs.push(batch.epoch)
                state.currentEpoch = batch.epoch
              }
            })
          }
          catch (error) {
            console.log('Error within response while getting new batches: ')
            console.log(error)
          }
          finally {
            state.getBatchesRunning = false
          }
        })
        .catch(error => {
          console.log('Network error getting new batches: ')
          console.log(error)
          state.getBatchesRunning = false
        })
    },
    getAvailableModels (state) {
      axios.get('http://localhost:3000/get_avail_models', {}).then(response => {
        state.availableModels = response.data.data
        this.commit('changeModel', response.data.data[0])
      })
    },
    changeModel (state, modelName) {
      state.batchData = {}
      state.allAccuracies = {}
      state.allLosses = {}
      state.allRunningAccuracies = {}
      state.allRunningLosses = {}
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
      state.batchData = {}
      state.allAccuracies = {}
      state.allLosses = {}
      state.allRunningAccuracies = {}
      state.allRunningLosses = {}
      state.availableEpochs = []
      state.currentTable = table
      state.currentEpoch = null
    },
    changeEpoch (state, epoch) {
      state.currentEpoch = epoch
    }
  },

  getters: {
    accuracies: state => {
      let accuracies = []
      state.availableEpochs.forEach(epoch => {
        accuracies.concat(state.allAccuracies[epoch])
      })
      return accuracies
    },
    losses: state => {
      let losses = []
      state.availableEpochs.forEach(epoch => {
        losses.concat(state.allLosses[epoch])
      })
      return losses
    },
    runningAccuracies: state => {
      let runningAccuracies = []
      state.availableEpochs.forEach(epoch => {
        runningAccuracies.concat(state.allRunningAccuracies[epoch])
      })
      return runningAccuracies
    },
    runningLosses: state => {
      let runningLosses = []
      state.availableEpochs.forEach(epoch => {
        runningLosses.concat(state.allRunningLosses[epoch])
      })
      return runningLosses
    },
    lastBatches: state => {
      let batches = []
      state.availableEpochs.forEach(epoch => {
        batches.concat(state.batchData[epoch])
      })
      return batches
    },
    epochBatches: state => {
      return state.batchData[state.currentEpoch]
    },
    epochAccuracies: (state) => {
      return state.allAccuracies[state.currentEpoch]

    },
    epochLosses: (state) => {
      return state.allLosses[state.currentEpoch]
    },
    epochRunningAccuracies: (state) => {
      return state.allRunningAccuracies[state.currentEpoch]
    },
    epochRunningLosses: (state) => {
      return state.allRunningLosses[state.currentEpoch]
    },
    epochLastBatches: (state) => {
      if (state.batchData[state.currentEpoch] != null) {
        if (state.batchData[state.currentEpoch].length > 0) {
          let lastBatches = []
          let start = 0
          if (state.batchData[state.currentEpoch].length > 1000) {
            start = state.batchData[state.currentEpoch].length - 1000
          }
          for (let i = start; i < state.batchData[state.currentEpoch].length; i++) {
            lastBatches.push(state.batchData[state.currentEpoch][i].batch)
          }
          return lastBatches
        } else {
          return null
        }
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
