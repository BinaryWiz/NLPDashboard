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
    allBatchNumbers: {},
    allAccuracies: {},
    allLosses: {},
    allRunningAccuracies: {},
    allRunningLosses: {},
    getBatchesRunning: false,

    // view can either be "model inference" or "model info"
    view: 'model inference'
  },

  mutations: {
    getNewBatches (state) {
      // Make sure we are not in the middle of a request before making a new one
      if (state.getBatchesRunning) {
        return
      } else {
        state.getBatchesRunning = true
      }
      // If this is not the first request we are making, get the latest batch epoch and batch to make the request
      let getEpoch = 1
      let getBatch = 0
      if (!(Object.keys(state.batchData).length === 0 && state.batchData.constructor === Object)) {
        let latestEpoch = state.batchData[state.availableEpochs[state.availableEpochs.length - 1]]
        getEpoch = latestEpoch[latestEpoch.length - 1].epoch
        getBatch = latestEpoch[latestEpoch.length - 1].batch
      }
      // Make requst to server
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
              // The batch id is for v-for's key
              batch.id = batch.epoch + '-' + batch.batch
              // If this is the first batch in an epoch, make the array
              // Vue.set because state.batchData is an object
              if (!state.availableEpochs.includes(batch.epoch)) {
                Vue.set(state.batchData, batch.epoch, [])
                Vue.set(state.allBatchNumbers, batch.epoch, [])
                Vue.set(state.allAccuracies, batch.epoch, [])
                Vue.set(state.allLosses, batch.epoch, [])
                Vue.set(state.allRunningAccuracies, batch.epoch, [])
                Vue.set(state.allRunningLosses, batch.epoch, [])
              }
              // Push all the data
              state.batchData[batch.epoch].push(batch)
              state.allBatchNumbers[batch.epoch].push(batch.batch)
              state.allAccuracies[batch.epoch].push(batch.accuracy)
              state.allLosses[batch.epoch].push(batch.loss)
              state.allRunningAccuracies[batch.epoch].push(batch.runningAccuracy)
              state.allRunningLosses[batch.epoch].push(batch.runningLoss)
              // If this is a new epoch, add the epoch to state.availableEpochs
              // and set the new currentEpoch to this epoch
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
            // Make sure other requests will go through
            state.getBatchesRunning = false
          }
        })
        .catch(error => {
          console.log('Network error getting new batches: ')
          console.log(error)
          // Make sure other requests will go through
          state.getBatchesRunning = false
        })
    },
    getAvailableModels (state) {
      // Gets models saved on the server
      axios.get('http://localhost:3000/get_avail_models', {}).then(response => {
        state.availableModels = response.data.data
        this.commit('changeModel', response.data.data[0])
      })
    },
    changeModel (state, modelName) {
      // When changing a model, reset all the data and get the tables available
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
      // Reset the data
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
      // Simply changing the currentEpoch will update all the data
      state.currentEpoch = epoch
    },
    changeView (state, newView) {
      state.view = newView
    }
  },

  getters: {
    // All of these get data across ALL epochs
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
    batches: state => {
      let batches = []
      state.availableEpochs.forEach(epoch => {
        batches.concat(state.allBatchNumbers[epoch])
      })
      return batches
    },
    // All of these get data for a single epoch
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
      return state.allBatchNumbers[state.currentEpoch]
    }
  },
  actions: {
    // Updates the batch data every 1.5 seconds
    updateBatchData ({ commit }) {
      setInterval(() => {
        commit('getNewBatches')
      }, 1500)
    },
    // Only called on refresh, gets all the available models on the server
    updateAvailableModels ({ commit }) {
      commit('getAvailableModels')
    }
  }
})
