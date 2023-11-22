import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default function createRouter() {
  const routes = [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/index.vue"),
      meta: {
        showFooter: true,
      },
    },
    {
      path: "/catalog",
      name: "catalog",
      component: () => import("./views/catalog/index.vue"),
      meta: {
        showFooter: true,
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/about/index.vue"),
      meta: {
        showFooter: true,
      },
    },
    {
      path: "/catalog/:id",
      name: "catalog-open",
      component: () => import("./views/catalog/open.vue"),
      meta: {
        showFooter: true,
      },
    },
    {
      path: "/news",
      name: "news",
      component: () => import("./views/news/index.vue"),
      meta: {
        showFooter: true,
      },
    },
    {
      path: "/news/:id",
      name: "news-open",
      component: () => import("./views/news/open.vue"),
      meta: {
        showFooter: true,
      },
    },
    // {
    //   path: "/champion",
    //   name: "champion",
    //   component: () => import("./views/champion/champion.vue"),
    // },
    {
      path: "/profile/:id",
      name: "profile",
      component: () => import("./views/profile/index.vue"),
      meta: {
        authRequired: true,
        showFooter: true,
      },
    },
    {
      path: "/thanks",
      name: "thanks",
      component: () => import("./views/thanks/index.vue"),
      meta: {
        authRequired: true,
        showFooter: true,
      },
    },
    {
      path: "/olympiads/:id/start",
      name: "olympiad",
      component: () => import("./views/olympiads/open.vue"),
      meta: {
        authRequired: true,
        showFooter: false,
      },
    },
    {
      path: "/recovery",
      name: "recovery",
      component: () => import("./views/recovery/index.vue"),
      meta: {
        showFooter: false,
      },
    },
    {
      path: "*",
      name: "notfound",
      component: () => import("./views/PageNotFound.vue"),
      meta: {
        showFooter: true,
      },
    },
  ];
  return new Router({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return {
          selector: to.hash,
          behavior: "smooth",
        };
      }
      return { x: 0, y: 0 };
    },
    fallback: true,
    routes,
  });
}
