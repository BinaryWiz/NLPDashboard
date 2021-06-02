<template>
  <div id='bde-container'>
    <h2>Training Epoch: {{ examples[0].epoch }} Batch: {{ examples[0].batch }}</h2>
    <pair-titles-example v-for="example in examples" :key="example.title1" :example="example" />
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
