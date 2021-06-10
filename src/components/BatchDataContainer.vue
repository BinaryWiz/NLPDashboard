<template>
  <div id="batch-data-container">
    <div id="batch-data-heading">
      <p>Batch Data</p>
      <div class="btn-group">
        <button type="button" class="btn btn-outline-dark">Epoch {{ currentEpoch }}</button>
        <button type="button" class="btn btn-outline-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" v-for="epoch in availableEpochs" :key="epoch" @click="changeEpoch(epoch)">Epoch {{ epoch }}</a></li>
        </ul>
      </div>
    </div>
    <batch-data v-for="batch in batchData" :key="batch.id" :batchData="batch"/>
  </div>
</template>

<script>
import BatchData from './BatchData.vue'
export default {
  components: {
    'batch-data': BatchData,
  },
  methods: {
    changeEpoch(epoch) {
      this.$store.commit('changeEpoch', epoch)
    }
  },
  computed: {
    batchData () {
      return this.$store.getters.epochBatches
    },
    currentEpoch () {
      return this.$store.state.currentEpoch
    },
    availableEpochs () {
      return this.$store.state.availableEpochs
    }
  }
}
</script>

<style scoped>
#batch-data-container {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  flex-flow: column;
  align-items: center;
  height: 59%;
  width: 87%;
  overflow-y: auto;
  border: 1px solid rgba(222,222,222,0.3);
  margin-top: 0.3%;
  margin-bottom: 0.3%;
  border-radius: 15px;
  -webkit-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  -moz-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
}

#batch-data-heading {
  display: flex;
  flex-flow: row;

}

#batch-data-heading > p {
  margin: 0;
  font-size: 24px;
  font-family: 'muli';
  margin-right: 10px;
}

#batch-data-heading > div {
  margin-left: 10px;
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
