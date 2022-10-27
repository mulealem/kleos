import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style.css";
import "flowbite";

// import VueNumerals from "vue-numerals";

// Vue.use(VueNumerals); // default locale is 'en'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
