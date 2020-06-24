import Vue from "vue";
import Router from "vue-router";

import PaymentPage from "../pages/payment-page";
import PaymentPage2 from "../pages/payment-page2";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "payment-page",
      component: PaymentPage,
    },
    {
      path: "/payment-page2",
      name: "payment-page2",
      component: PaymentPage2,
    },
  ],
});

export default router;
