<template>
  <div id="app-container">
    <sidenav />
    <batch-data-container v-if="view == 'model info'" />
    <graph-container v-if="view == 'model info'" />
    <model-inference v-if="view == 'model inference'"></model-inference>
  </div>
</template>

<script>
import BatchDataContainer from './components/BatchDataContainer'
import GraphContainer from './components/GraphContainer'
import SideNav from './components/SideNav.vue'
import ModelInference from './components/ModelInference.vue'

export default {
  components: {
    'batch-data-container': BatchDataContainer,
    'graph-container': GraphContainer,
    'sidenav': SideNav,
    'model-inference': ModelInference
  },
  computed: {
    view () {
      return this.$store.state.view
    }
  }
}
</script>

<style>
body, html {
  height: 100%;
  width: 100%;
  font-family: 'muli';
}

#app {
  height: 100%;
}

#app-container {
  height: 100%;
}
</style>
