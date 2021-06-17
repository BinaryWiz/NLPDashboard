<template>
  <div id="container">
    <div class="reg-shadow" id="data-container" @click='showModal()'>
      <p class="epoch">Epoch: {{batchData.epoch}}</p>
      <p class="batch">Batch: {{batchData.batch}}</p>
      <p class="accuracy">Accuracy: {{batchData.accuracy}}</p>
      <p class="loss">Loss: {{batchData.loss}}</p>
      <p class="running-accuracy">Running Accuracy: {{batchData.runningAccuracy}}</p>
      <p class="running-loss">Running Loss: {{batchData.runningLoss}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'typeface-quicksand'
import 'typeface-muli'
import BatchDataExtended from './BatchDataExtended'

export default {
  props: ['batchData'],
  data () {
    return {
      hover: false
    }
  },
  methods: {
    showModal () {
      axios.get('http://localhost:3000/get_examples_data', {
        params: {
          model_name: this.currentModel,
          table: this.currentTable,
          epoch: this.batchData.epoch,
          batch: this.batchData.batch
        }
      }).then(response => {
        let examples = response.data.data
        this.$modal.show(BatchDataExtended, {
          'examples': examples
        }, {
          width: '85%',
          height: 'auto',
          scrollable: true
        })
      })
    }
  },
  computed: {
    currentModel () {
      return this.$store.state.currentModel
    },
    currentTable () {
      return this.$store.state.currentTable
    }
  },
  components: {
    // eslint-disable-next-line
    BatchDataExtended
  }
}
</script>

<style>
#container {
  display: flex;
  width: 100%;
  justify-content: center;
}

#data-container {
  width: 95%;
  display: flex;
  align-items: center;
  flex-flow: row;
  margin-top: 2px;
  margin-bottom: 2px;
  border-radius: 9px;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 1.3%;
}

#data-container:hover {
  cursor: pointer;
}

#data-container > p {
  display: flex;
  font-size: 18px;
  font-family: 'muli';
  margin: 0;
  padding: 0;
}

.epoch {
  flex: 2 3 1px;
}

.batch {
  flex: 2 2 1px;
}

.accuracy {
  flex: 2 2 0px;
}

.loss {
  flex: 2 2 0px;
}

.running-accuracy {
  flex: 3 1 0px;
}

.running-loss {
  flex: 3 1 0px;
}

.reg-shadow {
  border: 1px solid rgba(222,222,222,0.3);
  -webkit-box-shadow: 10px 10px 8px -10px rgba(222,222,222,0.3);
  -moz-box-shadow: 10px 10px 8px -10px rgba(222,222,222,0.3);
  box-shadow: 10px 10px 8px -10px rgba(222,222,222,0.3);
  transition: all 0.3s;
}

.reg-shadow:hover {
  transform: scale(1.01, 1.01);
  border: 1px solid rgba(222, 222, 222, 0);
  -webkit-box-shadow: 10px 10px 8px -5px rgba(222,222,222,1);
  -moz-box-shadow: 10px 10px 8px -5px rgba(222,222,222,1);
  box-shadow: 10px 10px 8px -5px rgba(222,222,222,1);
}

</style>
