<template>
  <div id="app">
    <MainWrapper />
  </div>
</template>

<script>
import MainWrapper from "./components/layout/main-wrapper.vue";

export default {
  name: "App",
  components: {
    MainWrapper
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
