<template>
  <div class="text">
    <div class="container">
      <div class="text_inner" v-if="!textDone">
          <div class="text_placeholder">
            <span class="text_before">{{textBefore}}</span>
            <span class="text_symbol">{{textSym}}</span>
            <span class="text_after">{{textAfter}}</span>
          </div>
          <div class="mt15"></div>
          <input class="text_input" v-model="textTyped" @input="typeCheck"/>
      </div>
      <div class="mt15"></div>
      <div v-if="!textDone" class="text_progress" :key="restSymbols">Осталось набрать {{restSymbols}} символов</div>
      <div class="mt15"></div>
      <div v-if="!textDone" class="text_errors" :key="restSymbols">Кол-во ошибок: {{errors}}</div>
      <div class="result" style="text-align: center">
        <p class="typeSpeed" v-if="textDone">Ваша скорость составляет {{typeSpeed}} зн/мин.</p>
        <div class="mt15"></div>
        <p class="typeAccuracy" v-if="textDone">{{errorsText}}. Ваша точность составляет {{typeAccuracy}}%</p>
        <div class="mt15"></div>
        <button v-if="textDone" @click="textRefresh" class="text_refresh">Заново</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      words: [],
      textTyped: '',
      wordsTypedLength: 0,
      textDone: false,
      textGoal: '',
      typeSpeed: 0,
      restSymbols: 0,
      textBefore: '',
      textAfter: '',
      textSym: '',
      prevSym: '',
      timeStart:0,
      timeEnd:0,
      prevLen: 0,
      errors: 0,
      lastError: 0,
      typeAccuracy: 0,
      errorsText: ''
    }
  },
  methods: {
    typeCheck() {
      if (!this.timeStart) {
        this.timeStart = Math.round(+new Date())
      }
      let curLen = this.wordsTypedLength
      let curWord = this.textTyped
      let temp = '';
      // Минимальная длина для дальнейшей проверки слова на правильность
      let minWordLen = 0;

      (curWord.length < this.words[curLen].length) ? minWordLen = curWord.length : minWordLen = this.words[curLen].length;
      // Составляем слово, с которым нужно проверять введенное
      for (let i = 0; i < minWordLen; i++) {
        temp += this.words[curLen][i]
      }

      // Сравниваем на то, не является ли последним словом введенное слово, т.к. в таком случае пробел прибавлять не требуется, также нужна проверка на длину слова, т.к. например в середине слова пробел не требуется.
      if (curLen !== this.words.length - 1 && curWord.length - 1 === this.words[curLen].length) {
        temp += " "
      }

      if (curWord !== temp || curWord === "" || temp === "") {
        if (curWord !== temp && !document.querySelector(".text_input").classList.contains("error")) {
          this.errors++
          document.querySelector(".text_input").classList.add("error")
          this.lastError = 1
        } else if (curWord === "" && this.prevLen === 1) {
          document.querySelector(".text_input").classList.remove("error")
          this.textAfter = this.textSym + this.textAfter
          this.textSym = ""
        }
        this.prevLen = curWord.length
      } else {
        document.querySelector(".text_input").classList.remove("error")
        if (this.prevLen < curWord.length) {
          if (this.lastError) {
            if (curLen >= 1 && curWord.length <= 1) {
              this.textSym = curWord[curWord.length - 1]
              this.restSymbols--
              if (this.textAfter[0] === " ") {
                this.textAfter = this.textAfter.slice(2)

              } else {
                this.textAfter = this.textAfter.slice(1)
              }
            } else { //
              this.textSym = curWord[curWord.length - 1]
              this.restSymbols--
              this.textAfter = this.textAfter.slice(1)
            }
          } else { // Если ввод идет правильно по тексту
            this.textSym = curWord[curWord.length - 1]
            this.restSymbols--
            this.textAfter = this.textAfter.slice(1)
            if (curWord.length > 1) {
              this.textBefore += curWord[curWord.length - 2]
            }
          }
        } else if (curWord.length < this.words[curLen].length) {
          if (this.prevLen > curWord.length && this.lastError) {
            // Пользователь начал стирать слово
          } else {
            this.textSym = curWord[curWord.length - 1]
            this.textAfter = this.prevSym + this.textAfter
            this.textBefore = this.textBefore.slice(0, -1)
          }
        }
        this.prevSym = this.textSym
        this.prevLen = curWord.length
        this.lastError = 0
      }
      // Если слово не последнее в тексте
      if (curWord === this.words[curLen] + " " && curLen !== this.words.length - 1) {
        this.wordsTypedLength++
        this.textBefore += " "
        this.textTyped = ""
        this.prevLen = -1
      } else if (curLen === this.words.length - 1 && curWord === this.words[curLen]) {
        this.wordsTypedLength++
        this.textBefore += " "
        this.textTyped = ""
        this.prevLen = -1
      }
      // Проверка на выполненность текста
      if (this.wordsTypedLength === this.words.length) {
        this.typeAccuracy = Math.round(((this.textGoal.length - this.errors) / this.textGoal.length) * 100)
        curLen = 0
        this.words = Array.from(this.textGoal.split(" "))
        this.textDone = true
        this.timeEnd = Math.round(+new Date())
        this.typeSpeed = Math.round(this.textGoal.length / ((this.timeEnd - this.timeStart) / 1000) * 60)
        let data = {
          "speed": this.typeSpeed,
          "modeName": localStorage.getItem("mode"),
          "accuracy": this.typeAccuracy,
          "time": Math.round((this.timeEnd - this.timeStart) / 1000),
          "date": new Date().getDate() + "." + (new Date().getMonth() + 1)
        }
        axios.post("/statistics", data, {headers:{"Content-Type" : "application/json"}})
        let temp = this.declOfNum(this.errors, ['ошибку', 'ошибки', 'ошибок'])
        this.errorsText = `Вы сделали ${this.errors} ${temp}`
      }
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    },
    textRefresh() {
      this.words = Array.from(this.textGoal.split(" "))
      this.wordsTypedLength = 0
      this.textDone = false
      this.typeSpeed = 0
      this.restSymbols = this.textGoal.length
      this.textAfter = this.textGoal
      this.textTyped =this.textBefore = this.textSym = this.prevSym = ''
      this.timeStart = this.timeEnd = this.prevLen = this.errors = this.lastError = this.typeAccuracy= 0
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
  created() {
    let mode = localStorage.getItem('mode')
    axios.get('/modes').then(response => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].name === mode) {
          if (response.data[i].modeCreate === "withWords") {
            const maxWords = 40;
            let modeWords = response.data[i].textBase[0].split(" ")
            for (let j = 0; j < maxWords; j++) {
              this.textGoal += modeWords[this.getRandomIntInclusive(0, modeWords.length - 1)]
              if (j === maxWords - 1) {
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
    }).then(() => {
      this.restSymbols = this.textGoal.length
      this.textAfter = this.textGoal
      this.words = Array.from(this.textGoal.split(" "))
    })
  }
}
</script>

<style scoped>
.text {
  width: 100%;
  position: relative;
}
.text_inner {
  background: rgba(255,255,255, 0.1);
  border-radius: 10px;
  padding:15px;
  box-shadow: 0 0 15px 5px rgba(0,0,0, 0.1125);
}
.text_placeholder {
  font-size: 32px;
  transition: all .2s linear;
  color:#fff;
  line-height: 1;
}

.text_before {
  transition: all .1s linear;
  opacity: 0.6;
}

.text_symbol {
  border-bottom: 2px solid #ffff;
}


.text_input {
  color: #ffffff;
  overflow: hidden;
  border: 1px solid #ffff;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  font-size: 24px;
  padding: 5px 10px;
  background: transparent;
  margin: 0;
  line-height: 1;
  resize:none;
}

.text_input.error {
  background: #740909;
}

.text_progress, .text_errors {
  text-align: right;
}

</style>