<template>
  <div class="popup__wrapper" ref="popup__wrapper">
    <div class="popup">
      <div class="popup__header">
        <span><i class="material-icons close" @click="closePopup"></i></span>
      </div>
      <div class="popup__content">
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "popup",
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
  mounted() {
    document.addEventListener("click", (item) => {
      if (item.target === this.$refs.popup__wrapper) {
        this.closePopup();
      }
    });
  },
};
</script>

<style lang="scss">
.popup__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(64, 64, 64, 0.4);
  z-index: 3;
}

.popup__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.popup__content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.submit_btn {
  padding: 8px;
  color: white;
  background: green;
}
.close_modal {
  padding: 8px;
  color: white;
  background: red;
}
.popup {
  position: fixed;
  padding: 20px 40px;
  top: 50%;
  transform: translateY(-65%);
  box-shadow: 0 0 18px 0 #80807e;
  z-index: 3;
  background: #fff;
  max-width: 500px;
}
.material-icons.close {
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
