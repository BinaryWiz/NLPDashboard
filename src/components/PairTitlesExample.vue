<template>
  <div class="reg-shadow" id="pair-container" @click='showModal'>
    <div id="pair-title-container" :style="{ backgroundColor: correct }">
      <p>Title One: {{example.title1}}</p>
      <p>Title Two: {{example.title2}}</p>
    </div>
    <div id="pair-stats-container">
      <div id="positive">
        <p>Positive %: {{example.positivePercentage}}</p>
      </div>
      <div id="negative">
        <p>Negative %: {{example.negativePercentage}}</p>
      </div>
      <div id="prediction">
        <p>Prediction: {{example.modelPrediction}}</p>
      </div>
      <div id="label">
        <p>Label: {{example.label}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['example'],
  computed: {
    correct () {
      if (this.example.label == this.example.modelPrediction) {
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
