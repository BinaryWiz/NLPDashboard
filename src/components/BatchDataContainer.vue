<template>
  <div id="batch-data-container">
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
    <batch-data />
  </div>
</template>

<script>
import BatchData from './BatchData.vue'
export default {
  components: {
    'batch-data': BatchData,
  }
}
</script>

<style scoped>
#batch-data-container {
  display: flex;
  flex-flow: column;
  align-items: center;
  border: 2px solid blue;
  height: 55%;
  overflow-y: auto;
}

#batch-data-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(18, 105, 163, 0.3);
	-webkit-box-shadow: inset 0 0 6px rgba(18, 105, 163, 0.3);
	background-color: #F5F5F5;
}

#batch-data-container::-webkit-scrollbar {
	width: 6px;
	background-color: #F5F5F5;
}

#batch-data-container::-webkit-scrollbar-thumb {
	background-color: rgba(6, 61, 240, 0.822);
}
</style>
