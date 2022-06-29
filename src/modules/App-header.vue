<template>
  <header class="header">
    <div class="container">
      <div class="header_row">
        <div class="header_col">
          <div class="header_logo">
            <router-link to="/">
              <img src="../../public/text-box.png" style="width: 60px; height:60px; filter: invert();" alt="">
            </router-link>
          </div>
          <ul class="header_nav">
            <li><router-link class="header_nav-link" to="/statistics">Статистика</router-link></li>
            <li><router-link class="header_nav-link" to="/modes">Режимы</router-link></li>
          </ul>
        </div>
        <div class="header_col">
          <div class="bread-crumps" :key="currentMode">Выбран режим "{{ currentMode }}"</div>
        </div>
      </div>
      <div class="header_row mobile" :class="{active: headerNav}">
        <div class="header_col">
          <div class="header_logo" @click="burgerActive = !burgerActive; headerNav = !headerNav">
            <router-link to="/">
              <img src="../../public/text-box.png" style="width: 60px; height:60px; filter: invert();" alt="">
            </router-link>
          </div>
          <ul class="header_nav">
            <li><router-link class="header_nav-link" to="/statistics" @click="burgerActive = !burgerActive; headerNav = !headerNav">Статистика</router-link></li>
            <li><router-link class="header_nav-link" to="/modes" @click="burgerActive = !burgerActive; headerNav = !headerNav">Режимы</router-link></li>
          </ul>
        </div>
        <div class="header_col">
          <div class="bread-crumps" :key="currentMode">Выбран режим "{{ currentMode }}"</div>
        </div>
      </div>
      <div @click="burgerActive = !burgerActive; headerNav = !headerNav" :class="{active:burgerActive}" class="header_burger">
        <span></span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      burgerActive: false,
      headerNav: false
    }
  },
  props: ['currentMode'],
  methods: {
    modeUpdate() {
      this.$forceUpdate()
    }
  }
}
</script>

<style>
/* HEADER */
.header_row {
  padding: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.header_col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header_nav {
  display: flex;
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
  color: #ffffff;
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

.header_burger {
  display: block;
  cursor:pointer;
  width: 50px;
  height: 50px;
  position: relative;
  z-index: 11;
}

.header_burger span {
  width: 100%;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 2px;
  background-color: #fff;
  transition: all .1s linear;
}

.header_burger span:before, .header_burger span:after {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  height: 2px;
  background-color: #fff;
  transition: all 0.2s linear;
}

.header_burger span:after {
  top: 13.5px;
}

.header_burger span:before {
  top: -13.5px;
}

.header_burger.active span {
  height: 0;
}
.header_burger.active span:after {
  transform: rotate(-45deg);
  top: 0;
}
.header_burger.active span:before {
  transform: rotate(45deg);
  top: 0;
}

.header_row.mobile {
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  background: rgba(0,0,0, 0.9);
  opacity: 1;
  z-index: 10;
  justify-content: unset;
  padding-bottom: 15px;
  transition: top .2s linear;
}

.header_row.mobile {
  flex-direction: column;
}

.header_row.mobile .header_col {
  flex-direction: column;
  text-align: center;
  width: 100%;
}

.header_row.mobile .header_col .header_nav {
  flex-direction: column;
  width: 100%;
  text-align: center;
}

.header_row.mobile .header_col .header_nav-link {
  margin-left: 0;
}

.header_row.mobile .header_nav li{
  margin: 10px 0;
}

.header_row.mobile.active {
  top: 0;
}
</style>