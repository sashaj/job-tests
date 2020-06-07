<template>
  <div class="main-wrapper">
    <vHeader></vHeader>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
 import vHeader from '../components/v-header.vue'
export default {
  name: "main-wrapper",
  components: {
    vHeader,
  },
  data: function() {
    return {
      title: "Main wrapper"
    };
  },
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 82px;
  margin: 0 auto;
  flex-direction: column;
  max-width: 800px;
}
</style>