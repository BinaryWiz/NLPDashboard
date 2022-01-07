<template>
  <div id="container">
    <div id="cluster-container" v-for="cluster in clusters" :key="cluster">
      <hr>
      <p v-for="title in cluster" :key="title">{{ title }}</p>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  props: ['clusters']
}
</script>


<style scoped>
#container {
  display: flex;
  flex-flow: column;
  width: 97%;
  padding-top: 8px;
  padding-right: 15px;
  padding-left: 15px;
  border-radius: 9px;
  border: 1px solid rgba(222,222,222,0.3);
  -webkit-box-shadow: 10px 10px 8px -10px rgba(222,222,222,0.3);
  -moz-box-shadow: 10px 10px 8px -10px rgba(222,222,222,0.3);
  box-shadow: 10px 10px 8px -10px rgba(222,222,222,0.3);
  transition: all 0.3s;
}

#container:hover {
  transform: scale(1.01, 1.01);
  border: 1px solid rgba(222, 222, 222, 0);
  -webkit-box-shadow: 10px 10px 8px -5px rgba(222,222,222,1);
  -moz-box-shadow: 10px 10px 8px -5px rgba(222,222,222,1);
  box-shadow: 10px 10px 8px -5px rgba(222,222,222,1);
}

</style>