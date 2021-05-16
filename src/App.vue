<template>
  <div id="app-container">
    <navbar :modelName="currentModelName" :modelOptions="modelOptions"> </navbar>
    <batch-data-container />
    <graph-container />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import BatchDataContainer from './components/BatchDataContainer'
import GraphContainer from './components/GraphContainer'
export default {
  data () {
    return {
      currentModelName: 'TransformerCharacterBERT',
      modelOptions: ['TransformerCharacterBERT', 'CharacterBERT', 'ScaledCharacterBERT']
    }
  },
  components: {
    Navbar,
    'batch-data-container': BatchDataContainer,
    'graph-container': GraphContainer
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
