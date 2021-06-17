<template>
  <div>
    <div class="batch-data-container" v-if="batchAvailable">
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
    <div class="batch-data-container" id="loading-container" v-else>
        <img id="loading-img" :src="require(`../assets/load.svg`)">
        <h1 id="loading-h1">Loading . . .</h1>
    </div>
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
    },
    batchAvailable () {
      if (this.batchData != null) {
        return !(Object.keys(this.batchData).length === 0 && this.batchData.constructor === Object)
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.batch-data-container {
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


.batch-data-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(18, 105, 163, 0.3);
	-webkit-box-shadow: inset 0 0 6px rgba(18, 105, 163, 0.3);
	background-color: #F5F5F5;
}

.batch-data-container::-webkit-scrollbar {
	width: 11px;
	background-color: #F5F5F5;
}

.batch-data-container::-webkit-scrollbar-thumb {
	background-color: rgba(6, 61, 240, 0.822);
}

#loading-container {
  justify-content: center;
}

#loading-img {
  height: 25%;
  width: 25%;
  margin-bottom: 2%;
  -webkit-animation:spin 2s linear infinite;
  -moz-animation:spin 2s linear infinite;
  animation:spin 2s linear infinite;
}

#loading-h1 {
  font-family: 'muli';
  margin-top: 2%;
  -webkit-animation:scale-up 1s  infinite alternate;
  animation:scale-up 1s infinite alternate;
}

@-moz-keyframes spin {
  100% { -moz-transform: rotate(360deg); }
}

@-webkit-keyframes spin {
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform:rotate(360deg);
  }
}

@keyframes scale-up {
  0% { transform: scale(1); }
  100% { transform: scale(1.1)};
}

@-webkit-keyframes scale-up {
  0% { transform: scale(1); }
  100% { transform: scale(1.1);}
}
</style>
