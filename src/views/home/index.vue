<template>
  <main class="home">
    <MainComponent />
    <HomeCatalogListComponent :items="olympiads" />
    <NewsListComponent :items="news" :title="'Наше СМИ'" />
    <MainFormComponent />
    <FaqComponent :items="faq" />
  </main>
</template>

<script>
import MainComponent from "./components/MainComponent.vue";
import HomeCatalogListComponent from "./components/HomeCatalogListComponent.vue";
import NewsListComponent from "../../components/NewsListComponent.vue";
import MainFormComponent from "components/MainFormComponent.vue";
import FaqComponent from "components/FaqComponent.vue";

import HOME_PAGE from "@/graphql/page/home_page.graphql";

export default {
  name: "home",
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: HOME_PAGE,
      })
      .then(({ data }) => {
        store.state.home_page.olympiad_categories = data.olympiad_categories_paginate;
        store.state.home_page.news = data.news_paginate.data;
        store.state.social = data.about.social;
        store.state.faq = data.f_a_q_s;
      });
  },
  data() {
    return {
      // faq: [
      //   {
      //     title: "Часто задаваемые вопросы",
      //     description: "Часто задаваемые вопросы",
      //   },
      //   {
      //     title: "Часто задаваемые вопросы",
      //     description: "Часто задаваемые вопросы",
      //   },
      //   {
      //     title: "Часто задаваемые вопросы",
      //     description: "Часто задаваемые вопросы",
      //   },
      //   {
      //     title: "Часто задаваемые вопросы",
      //     description: "Часто задаваемые вопросы",
      //   },
      // ],
    };
  },
  computed: {
    olympiads() {
      return this.$store.state.home_page.olympiad_categories.data;
    },
    news() {
      return this.$store.state.home_page.news;
    },
    social() {
      return this.$store.state.social;
    },
    faq() {
      return this.$store.state.faq;
    },
  },
  components: {
    MainComponent,
    HomeCatalogListComponent,
    NewsListComponent,
    MainFormComponent,
    FaqComponent,
  },
};
</script>

<style lang="stylus"></style>
