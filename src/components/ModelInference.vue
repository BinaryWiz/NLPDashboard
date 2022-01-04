<template>
  <div id="model-inference">
    <div id="heading">
      <div id="title">
        <p>Model Inference</p>
        <button type="button" class="btn btn-dark">Switch To Cluster</button>
      </div>
      <div class="input-group mt-3 mb-3">
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
    </div>

    <div id="titles-container">
      <pair-title-inference v-for="pair in titlePairs" :key="pair.titleOne + pair.titleTwo"
       :titleOne="pair.titleOne"
       :titleTwo="pair.titleTwo"
       :matchPercentage="pair.percent" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PairTitleInference from './PairTitleInference.vue'
export default {
  components: {
    'pair-title-inference': PairTitleInference
  },
  data () {
    return {
      titlePairs: [],
      title1: '',
      title2: ''
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

#titles-container {
  width: 100%;
  display: flex;
  margin-top: 10px;
  flex-flow: column;
  align-items: center;
  overflow-y: auto;
  border-radius: 15px;
}

#titles-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(18, 105, 163, 0.3);
	-webkit-box-shadow: inset 0 0 6px rgba(18, 105, 163, 0.3);
	background-color: #F5F5F5;
}

#titles-container::-webkit-scrollbar {
	width: 11px;
	background-color: #F5F5F5;
}

#titles-container::-webkit-scrollbar-thumb {
	background-color: #212529;
}

</style>