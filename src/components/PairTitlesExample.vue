<template>
  <div class="reg-shadow" id="pair-container" @click='showModal'>
    <div id="pair-title-container">
      <p>Title One: {{title1}}</p>
      <p>Title Two: {{title2}}</p>
    </div>
    <div id="pair-stats-container">
      <p>Positive %: {{positivePercentage}}</p>
      <p>Negative %: {{negativePercentage}}</p>
      <p>Prediction: {{modelPrediction}}</p>
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
}

#pair-title-container > p {
  justify-content: center;
}

#pair-stats-container {
  display: flex;
  flex-flow: row;
  justify-content: space-evenly
}

</style>
