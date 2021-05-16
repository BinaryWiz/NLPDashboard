<template>
  <div class="reg-shadow" id="data-container" @click='showModal'>
    <p>Training Epoch: {{batchData.epoch}}</p>
    <p>Batch: {{batchData.batch}}</p>
    <p>Accuracy: {{batchData.accuracy}}</p>
    <p>Loss: {{batchData.loss}}</p>
    <p>Running Accuracy: {{batchData.runningAccuracy}}</p>
    <p>Running Loss: {{batchData.runningLoss}}</p>
  </div>
</template>

<script>
import 'typeface-quicksand'
import 'typeface-muli'
import BatchDataExtended from './BatchDataExtended'

export default {
  data () {
    return {
      batchData: {
        epoch: 1,
        batch: 1034,
        accuracy: 0.7500,
        loss: 0.6875,
        runningAccuracy: 0.7875,
        runningLoss: 0.7255,
      },
      hover: false
    }
  },
  methods: {
    showModal () {
      this.$modal.show(BatchDataExtended, {}, {
        width: '85%',
        height: 'auto',
        scrollable: true
      })
    }
  },
  components: {
    BatchDataExtended
  }
}
</script>

<style >
#data-container {
  width: 95%;
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  margin-top: 2px;
  margin-bottom: 2px;
  border-radius: 9px;
  padding-top: 7px;
  padding-bottom: 7px;
}

#data-container:hover {
  cursor: pointer;
}

#data-container > p {
  display: flex;
  font-size: 18px;
  font-family: 'muli';
  align-items: center;
  margin: 0;
  padding: 0;
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
