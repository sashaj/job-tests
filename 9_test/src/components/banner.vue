<template>
  <div class="banner__wrapper">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: "banner",
  methods: {
   
  },

};
</script>

<style lang="scss" scoped>
.banner__wrapper{
    width: 100%;
    box-shadow: 0px 6px 12px rgba(3, 154, 114, 0.24);
    background: #fff;
}
</style>