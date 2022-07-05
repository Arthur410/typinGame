<template>
  <AppHeader :current-mode="currentMode" />
  <router-view />
</template>

<script>
import AppHeader from './modules/App-header'
export default {
  data() {
    return {
      text: '',
      currentMode: localStorage.getItem("mode"),
    }
  },
  components: {
    AppHeader,
  },
  created() {
    document.querySelector('body').classList.add('vsc-initialized')
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
  width: 100%;
  height: 100%;
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


/* ========== Adaptive ================= */
@media (max-width: 320px) {
  .container {
    padding: 15px;
    max-width: 320px;
  }
  .footer_inner ul li {
    font-size: 14px;
  }

  .modes_choice .modes_item {
    margin: 20px 0;
  }
}

@media (max-width: 992px) {

  .row, .modes_row, .footer_inner ul {
    flex-direction: column;
  }
  .modes_choice .modes_item {
    margin: 30px 0;
  }
  .modes_row .modes_choice, .modes_row .modes_create {
    width: 100%;
    margin-top: 0;
  }


  .text_progress, .footer_inner li, .text_errors {
    font-size: 20px;
  }

  #app .footer_inner ul li {
    margin: 10px 0;
    border: 0;
  }

  .header_row {
    display: none;
  }

  .header_burger {
    display: block;
  }

  .header_row.mobile {
    display: block;
  }
}

@media (max-width: 1200px) {
  .container {
    padding: 15px;
    max-width: 992px;
  }
  .statistics_inner .row {
    flex-direction: column;
  }
  .statistics_inner .col{
    width: 100%;
  }
}
</style>
