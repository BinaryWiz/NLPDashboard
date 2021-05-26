<template>
  <div id="graph-container">
    <graph :title="'Accuracy'" :labels="this.$store.getters.lastBatches" :data="this.$store.getters.accuracies" />
    <graph :title="'Losses'" :labels="this.$store.getters.lastBatches" :data="this.$store.getters.losses" />
  </div>
</template>

<script>
import Graph from './Graph'
export default {
  components: {
    Graph
  }
}
</script>

<style scoped>
#graph-container {
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  height: 38%;
  border: 1px solid rgba(222,222,222,0.3);
  border-radius: 15px;
  -webkit-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  -moz-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
}
</style>
