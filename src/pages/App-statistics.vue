<template>
  <div class="statistics_content">
    <h1>This is statistics page!</h1>
  </div>
</template>

<script>
import heightChange from "../heightChange";

export default {
  mixins: [heightChange],
  created() {
    this.defaultHeight()
  },
  updated() {
    this.defaultHeight()
  }
}
</script>

<style scoped>

</style>