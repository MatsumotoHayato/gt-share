<template>
  <div>
    <radar-chart :chart-data="datacollection" :options="options"></radar-chart>
  </div>
</template>

<script>
  import RadarChart from './RadarChart.js'
  export default {
    props: [
      'post',
      'average'
    ],
    components: {
      RadarChart,
    },
    data() {
      return {
        datacollection: null,
        options: {
          responsive: true,
          scale: {
            pointLabels: {
              fontSize: 12,
            },
            ticks: {
              // 目盛りの設定
              beginAtZero: true,
              min: 0,
              max: 5,
              stepSize: 1,
              fontSize: 12,
              fontColor: "#9E9E9E"
            }
          },
          tooltips: {
            callbacks: {
              title: function (tooltipItem, data) {
                return data.labels[tooltipItem[0].index]
              },
              label: function (tooltipItem, data) {
                // ラベルの表示を小数点第2位までに設定
                return data.datasets[tooltipItem.datasetIndex].label + ": "
                + Math.round(tooltipItem.yLabel * Math.pow(10, 2)) / Math.pow(10, 2);
              }
            }
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    },
    // watch: {
    //   average(){
    //     this.addAverageChart()
    //   }
    // },
    created() {
      this.radarChart()
      // if(this.average){
      //   this.addAverageChart()
      // }
    },
    methods: {
      radarChart() {
        this.datacollection = {
          labels: ["簡単度", "耳コピしやすさ", "覚えやすさ", "必要機材の少なさ", "演奏時の楽しさ"],
          datasets: [
          {
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointBorderWidth: 1,
            pointRadius: 4,
            label: "この投稿",
            data: [
              this.post.score_easy,
              this.post.score_copy,
              this.post.score_memorize,
              this.post.score_cost,
              this.post.score_enjoyment,
            ]
          }
          ],
        }
        if(this.average){
          this.addAverageChart()
        }
      },
      addAverageChart() {
        this.datacollection.datasets.push({
          backgroundColor: 'rgba(201, 203, 207, 0.3)',
          borderColor: 'rgb(201, 203, 207)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(201, 203, 207, 0.6)',
          pointBorderWidth: 1,
          label: "平均値",
          data: [
            this.average.average_score_easy,
            this.average.average_score_copy,
            this.average.average_score_memorize,
            this.average.average_score_cost,
            this.average.average_score_enjoyment,
          ]
        })
      }
    }
  }
</script>