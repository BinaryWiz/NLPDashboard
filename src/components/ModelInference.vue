<template>
  <div id="model-inference">
    <div id="heading">
      <div id="title">
        <p>Model Inference</p>
        <button type="button" class="btn btn-dark" v-if="view == 'pair'" @click="view = 'multiple titles'">Switch To Multiple Titles</button>
        <button type="button" class="btn btn-dark" v-if="view == 'multiple titles'" @click="view = 'pair'">Switch To Pair Titles</button>
        <button type="button" class="btn btn-dark" v-if="view == 'cluster'" @click="view = 'pair'">Switch To Pair Titles</button>
        <button type="button" class="btn btn-dark" @click="titlePairs = []">Clear Output</button>
      </div>
      <div class="input-group mt-3 mb-3" v-if="view == 'pair'">
        <span class="input-group-text bg-dark text-white">Titles</span>
        <input
         v-model="title1"
         type="text"
         class="form-control"
         placeholder="Title 1"
         aria-label="Title 1"
         aria-describedby="button-addon2">
        <input
         v-model="title2"
         type="text"
         class="form-control"
         placeholder="Title 2"
         aria-label="Title 2"
         aria-describedby="button-addon2">
        <button class="btn btn-dark" type="button" id="button-addon2" @click="sendTitles()">Compare</button>
      </div>
      <div class="input-group mt-3 mb-3" v-if="view == 'multiple titles'">
        <span class="input-group-text bg-dark text-white">Titles</span>
        <input
         v-model="title1"
         type="text"
         class="form-control"
         placeholder="Comparison Title"
         aria-label="Title 1"
         aria-describedby="button-addon2">
        <textarea placeholder="Titles to Compare" v-model="multipleTitles" class="form-control" rows="3"></textarea>
        <button class="btn btn-dark" type="button" id="button-addon2" @click="sendMultipleTitles()">Compare</button>
      </div>
      <div class="input-group mt-3 mb-3" v-if="view == 'cluster'">
        <span class="input-group-text bg-dark text-white">Titles</span>
        <textarea v-model="clusterTitles" class="form-control" rows="5"></textarea>
        <button class="btn btn-dark" type="button" id="button-addon2" @click="getClusters()">Compare</button>
      </div>
    </div>

    <div class="response-container" v-if="view == 'pair' || view == 'multiple titles'">
      <pair-title-inference v-for="pair in titlePairs" :key="pair.titleOne + pair.titleTwo"
       :titleOne="pair.titleOne"
       :titleTwo="pair.titleTwo"
       :matchPercentage="pair.percent" />
    </div>
    <div class="response-container" v-if="view == 'cluster'">
      <clusters-container v-for="group in groups" :key="group" :clusters="group"></clusters-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PairTitleInference from './PairTitleInference.vue'
import ClustersContainer from './ClustersContainer.vue'
export default {
  components: {
    'pair-title-inference': PairTitleInference,
    ClustersContainer
  },
  data () {
    return {
      view: 'pair',
      titlePairs: [],
      title1: '',
      title2: '',
      clusterTitles: '',
      multipleTitles: '',
      groups: []
    }
  },
  methods: {
    sendTitles () {
      axios.post('http://localhost:5004/price-assist/api/product-matcher', {
        title: this.title1,
        data: [this.title2]
      }).then(response => {
        this.titlePairs.push({
          titleOne: this.title1,
          titleTwo: this.title2,
          percent: Math.round(response.data[this.title2] * 100)
        })
      }).finally(() => {
        this.title1 = ''
        this.title2 = ''
      })
    },
    sendMultipleTitles () {
      axios.post('http://localhost:5004/price-assist/api/product-matcher', {
        title: this.title1,
        data: this.multipleTitles.split('\n')
      }).then(response => {
        this.multipleTitles.split('\n').forEach(title => {
          console.log(title)
          this.titlePairs.push({
            titleOne: this.title1,
            titleTwo: title,
            percent: Math.round(response.data[title] * 100)
          })
        })
      }).finally(() => {
        this.title1 = ''
        this.multipleTitles = ''
      })
    },
    getClusters() {
      const titles = this.clusterTitles.split('\n')
      axios.post('http://localhost:5004/price-assist/api/cluster', {
        data: titles
      }).then(response => {
        console.log(response.data.clusters)
        this.groups.push(response.data.clusters)
      }).finally(() => {
        this.clusterTitles = ''
      })
    }
  }
}
</script>

<style scoped>
#model-inference {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  font-family: 'muli';
  position: absolute;
  top: 0;
  right: 0;
  height: 99%;
  width: 87%;
  padding-top: 10px;
  overflow-y: auto;
  border: 1px solid rgba(222,222,222,0.3);
  margin-top: 0.3%;
  -webkit-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  -moz-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
}

#heading {
  width: 96%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  border-bottom: 1px solid gray;
}

#title {
  display: flex;
  flex-flow: row;
  justify-content: center;
}

#title > p {
  margin: 0;
  margin-right: 20px;
  font-size: 24px;
}

#title > button {
  margin-left: 20px;
}

.response-container {
  width: 100%;
  display: flex;
  margin-top: 10px;
  flex-flow: column;
  align-items: center;
  overflow-y: auto;
  border-radius: 15px;
}

.response-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(18, 105, 163, 0.3);
	-webkit-box-shadow: inset 0 0 6px rgba(18, 105, 163, 0.3);
	background-color: #F5F5F5;
}

.response-container::-webkit-scrollbar {
	width: 11px;
	background-color: #F5F5F5;
}

.response-container::-webkit-scrollbar-thumb {
	background-color: #212529;
}

</style>