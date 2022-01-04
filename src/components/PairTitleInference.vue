<template>
  <div id="container">
    <div id="title-container">
      <h1>Title One: {{ titleOne }}</h1>
      <h1>Title Two: {{ titleTwo }}</h1>
    </div>
    <div id="percentage">
      <h1 id="percentage-title">Match %</h1>
      <p id="match-percentage">{{ matchPercentage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['titleOne', 'titleTwo', 'matchPercentage']
}
</script>

<style scoped>
#container {
  display: flex;
  flex-flow: row;
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

#title-container {
  border-right: 1px solid gray;
}

#title-container > h1 {
  font-size: 16px;
}

#percentage {
  text-align: center;
  padding-left: 16px;
}

#percentage-title {
  font-size: 16px;
}

#match-percentage {
  font-size: 32px;
}
</style>