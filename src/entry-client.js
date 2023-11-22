import "es6-promise/auto";
import createApp from "./app";
//import LoginModal from "components/modals/components/LoginModal.vue";

const { app, router, store, apollo } = createApp(window.__INITIAL_STATE__._env);

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
  store.state._window_size = window.innerWidth;
  store.state._env = window.__INITIAL_STATE__._env || {};
  store.state.apollo_token = window.__INITIAL_STATE__.apollo_token || undefined;
}

router.onReady(() => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("no_auth") === "1") {
    //store.state._modals.push({
    //  component: LoginModal,
    //});
    urlParams.delete("no_auth");
    history.replaceState(null, "", location.pathname + urlParams);
  }
  router.beforeEach((to, from, next) => {
    if (to.meta.authRequired && !store.state.user) {
      //store.state._modals.push({
      //  component: LoginModal,
      //});
      next(false);
    } else {
      next();
    }
  });
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const asyncDataHooks = matched.map((c) => c.asyncData).filter((_) => _);
    if (!asyncDataHooks.length) {
      return next();
    }
    return Promise.all(asyncDataHooks.map((hook) => hook({ store, route: to, apollo })))
      .then(() => {
        next();
      })
      .catch(next);
  });
  app.$mount("#app");
});

if (location.protocol === "https:" && navigator.serviceWorker) {
  navigator.serviceWorker.register("/service-worker.js").then((value) => {
    console.log(value);
  });
}
