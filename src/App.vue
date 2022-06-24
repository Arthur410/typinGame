<template>
  <AppHeader :current-mode="currentMode" />
  <router-view />
</template>

<script>

import AppHeader from './App-header'
export default {
  data() {
    return {
      text: '',
      currentMode: localStorage.getItem("mode"),
    }
  },
  components: {
    AppHeader
  },
  methods: {
    defaultHeight() {
      const app = document.querySelector('#app')
      app.style.height = "auto"
      app.style.display = "block"
      app.style.flexDirection = "inherit"
    },
  }
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/****************** MAIN PAGE *************************/

/* APP BLOCK */

.mt15 {
  margin-top: 15px;
}

button {
  padding:10px 15px;
  border:none;
  background: white;
  color: black;
  font-size: 16px;
  opacity: 0.7;
  transition: all .2s linear;
}

button:hover {
  opacity: 1;
}

/************************DEFAULT***************************/

* {
  font-family: 'Fira Sans Extra Condensed', sans-serif;
  padding: 0;
  margin: 0;
  border: 0;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

:focus,
:active {
  outline: none;
}

a:focus,
a:active {
  outline: none;
}

nav,
footer,
header,
aside {
  display: block;
}
html,
body {
  overflow-x: hidden;
  max-height: 100%;
  width: 100%;
  line-height: 1;
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  background: #3f413e;
  color:white;
}

input,
button,
textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}

button {
  cursor: pointer;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

a,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

p,
dl,
ol,
ul,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: 400;
}
</style>
