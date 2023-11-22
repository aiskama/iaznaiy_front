<template>
  <main class="catalog-open">
    <MainBlockComponent :data="olympiad_item" />
    <!--    <PartnerSliderComponent :data="data" />-->
    <AboutComponent />
    <MainFormComponent />
    <CatalogNftComponent />
    <!--    <CatalogNewsListComponent :items="news" />-->
    <NewsListComponent :items="news" :title="'Наше СМИ'" />
    <!--    <CatalogFormComponent />-->
    <FaqComponent :items="faq" />
  </main>
</template>

<script>
import MainBlockComponent from "./components/MainBlockComponent.vue";
import AboutComponent from "./components/AboutComponent.vue";
import MainFormComponent from "components/MainFormComponent.vue";
import CatalogNftComponent from "./components/CatalogNftComponent.vue";
import FaqComponent from "components/FaqComponent.vue";
// import CatalogNewsListComponent from "./components/CatalogNewsListComponent.vue";
// import CatalogFormComponent from "./components/CatalogFormComponent.vue";
import CATALOG_ITEM from "../../graphql/page/catalog_item.graphql";
import NewsListComponent from "../../components/NewsListComponent.vue";
// import PartnerSliderComponent from "components/PartnerSliderComponent.vue";
export default {
  async asyncData({ apollo, store, route }) {
    await apollo.defaultClient
      .query({
        query: CATALOG_ITEM,
        context: {
          headers: {
            Authorization: "Bearer " + store.state.apollo_token,
          },
        },
        variables: {
          id: parseInt(route.params.id),
        },
      })
      .then(({ data }) => {
        store.state.catalog_page.catalog_item = data.olympiads_item;
        store.state.catalog_page.news = data.news_paginate.data;
        store.state.social = data.about.social;
        store.state.faq = data.f_a_q_s;
      });
  },
  components: {
    // PartnerSliderComponent,
    NewsListComponent,
    // CatalogNewsListComponent,
    MainFormComponent,
    MainBlockComponent,
    AboutComponent,
    CatalogNftComponent,
    FaqComponent,
    // CatalogFormComponent,
  },
  computed: {
    olympiad_item() {
      return this.$store.state.catalog_page.catalog_item;
    },
    news() {
      return this.$store.state.catalog_page.news;
    },
    social() {
      return this.$store.state.social;
    },
    faq() {
      return this.$store.state.faq;
    },
  },
};
</script>

<style lang="stylus">
.catalog-open {
  width 100%

  & .main-form{
    background-position: center right 7%;
    background-size: auto 61%;
  }

  .faq {
    padding 80px 30px 85px 30px
  }
  & .news-list{
    background white
  }
}
</style>
