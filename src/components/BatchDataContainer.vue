<template>
  <div id="batch-data-container">
    <p>Training Batch Data - Epoch 1</p>
    <batch-data v-for="batch in batchData" :key="batch.id" :batchData="batch"/>
  </div>
</template>

<script>
import BatchData from './BatchData.vue'
export default {
  components: {
    'batch-data': BatchData,
  },

  computed: {
    batchData () {
      return this.$store.state.batchData
    }
  }
}
</script>

<style scoped>
#batch-data-container {
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 54.7%;
  overflow-y: auto;
  border: 1px solid rgba(222,222,222,0.3);
  margin-top: 0.3%;
  margin-bottom: 0.3%;
  border-radius: 15px;
  -webkit-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  -moz-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
}

#batch-data-container > p {
  margin: 0;
  font-size: 24px;
  font-family: 'muli';
}

#batch-data-container::-webkit-scrollbar-track {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: inset 0 0 6px rgba(18, 105, 163, 0.3);
	-webkit-box-shadow: inset 0 0 6px rgba(18, 105, 163, 0.3);
	background-color: #F5F5F5;
}

#batch-data-container::-webkit-scrollbar {
	width: 6px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
	background-color: #F5F5F5;
}

#batch-data-container::-webkit-scrollbar-thumb {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
	background-color: rgba(6, 61, 240, 0.822);
}
</style>
