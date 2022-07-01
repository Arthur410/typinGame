<template>
  <div class="app_content">
    <form class="form">
      <div class="form_block" v-if="!textDone">
        <p class="form_text">{{textGoal}}</p>
        <div class="mt15"></div>
        <input type="text" v-model="textTyped" @input="typeCheck" class="form_input" />
      </div>
    </form>
    <div class="result" style="text-align: center">
      <p class="typeSpeed" v-if="textDone">Ваша скорость составляет {{typeSpeed}} зн/мин.</p>
      <button v-if="textDone" @click="textRefresh" class="text_refresh">Again</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
import heightChange from "@/heightChange";
export default {
  data() {
    return {
      typeSpeed:0,
      typedSymbols: [],
      textTyped:'',
      textGoal: '',
      textBefore: '',
      textAfter: '',
      textDone:false,
      timeStart: 0,
      timeEnd: 0,
    }
  },
  mixins: [heightChange],
  created() {
    this.homeHeight()
    let mode = localStorage.getItem('mode')
    axios.get('/modes').then(response => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].name === mode) {
          if (response.data[i].modeCreate === "withWords") {
            for (let j = 0; j < 20; j++) {
              this.textGoal += response.data[i].textBase[this.getRandomIntInclusive(0, response.data.length - 1)]
              if (j === 19) {
                this.textGoal += "."
              } else {
                this.textGoal += " "
              }
            }
          } else if (response.data[i].modeCreate === "wholeText") {
            this.textGoal = response.data[i].textBase[this.getRandomIntInclusive(0, response.data.length - 1)]
          }
        }
      }
    })
  },
  updated() {
    this.homeHeight()
  },
  methods: {
    colorChange(color) {
      if (color === 'red') {
        document.querySelector('.form_input').style.background = 'red'
      } else if (color === 'default') {
        document.querySelector('.form_input').style.background = 'white'
      }
    },

    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    },

    typeCheck() {
      if (this.timeStart === 0) {
        this.timeStart = Math.round(+new Date())
      }
      // Если пользователь начал стирать текст, чтобы не допустить добавления символов в обратном порядке
      if (this.textBefore.length + 1 > this.textTyped.length) {
        console.log('something')
        this.colorChange('default')
      } else
        // Записываем текущий символ
        this.currentSymbol = this.textTyped[this.textTyped.length - 1]

        // Если этот символ не равен ожидаемому, то выкидываем ошибку
        if ((this.currentSymbol !== this.textGoal[this.textBefore.length + 1]) && this.typedSymbols.length > 0) {
          this.colorChange('red');
          // Если же символ верен, можем его обрабатывать
        } else if ((this.currentSymbol !== this.textGoal[this.textBefore.length]) && this.typedSymbols.length === 0) {
          this.colorChange('red');
          this.currentSymbol = '';
        } else {
          this.colorChange('default');
          this.typedSymbols.push(this.currentSymbol)

          if (this.textTyped.length > 1) {
            this.textBefore += this.typedSymbols[this.textTyped.length - 2]
          }

          if (this.textTyped === this.textGoal) {
            this.timeEnd = Math.round(+new Date())
            this.typeSpeed = Math.round(this.textGoal.length / ((this.timeEnd - this.timeStart) / 1000) * 60)
            this.textDone = true
          }
        }
      }
    },
    textRefresh() {
      this.textDone = false
      this.textAfterType = this.textGoal
      this.textBefore = ''
      this.currentSymbol = ''
      this.textTyped = ''
      this.typedSymbols = []
      this.typeSpeed = 0
      this.timeStart = 0
      this.timeEnd = 0
  }
}

</script>

<style scoped>

.app_content {
  width: 100%;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
}

.form {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}



#app {
  overflow:hidden;
}

.typeSpeed {
  margin-bottom:10px;
}

.form_text {
  max-width:800px;
  font-size: 32px;
  opacity: 0.6;
}

.form_input {
  resize:none;
  overflow: hidden;
  width: 100%;
  font-size: 32px;
  color: #000;
  line-height: 1;
  padding: 5px 10px;
}

.form_block {
  position: relative;
  min-width: 800px;
}

.text {
  font-size: 32px;
  opacity: 0.3;
}
</style>