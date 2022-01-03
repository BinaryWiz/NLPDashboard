<template>
  <div id="app-container">
    <sidenav />
    <batch-data-container />
    <graph-container />
  </div>
</template>

<script>
import BatchDataContainer from './components/BatchDataContainer'
import GraphContainer from './components/GraphContainer'
import SideNav from './components/SideNav.vue'

export default {
  components: {
    'batch-data-container': BatchDataContainer,
    'graph-container': GraphContainer,
    'sidenav': SideNav
  },
}
</script>

<style>
  body, html {
    height: 100%;
    width: 100%;
  }

  #app {
    height: 100%;
  }

  #app-container {
    height: 100%;
  }
</style>
