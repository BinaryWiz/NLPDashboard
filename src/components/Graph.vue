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
      chartOptions: {
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    dataCollection () {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.title,
            backgroundColor: '#FF1744',
            data: this.data
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
  div {
    height: 100%;
  }

</style>
