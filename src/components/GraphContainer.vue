<template>
  <div id="graph-container">
    <graph :title="'Running Accuracy'" :labels="this.lastBatches" :data="this.runningAccuracies" />
    <graph :title="'Running Losses'" :labels="this.lastBatches" :data="this.runningLosses" />
    <graph :title="'Accuracy'" :labels="this.lastBatches" :data="this.accuracies" />
    <graph :title="'Losses'" :labels="this.lastBatches" :data="this.losses" />
  </div>
</template>

<script>
import Graph from './Graph'
export default {
  components: {
    Graph
  },
  computed: {
    accuracies () {
      return this.$store.getters.epochAccuracies
    },
    losses () {
      return this.$store.getters.epochLosses
    },
    runningAccuracies () {
      return this.$store.getters.epochRunningAccuracies
    },
    runningLosses () {
      return this.$store.getters.epochRunningLosses
    },
    lastBatches () {
      return this.$store.getters.epochLastBatches
    }
  }
}
</script>

<style scoped>
#graph-container {
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  flex-flow: row;
  justify-content: space-evenly;
  height: 40%;
  width: 87%;
  border: 1px solid rgba(222,222,222,0.3);
  border-radius: 15px;
  -webkit-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  -moz-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  overflow-x: auto;
}
</style>
