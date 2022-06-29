<template>
  <footer class="footer">
    <div class="container">
      <div class="footer_inner">
        <ul>
          <li>
            <span>Шрифт</span>
            <select @change="changeFont" name="font" id="font">
              <option value="Fira Sans Extra Condensed" selected>Default</option>
              <option value="Roboto">Roboto</option>
              <option value="Courier New">Courier New</option>
            </select>
          </li>
          <li>
            <span>Размер шрифта </span>
            <input @change="changeFontSize" id="fontSize" type="range" min="12" max="60" step="1" value="24">
          </li>
          <li>
            <span>Интервал</span>
            <input @change="changeFontInterval" id="fontInterval" type="range" min="30" max="100" step="1" value="50">
          </li>
          <li>
            <span>Размер поля</span>
            <input @change="changeInputSize"  id="inputSize" type="range" min="0" max="100" step="1" value="50">
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "App-footer.vue",
  methods: {
    changeFont() {
      const fontFamily = document.getElementById('font')
      const selectedFont = fontFamily.value
      document.querySelector("body").style.fontFamily = `${selectedFont}, sans-serif`;
    },
    changeFontSize() {
      console.log("CYKA")
      const fontSize = document.getElementById('fontSize')
      document.querySelector(".text_placeholder").style.fontSize = fontSize.value + "px"
    },
    changeFontInterval() {
      const fontInterval = document.getElementById('fontInterval')
      document.querySelector(".text_placeholder").style.lineHeight = fontInterval.value + "px"
    },
    changeInputSize() {
      const inputSize = document.getElementById('inputSize')
      document.querySelector(".text_input").style.fontSize = inputSize.value + "px"
    }
  }
}
</script>

<style>
body {
  font-family: 'Fira Sans Extra Condensed', sans-serif;
}
.footer {
  padding-bottom: 50px;
}
.footer_inner ul {
  justify-content: center;
  display: flex;
  align-items: center;
}

.footer_inner ul li {
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-right: 1px solid #fff;
}
.footer_inner ul li:last-child {
  margin-right: 0;
  border-right: 0;
}
.footer_inner ul li span {
  margin-right: 5px;
}
</style>