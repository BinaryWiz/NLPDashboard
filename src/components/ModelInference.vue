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
      <pair-title-inference
       :titleOne="'Lenovo 2021 Newest Ideapad 3 Laptop, 15.6 Full HD 1080P Non-Touch Display, AMD Ryzen 3 3250U Processor, 8GB DDR4 RAM, 128GB PCIe NVMe SSD, Webcam, Wi-Fi, HDMI, Windows 10 Home, KKE Mousepad, Grey'"
       :titleTwo="'HP 15-inch Laptop, 11th Generation Intel Core i5-1135G7, Intel Iris Xe Graphics, 8 GB RAM, 256 GB SSD, Windows 11 Home (15-dy2024nr, Natural silver)'"
       :matchPercentage="'72%'" />
      <pair-title-inference
       :titleOne="'Lenovo 2021 Newest Ideapad 3 Laptop, 15.6 Full HD 1080P Non-Touch Display, AMD Ryzen 3 3250U Processor, 8GB DDR4 RAM, 128GB PCIe NVMe SSD, Webcam, Wi-Fi, HDMI, Windows 10 Home, KKE Mousepad, Grey'"
       :titleTwo="'HP 15-inch Laptop, 11th Generation Intel Core i5-1135G7, Intel Iris Xe Graphics, 8 GB RAM, 256 GB SSD, Windows 11 Home (15-dy2024nr, Natural silver)'"
       :matchPercentage="'72%'" />
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import PairTitleInference from './PairTitleInference.vue'
export default {
  components: {
    'pair-title-inference': PairTitleInference
  },
  data () {
    return {
      title1: '',
      title2: ''
    }
  },
  methods: {
    sendTitles () {
      console.log(`Title 1: ${this.title1} Title 2: ${this.title2}`)
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
  border-radius: 15px;
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
}

</style>