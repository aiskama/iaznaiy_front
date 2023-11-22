import Vue from "vue";
import * as filters from "./filters.js";

import App from "./App.vue";
import createStore from "./store";
import createRouter from "./router.js";
import createApollo from "./apollo.js";
import VueProgressBar from "vue-progressbar";
import Notifications from "vue-notification/dist/ssr.js";
import VueGoodTablePlugin from "vue-good-table";

import "vue-good-table/dist/vue-good-table.css";

import Meta from "vue-meta";
import Cookie from "vue-cookie";
import VueMask from "v-mask/dist/v-mask.min.js";

Vue.use(Meta);
Vue.use(Cookie);
Vue.use(VueMask);
Vue.use(VueGoodTablePlugin);
Vue.use(Notifications, {
  componentName: "Notifications",
});

Vue.use(VueProgressBar, {
  color: "#FEE34C",
  failedColor: "#EE1717",
  thickness: "2px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
});

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

export default function createApp(env) {
  const store = createStore();
  const router = createRouter();
  const apolloProvider = createApollo(env);
  const app = new Vue({
    router,
    store,
    apolloProvider,
    render: (h) => h(App),
  });

  return { app, router, store, apollo: apolloProvider };
}
