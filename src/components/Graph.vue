<template>
  <div>
    <line-chart :chart-data="dataCollection" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
  props: ['title', 'data', 'labels'],
  components: {
    LineChart
  },
  data () {
    return {
      dataCollection: null,
      chartOptions: {
        maintainAspectRatio: false
      }
    }
  },
  created () {
    this.fillData()
  },
  methods: {
    fillData () {
      console.log(this.data)
      this.dataCollection = {
        labels: this.labels,
        datasets: [
          {
            label: this.title,
            backgroundColor: '#FF1744',
            data: this.data
          }
        ]
      }
    },
    getRanList (size) {
      let ranArr = []
      for (var i = 0; i < size; i++) {
        ranArr.push(i * Math.floor(i * Math.random()))
      }
      return ranArr
    }
  }
}
</script>

<style scoped>
  div {
    height: 100%;
  }

</style>
