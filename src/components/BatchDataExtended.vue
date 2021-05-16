<template>
  <div id='bde-container'>
    <h2>Training Epoch: 1 Batch: 1034</h2>
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
    <pair-titles-example />
  </div>
</template>

<script>
import PairTitlesExample from './PairTitlesExample'
export default {
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
