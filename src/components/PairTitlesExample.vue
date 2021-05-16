<template>
  <div class="reg-shadow" id="pair-container" @click='showModal'>
    <div id="pair-title-container" :style="{ backgroundColor: correct }">
      <p>Title One: {{title1}}</p>
      <p>Title Two: {{title2}}</p>
    </div>
    <div id="pair-stats-container">
      <div id="positive">
        <p>Positive %: {{positivePercentage}}</p>
      </div>
      <div id="negative">
        <p>Negative %: {{negativePercentage}}</p>
      </div>
      <div id="prediction">
        <p>Prediction: {{modelPrediction}}</p>
      </div>
      <div id="label">
        <p>Label: {{label}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title1: 'ASUS_VivoBook 15.6" FHD Touchscreen Laptop, 1080p NanoEdge, Inetl Core i5-1035G1 Quad-Core, 12GB RAM, 512GB SSD+1TB HDD, USB-C, FP Reader, Webcam, KeyPad, Mytrix Ethernet Hub, Win 10',
      title2: 'ASUS VivoBook 15 F515 Thin and Light Laptop, 15.6” FHD Display, Intel Core i3-1005G1 Processor, 4GB DDR4 RAM, 128GB PCIe SSD, Fingerprint Reader, Windows 10 Home in S Mode, Slate Grey, F515JA-AH31',
      label: 0,
      modelPrediction: 0,
      negativePercentage: 0.75,
      positivePercentage: 0.25
    }
  },

  computed: {
    correct () {
      if (this.label == this.modelPrediction) {
        return 'rgba(124, 255, 203, 0.5)'
      } else {
        return 'rgba(255, 0, 40, 0.35)'
      }
    }
  }
}
</script>

<style scoped>
#pair-container {
  width: 95%;
  display: flex;
  flex-flow: column;
  text-align: center;
  margin-top: 2px;
  margin-bottom: 2px;
  border-radius: 9px;
}

#pair-container > div > p {
  display: flex;
  font-size: 18px;
  font-family: 'muli';
  margin: 0;
  padding: 0;
}


#pair-title-container {
  display: flex;
  flex-flow: column;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

#pair-title-container > p {
  justify-content: center;
}

#pair-stats-container {
  display: flex;
  flex-flow: row;
  justify-content: space-evenly
}

#pair-stats-container > div {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

#pair-stats-container > div > p {
  font-size: 18px;
  font-family: 'muli';
  margin: 0;
  padding: 0;
}

#positive {
  background-color: rgba(255, 23, 68, 0.9);
  border-bottom-left-radius: 9px;
  color: white;
}

#negative {
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
}

#prediction {
  background-color: rgba(6, 61, 240, 0.822);
  color: white;
}

#label {
  background-color: rgba(218, 165, 32, 0.68);
  border-bottom-right-radius: 9px;
  color: white;

}

</style>
