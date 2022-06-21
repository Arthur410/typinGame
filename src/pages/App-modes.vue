<template>
  <div class="modes_content">
    <div class="container">
      <div class="modes_row">
        <div class="modes_choice">
          <div v-for="mode in modes" class="modes_item" style="align-items: center" :key="mode.id" @click="modeChange(mode.name)">
            <span style="width:30px; height:30px; display:block; content:''; background:gray"></span>
            <div class="modes_item-info">
                <span class="more"></span>
                <h1 style="font-size:22px;">{{ mode.name }}</h1>
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
                <input placeholder="Название режима" type="text" v-model="modeName">
                <textarea placeholder="Введите описание" v-model="modeDesc"></textarea>
                <div class="mt15"></div>
                <button @click="modalChange(); setMode(modeName, modeDesc); ">Добавить</button>
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
axios.defaults.baseURL = 'http://localhost:3000'
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
      modesCounter: 0
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
    setMode(name, description) {
      let data = JSON.stringify({
        id: this.counter++,
        name,
        description,
        base: false,
      });
      axios.post('/modes', data, {headers:{"Content-Type" : "application/json"}}).then(() => {
        this.getFromData()
        alert("Режим успешно добавлен.")
      }).catch(error => {
        console.log(error);
      });
      this.modName = '';
      this.modeDesc = '';
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
    width: 500px;
    background: #ffff;
    position: relative;
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
    flex-direction: column;
  }

  .modes_interface button {
    background: none;
    border: 1px solid #3f413e;
  }

  .modes_interface input {
    margin-top: 15px;
    padding:5px;
    border-bottom: 1px solid #3f413e;
  }

  .modes_interface textarea {
    margin-top: 15px;
    resize:none;
    padding:5px;
    border-bottom: 1px solid #3f413e;
  }
</style>