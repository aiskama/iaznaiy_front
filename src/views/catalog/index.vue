<template>
  <main class="catalog">
    <CatalogListComponent
      :olympiad_categories="olympiad_categories"
      :items="catalog"
      @filterByClass="filterByClass"
      @filterBySubject="filterBySubject"
    />
    <div class="container" v-if="!catalog.length">
      <span class="catalog__empty">Нет доступных олимпиад</span>
    </div>
    <div class="catalog__btn" v-if="this.total_olympiad !== this.catalog.length">
      <button @click="reload" class="btn btn--yellow btn--sm">
        <span v-show="!loading">Загрузить еще</span>
        <LoadingIndicator title="Загрузка" v-show="loading" />
      </button>
    </div>
    <MainFormComponent />
  </main>
</template>

<script>
import CATALOG_PAGE from "@/graphql/page/catalog_page.graphql";
import MainFormComponent from "components/MainFormComponent.vue";
import CatalogListComponent from "./components/CatalogListComponent.vue";
import LoadingIndicator from "components/LoadingIndicator.vue";
export default {
  name: "catalog",
  components: {
    LoadingIndicator,
    CatalogListComponent,
    MainFormComponent,
  },
  data() {
    return {
      subject_id: null,
      class_id: null,
      loading: false,
      total: null,
      first: 4,
      reloadButton: true,
    };
  },
  async asyncData({ apollo, store, route }) {
    await apollo.defaultClient
      .query({
        query: CATALOG_PAGE,
        variables: {
          first: 4,
          category_id: parseInt(route.query.subject),
        },
      })
      .then(({ data }) => {
        store.state.catalog_page.catalogs = data.olympiads_paginate;
        store.state.catalog_page.olympiad_categories = data.olympiad_categories_paginate;
        store.state.social = data.about.social;
      });
  },
  computed: {
    catalog() {
      return this.$store.state.catalog_page.catalogs.data;
    },
    olympiad_categories() {
      return this.$store.state.catalog_page.olympiad_categories.data;
    },
    total_olympiad() {
      return this.$store.state.catalog_page.catalogs.paginatorInfo.total;
    },
  },
  methods: {
    // checkCatalogLength() {
    //   if (this.total < 4) this.reloadButton = false;
    //   if(this.catalog.length === this.total && this.total);
    // },
    async filterBySubject(id) {
      this.subject_id = id;
      await this.$apolloProvider.defaultClient
        .query({
          query: CATALOG_PAGE,
          variables: {
            class_id: this.class_id,
            category_id: this.subject_id,
            first: this.first,
          },
        })
        .then(({ data }) => {
          this.$store.state.catalog_page.catalogs = data.olympiads_paginate;
          this.first = 4;
        });
    },
    async filterByClass(id) {
      this.class_id = id;
      await this.$apolloProvider.defaultClient
        .query({
          query: CATALOG_PAGE,
          variables: {
            class_id: this.class_id,
            category_id: this.subject_id,
            first: this.first,
          },
        })
        .then(({ data }) => {
          this.$store.state.catalog_page.catalogs = data.olympiads_paginate;
          this.first = 4;
        });
    },
    async reload() {
      this.first += 4;
      this.loading = true;
      await this.$apolloProvider.defaultClient
        .query({
          query: CATALOG_PAGE,
          variables: {
            first: this.first,
            class_id: this.class_id,
            category_id: this.subject_id,
          },
        })
        .then(({ data }) => {
          this.$store.state.catalog_page.catalogs = data.olympiads_paginate;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="stylus">
.catalog {
  padding 110px 0
  margin-top 60px
  &__empty{
    font-size 1.500em
    font-weight: 500
    padding: 0 30px;
  }
  &__btn {
    display flex
    justify-content center
    margin-top 60px
  }
}
</style>
