import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Vue.use(VueMaterial);

new Vue(App).$mount("#app");
