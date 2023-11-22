<template>
  <main class="news-page">
    <div class="container">
      <h1 class="news-page__title">Новости</h1>
      <div class="news-page__content">
        <NewsBlockComponent v-for="item in news" :key="item.id" :data="item" />
      </div>
      <div class="news-page__btn">
        <button @click="reload" class="btn btn--yellow btn--sm" v-if="this.total !== this.news.length">
          <span v-show="!loading">Загрузить еще</span>
          <LoadingIndicator title="Загрузка" v-show="loading" />
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import NEWS_PAGE from "@/graphql/page/news_page.graphql";
import NewsBlockComponent from "components/NewsBlockComponent.vue";
import LoadingIndicator from "components/LoadingIndicator.vue";

export default {
  components: {
    NewsBlockComponent,
    LoadingIndicator,
  },
  data() {
    return {
      first: 16,
      loading: false,
    };
  },
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: NEWS_PAGE,
        variables: {
          first: 16,
        },
      })
      .then(({ data }) => {
        store.state.news_page.news = data.news_paginate;
        store.state.social = data.about.social;
      });
  },
  methods: {
    async reload() {
      this.first += 16;
      this.loading = true;
      await this.$apolloProvider.defaultClient
        .query({
          query: NEWS_PAGE,
          variables: {
            first: this.first,
          },
        })
        .then(({ data }) => {
          this.$store.state.news_page.news = data.news_paginate;
          this.loading = false;
        });
    },
  },
  computed: {
    news() {
      return this.$store.state.news_page.news.data;
    },
    total() {
      return this.$store.state.news_page.news.paginatorInfo.total;
    },
  },
};
</script>

<style lang="stylus">
.news-page {
  padding 130px 30px

  &__title {
    font-size 3.75em
    font-weight 700
    margin 0 0 80px 0;

    +below(1060px) {
      font-size 1.875em
      margin-bottom 50px
    }
  }

  &__content {
    display grid
    grid-template-columns repeat(4, 1fr)
    grid-gap 30px

    +below(1024px) {
      grid-template-columns repeat(3, 1fr)
    }

    +below(770px) {
      grid-template-columns repeat(2, 1fr)
    }

    +below(530px) {
      grid-template-columns repeat(1, 1fr)
    }
  }

  &__btn {
    display flex
    justify-content center
    margin-top 60px
  }
}
</style>
