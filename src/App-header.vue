<template>
  <header class="header">
    <div class="container">
      <div class="header_bar">
        <div class="header_bar-col">
          <div class="header_logo">
            <router-link to="/">
              <img src="../public/text-box.png" style="width: 60px; height:60px; filter: invert();" alt="">
            </router-link>
          </div>
          <div class="header_nav">
            <ul style="display:flex;">
              <li><router-link class="header_nav-link" to="/statistics">Статистика</router-link></li>
              <li><router-link class="header_nav-link" to="/modes">Режимы</router-link></li>
              <li><router-link class="header_nav-link" to="/settings">Настройки</router-link></li>
            </ul>
          </div>
        </div>
        <div class="header_bar-col">
          <div class="bread-crumps" :key="currentMode">Выбран режим "{{ currentMode }}"</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ['currentMode'],
  methods: {
    modeUpdate() {
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
/* HEADER */
.header_bar {
  padding: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.header_bar-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header_nav-link{
  margin-left: 30px;
  opacity: 0.8;
  letter-spacing: 2px;
  font-size: 18px;
  cursor:pointer;
  position: relative;
  transform: scale(1.1);
  transition: all .1s linear;
}

.header_nav-link:hover {
  opacity: 1;
}
.header_nav-link:before {

  content:"";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  border-radius: 2px;
  height: 0;
  background: white;
  transition: all .1s linear;
}

.header_nav-link:hover:before {
  height: 2px;
}
</style>