<template>
  <div id='bde-container'>
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

</style>
