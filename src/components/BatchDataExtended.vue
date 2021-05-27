<template>
  <div id='bde-container'>
    <h2>Training Epoch: 1 Batch: 1034</h2>
    <pair-titles-example v-for="example in exampleObjects" :key="example.title1" :example="example" />
  </div>
</template>

<script>
import PairTitlesExample from './PairTitlesExample'
export default {
  props: ['examples'],
  data () {
    return {

    }
  },
  computed: {
    exampleObjects () {
      let objs = []
      this.examples.forEach((example) => {
        objs.push({
          epoch: example[0],
          batch: example[1],
          title1: example[2],
          title2: example[3],
          positivePercentage: example[4],
          negativePercentage: example[5],
          modelPrediction: example[6],
          label: example[7]
        })
      })
      return objs
    }
  },
  components: {
    PairTitlesExample
  }
}
</script>

<style scoped>
#bde-container {
  display: flex;
  font-family: "Quicksand";
  flex-flow: column;
  text-align: center;
  justify-content: center;
  align-items: center;
}

h2 {
  display: flex;
  font-size: 22px;
  font-family: 'muli';
  margin: 0;
  padding: 0;
}

</style>
