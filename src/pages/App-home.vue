<template>
  <div class="app_content">
    <text-typing :text="textGoal"></text-typing>
  </div>
</template>

<script>
import textTyping from '../modules/textTyping'
import heightChange from "@/heightChange";
export default {
  data() {
    return {
      textGoal: '',
    }
  },
  mixins: [heightChange],
  created() {
    this.homeHeight()
  },
  updated() {
    this.homeHeight()
  },
  components: {
    textTyping
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
#app {
  overflow:hidden;
}
</style>