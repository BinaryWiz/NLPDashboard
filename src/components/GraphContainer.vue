<template>
  <div id="graph-container">
    <graph />
    <graph />
    <graph />
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
  height: 39%;
  border: 2px solid red;
}
</style>
