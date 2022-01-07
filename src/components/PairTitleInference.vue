<template>
  <div id="container" :class="matchClass">
    <div id="title-container">
      <h1>Title One: {{ titleOne }}</h1>
      <h1>Title Two: {{ titleTwo }}</h1>
    </div>
    <div id="percentage">
      <h1 id="percentage-title">Match Percent</h1>
      <p id="match-percentage">{{ matchPercentage }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['titleOne', 'titleTwo', 'matchPercentage'],
  computed: {
    matchClass () {
      return {
        match: this.matchPercentage >= 50,
        'no-match': this.matchPercentage < 50
      }
    }
  }
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
  -webkit-box-shadow: 10px 10px 8px -10px rgba(222,222,222,0.3);
  -moz-box-shadow: 10px 10px 8px -10px rgba(222,222,222,0.3);
  box-shadow: 10px 10px 8px -10px rgba(222,222,222,0.3);
  transition: all 0.3s;
}

.match {
  border: 1px solid rgba(222,222,222,0.3);
  border-left: 5px solid rgb(0, 207, 0);
}

.no-match {
  border: 1px solid rgba(222,222,222,0.3);
  border-left: 5px solid red;
}

#container:hover {
  transform: scale(1.01, 1.01);
  border: 1px solid rgba(222, 222, 222, 0);
  -webkit-box-shadow: 10px 10px 8px -5px rgba(222,222,222,1);
  -moz-box-shadow: 10px 10px 8px -5px rgba(222,222,222,1);
  box-shadow: 10px 10px 8px -5px rgba(222,222,222,1);
}

#title-container {
  flex-grow: 1;
  border-right: 1px solid gray;
}

#title-container > h1 {
  display: flex;
  flex-flow: column;
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