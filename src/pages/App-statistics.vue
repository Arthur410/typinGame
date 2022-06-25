<template>
  <div class="statistics_content">
    <h1>This is statistics page!</h1>
  </div>
</template>

<script>
import heightChange from "../heightChange";
import axios from "axios"
export default {
  mixins: [heightChange],
  created() {
    this.defaultHeight()
  },
  updated() {
    this.defaultHeight()
  },
  methods: {
    getStatistics() {
      axios.get("/statistics")
    }
  }
}
</script>

<style scoped>

</style>