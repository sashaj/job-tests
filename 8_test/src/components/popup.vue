<template>
  <div class="popup__wrapper" ref="popup__wrapper">
    <div class="popup">
      <div class="popup__header">
        <span>{{modalTitle}}</span>
        <span>
          <i class="material-icons close" @click="closePopup"></i>
        </span>
      </div>
      <div class="popup__content">
        <slot></slot>
      </div>
      <div class="popup__footer">
        <button class="close_modal" @click="closePopup">close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "popup",
  props: {
    rightBtnTitle: {
      type: String,
      default: "Ok"
    },
    modalTitle: {
      type: String,
      default: "Ok"
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
    rightBtnAction() {
      this.$emit("rightBtnAction");
    }
  },
  mounted() {
    document.addEventListener("click", item => {
      if (item.target === this.$refs.popup__wrapper) {
        this.closePopup();
      }
    });
  }
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
.popup {
  padding: 16px;
}
.popup__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.popup__content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
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
  cursor: pointer;
}
.popup {
  position: fixed;
  padding: 16px;
  top: 30%;
  width: 400px;
  box-shadow: 0 0 18px 0 #000;
  z-index: 3;
  background: #fff;
}
.material-icons.close {
  cursor: pointer;
}
</style>
