import Vue from "vue";
import Router from "vue-router";

import homePage from "../pages/home_page";
import contactsPage from "../pages/contacts_page";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "homePage",
      component: homePage,
    },
    {
      path: "/contact_page",
      name: "contactsPage",
      component: contactsPage,
    },
  ],
});

export default router;
