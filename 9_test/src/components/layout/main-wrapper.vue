<template>
  <div class="v-main-wrapper">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "v-main-wrapper",
  components: {
    // vHeader,
  },
  data: function() {
    return {
      title: "Main wrapper",
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
  max-width: 1200px;
}
</style>
