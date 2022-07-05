<template>
  <div class="statistics">
   <div class="container">
     <div class="statistics_inner">
       <div class="row">
         <ul class="statistics_content col">
           <li class="statistics_total">Количество текстов: {{textTotal}}</li>
           <li class="statistics_speed">Средняя скорость: {{avSpeed}}</li>
           <li class="statistics_accuracy">Средняя точность: {{avAccuracy}}</li>
           <li class="statistics_frequent">Самый частый режим - {{frequentMode}}</li>
           <li class="statistics_time">Общее время печатания: {{typeTime}}</li>
         </ul>
         <div class="col">
           <LineChart :options="options" :chartData="chartData"></LineChart>
         </div>
       </div>
     </div>
   </div>
  </div>

</template>

<script>
import LineChart from '../modules/LineChart.vue'
import heightChange from "../heightChange";
import axios from "axios"
export default {
  mixins: [heightChange],
  data() {
    return {
      textTotal: 0,
      avSpeed: 0,
      frequentMode: '',
      typeTime: 0,
      avAccuracy: 0,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Скорость',
            data: [],
            borderColor: "rgba(255,255,255,0.6)",
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
      }
    }
  },
  created() {
    this.homeHeight()
    this.getStatistics()
  },
  updated() {
    this.homeHeight()
  },
  methods: {
    getStatistics() {
      let frequentSpeed = 0
      let frequentAccuracy = 0
      let frequentTexts = 0
      let maxMode = []
      const months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
          ]
      axios.get("/statistics").then(response => {
        this.textTotal = response.data.length
        for (let i = 0; i < response.data.length; i++) {
          maxMode.push(response.data[i].modeName)
          this.typeTime += response.data[i].time
          if (this.chartData.labels.length === 0) {
            this.chartData.labels.push(months[response.data[i].date.split('.')[1] - 1])
          } else {
            let flag = 1;
            for (let j = 0; j < this.chartData.labels.length; j++) {
              if (this.chartData.labels[j] === months[response.data[i].date.split('.')[1] - 1]) {
                flag = 0
              }
            }
            if (flag) {
              this.chartData.labels.push(months[response.data[i].date.split('.')[1] - 1])
            }
          }
        }
        return response
      }).then(response => {
        let totalMax = 0
        this.frequentMode = "Отсутствует"
        for (let i = 0; i < maxMode.length - 1; i++) {
          let tempMax = 0
          for (let j = i + 1; j < maxMode.length; j++) {
            if (maxMode[i] === maxMode[j]) {
              tempMax++
            }
          }
          if (totalMax <= tempMax) {
            totalMax = tempMax
            this.frequentMode = maxMode[i]
          }
        }
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].modeName === this.frequentMode) {
            frequentSpeed += response.data[i].speed
            frequentAccuracy += response.data[i].accuracy
            frequentTexts++
          }
        }
        if (this.textTotal === 0) {
          this.frequentMode = "Отсутствует"
        } else {
          if (Math.round(this.typeTime / 60) === 0) {
            this.typeTime = this.typeTime + " " + this.declOfNum(this.typeTime, ['секунда', 'секунды', 'секунд'])
          } else if (Math.round(this.typeTime / 60 / 60) === 0) {
            this.typeTime = Math.round(this.typeTime / 60) + " " + this.declOfNum(Math.round(this.typeTime / 60), ['минута', 'минуты', 'минут'])
          } else {
            this.typeTime = Math.round(this.typeTime / 60 / 60) + " " + this.declOfNum(Math.round(this.typeTime / 60 / 60), ['час', 'часа', 'часов'])
          }
          this.avSpeed = Math.round(frequentSpeed / frequentTexts * 10) / 10
          this.avAccuracy = Math.round(frequentAccuracy / frequentTexts * 10) / 10
        }

        return response
      }).then(response => {
        for (let i = 0; i < this.chartData.labels.length; i++) {
          let monthMax = 0;
          for (let j = 0; j < response.data.length; j++) {
            if (months[response.data[j].date.split('.')[1] - 1] === this.chartData.labels[i]) {
              if (monthMax < response.data[j].speed && response.data[j].modeName === this.frequentMode) {
                monthMax = response.data[j].speed
              }
            }
          }
          this.chartData.datasets[0].data.push(monthMax)
        }
      })
    },
    declOfNum(n, text_forms) {
      n = Math.abs(n) % 100;
      let n1 = n % 10;
      if (n > 10 && n < 20) { return text_forms[2]; }
      if (n1 > 1 && n1 < 5) { return text_forms[1]; }
      if (n1 === 1) { return text_forms[0]; }
      return text_forms[2];
    }
  },
  components: {
    LineChart
  }
}
</script>

<style>
.statistics {
  width: 100%;
  font-size: 24px;
  height: 100%;
}

.statistics_content {
  opacity: 0.7;
}

.statistics_inner {
  height: 100%;
}

.row {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.col {
  width: 50%;
}

.statistics li {
  margin: 10px 0;
}
</style>