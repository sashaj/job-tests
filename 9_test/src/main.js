import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import "./assets/styles/styles.scss";

Vue.config.productionTip = false;

Vue.directive('numeric-only', {
  bind(el) {
    el.addEventListener('keydown', (e) => {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault()
      }
    })
  }
});




new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
