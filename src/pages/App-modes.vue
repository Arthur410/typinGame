<template>
  <div class="modes_content">
    <div class="container">
      <div class="modes_row">
        <div class="modes_choice">
          <div v-for="mode in modes" class="modes_item" style="align-items: center" :key="mode.id">
            <span style="width:30px; height:30px; display:block; content:''; background:gray"></span>
            <div class="modes_item-info">
                <h1 style="font-size:22px;" @click="modeChange(mode.name)">{{ mode.name }}</h1>
                <p style="margin-top: 15px;">{{ mode.description }}</p>
                <div class="mt15"></div>
                <button v-if="!mode.base" @click="deleteMode(mode.id)">Удалить режим</button>
            </div>
          </div>
        </div>
        <div class="modes_create">
          <button @click="modalChange">Создать свой режим</button>
          <div class="modal" v-if="modal">
            <div class="modal_block">
              <span class="modal_close" @click="modalChange"></span>
              <div class="modes_interface" >
                <label for="mode_name" class="bold">Название режима</label>
                <input id="mode_name" type="text" v-model="modeName">
                <div class="mt15"></div>
                <label for="mode_desc" class="bold">Описание режима</label>
                <textarea id="mode_desc" v-model="modeDesc"></textarea>
                <div class="mt15"></div>
                <label for="mode_types" class="bold">Тип режима</label>
                <form id="mode_types" class="mode_types" style="padding-left: 10px">
                  <input name="mode_type" value="withWords" id="words" type="radio" style="margin-right: 5px;">
                  <label for="words">Слова (Текст для игры будет составляться из слов введенного вами текста, перемешанных в случайном порядке)</label>
                  <div class="mt15"></div>
                  <input name="mode_type" value="wholeText" id="text" type="radio" style="margin-right: 5px;">
                  <label for="text">Текст (Цельные тексты, разделяемые пустой строкой, единственный текст на словарь также допускается)</label>
                </form>
                <div class="mt15"></div>
                <label for="mode_content" class="bold">Содержание</label>
                <textarea id="mode_content" class="mode_content" v-model="modeContent"></textarea>
                <div class="mt15"></div>

                <button @click="modalChange(); setMode(modeName, modeDesc, modeContent); ">Добавить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//миксин нужен из за того, что на главном экране высота во всю высоту пользовательского окна,
//на остальных же нужно возвращать в обычное состояние
import heightChange from '../heightChange'
export default {
  data() {
    return {
      modes: [],
      modal: false,
      modeName:'',
      modeDesc: '',
      modeContent: '',
      modesCounter: 0,
    }
  },
  mixins: [heightChange],
  methods: {
    // Функция, для создания списка показа режимов
    getFromData() {
      this.modes = []
      axios.get("/modes").then(response => {
        for (let i = 0; i < response.data.length; i++) {
          // flag нужен для того, чтобы не закидывать повторяющиеся режимы в массив при добавке / удалении
          let flag = 1;
          if (this.modes.length !== 0) {
            for (let j = 0; j < this.modes.length; j++) {
              // Если в массиве уже есть такой элемент, то флаг ставится 0, т.е. далее он не добавляется
              if (JSON.stringify(response.data[i]) === JSON.stringify(this.modes[j])) {
                flag = 0
              }
            }
          }
          if (flag) {
            this.modes.push(response.data[i])
          }
        }
      })
    },
    // Открытие и закрытие модального окна
    modalChange() {
      this.modal = !this.modal
    },
    // Функция для добавления режима
    setMode(name, description, content) {
      let value = document.querySelector('input[name="mode_type"]:checked').value
      if (value === "withWords") {
        content = content.split(" ")
        console.log(content)
      } else if (value === "wholeText") {
        content = content.split("\n")
        console.log(content)
      }
      let data = JSON.stringify({
        id: this.counter++,
        name,
        description,
        "textBase": content,
        "modeCreate": value,
        base: false,
      });
      axios.post('/modes', data, {headers:{"Content-Type" : "application/json"}}).then(() => {
        this.getFromData()
        alert("Режим успешно добавлен.")
      }).catch(error => {
        console.log(error)
      });
      this.modeName = ''
      this.modeDesc = ''
      this.modeContent = ''
    },
    // Функция для удаления режима
    async deleteMode(id) {
      try {
        await axios.delete(`/modes/${id}`)
        this.getFromData()
        alert("Режим успешно удален.")
      } catch {
        alert("Произошла неожиданная ошибка.")
      }
    },
    modeChange(mode) {
      console.log("Меняем на ", mode)
      localStorage.setItem("mode", mode)
      this.$router.go(0);
    },
  },
  created() {
    this.getFromData()
    this.counter = this.modes.length
    this.defaultHeight()
  }
}
</script>

<style scoped>
  .container {
    position: unset;
  }
  .modes_row {
    display:flex;
  }
  .modes_choice {
    width: 70%;
  }
  .modes_create {
    margin-top: 50px;
    width: 30%;
  }

  .modes_create button {
    opacity: 0.7;
    padding:10px 15px;
    background: aliceblue;
    color: black;
    transition: all .2s linear;
  }

  .modes_create button:hover {
    opacity: 1;
  }
  .modal {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0, 0.6);
    z-index: 2;
  }

  .modal_block {
    padding:15px;
    width: 80%;
    background: #ffff;
    position: relative;
  }
  .modal_block label {
    margin-bottom: 5px;
  }

  .modal_close {
    right: 15px;
    top: 15px;
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    cursor:pointer;
  }
  .modal_close:before {
    width: 100%;
    background: #3f413e;
    height: 2px;
    content:"";
    position: absolute;
    top: 50%;
    transform: rotate(45deg);
  }

  .modal_close:after {
    width: 100%;
    background: #3f413e;
    height: 2px;
    content:"";
    position: absolute;
    top: 50%;
    transform: rotate(-45deg);
  }

  .modes_item {
    cursor:pointer;
    opacity: 0.7;
    margin: 50px 0;
    display: flex;
    position: relative;
    transition: all .1s linear;
  }

  .modes_item .more {
    content: "";
    width: 15px;
    height: 15px;
    opacity: 0.7;
    position: absolute;
    right: 0;
    top: 0;
  }
  .modes_item .more:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
    content:"";
    width: 7px;
    height: 7px;
    border: 7px solid transparent;
    border-top: 7px solid #fff;
    opacity: 0.7;
  }
  .modes_item:hover {
    opacity: 1;
  }

  .modes_item span {
    margin-right: 15px;
  }
  .modes_interface {
    display: flex;
    color: black;
    flex-direction: column;
  }

  .modes_interface button {
    background: none;
    border: 1px solid #3f413e;
  }

  .modes_interface input {
    padding:5px;
    border: 1px solid #3f413e;
  }

  .modes_interface textarea {
    resize:none;
    padding:5px;
    border: 1px solid #3f413e;
  }

  .bold {
    font-weight: 700;
  }

  .mode_types li {
    margin: 2px 0;
  }

  .mode_types-ps {
    opacity: 0.7;
  }
</style>