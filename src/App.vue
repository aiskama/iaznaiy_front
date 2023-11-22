<template>
  <div id="app">
    <vue-progress-bar />
    <HeaderComponent />
    <Transition mode="out-in" name="page">
      <RouterView :key="$route.fullPath" />
    </Transition>
    <Transition name="bounce">
      <ModalComponent />
    </Transition>
    <Notifications position="bottom right" />
    <FooterComponent v-if="this.$route.meta.showFooter" />
    <CookiesComponent />
  </div>
</template>

<script>
import HeaderComponent from "components/HeaderComponent.vue";
import ModalComponent from "components/modals/index.vue";
import FooterComponent from "components/FooterComponent.vue";
import CookiesComponent from "components/CookiesComponent.vue";

export default {
  name: "App",
  metaInfo: {
    title: "Я ЗНАЮ",
    meta: [
      {
        vmid: "keywords",
        name: "keywords",
        content: "",
      },
      {
        vmid: "description",
        name: "description",
        content: "",
      },
      {
        vmid: "og:title",
        name: "og:title",
        content: "",
      },
      {
        vmid: "og:description",
        name: "og:description",
        content: "",
      },
    ],
  },

  created() {
    // Полоска загрузки
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  },
  mounted() {
    this.$Progress.finish();
  },
  components: {
    CookiesComponent,
    FooterComponent,
    HeaderComponent,
    ModalComponent,
  },
};
</script>

<style lang="stylus">
@import 'styles/style.styl';
</style>
