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
  height: 54.7%;
  overflow-y: auto;
  border: 1px solid rgba(222,222,222,0.3);
  margin-top: 0.3%;
  margin-bottom: 0.3%;
  border-radius: 15px;
  -webkit-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  -moz-box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
  box-shadow: 10px 10px 8px -10px rgba(222,222,222,1);
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
